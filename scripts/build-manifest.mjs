import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const output = resolve(root, outputIndex >= 0 ? process.argv[outputIndex + 1] : "dist/manifest.json");
const includedRoots = ["CHARTER.md", "ROADMAP.md", "canon.json", "governance", "patterns", "field-reports", "schemas", "specs", "examples"];

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const child = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...await walk(child));
    else files.push(child);
  }
  return files;
}

const files = [];
for (const item of includedRoots) {
  const path = resolve(root, item);
  if (item.includes(".")) files.push(path);
  else files.push(...await walk(path));
}

const objects = [];
for (const file of files.sort()) {
  const bytes = await readFile(file);
  objects.push({ path: relative(root, file), sha256: createHash("sha256").update(bytes).digest("hex"), bytes: bytes.length });
}

const descriptor = JSON.parse(await readFile(resolve(root, "canon.json"), "utf8"));
const manifest = { canon: descriptor.id, version: descriptor.version, algorithm: "sha256", objects };
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${relative(root, output)} with ${objects.length} objects.`);
