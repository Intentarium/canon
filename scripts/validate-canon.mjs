import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const patternDir = resolve(root, "patterns");
const errors = [];

function parseValue(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) return JSON.parse(trimmed);
  return trimmed.replace(/^['"]|['"]$/g, "");
}

function parsePattern(source, file) {
  if (!source.startsWith("---\n")) throw new Error(`${file}: missing YAML front matter`);
  const end = source.indexOf("\n---\n", 4);
  if (end === -1) throw new Error(`${file}: unterminated YAML front matter`);
  const data = {};
  for (const line of source.slice(4, end).split("\n")) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`${file}: invalid front matter line: ${line}`);
    data[line.slice(0, separator).trim()] = parseValue(line.slice(separator + 1));
  }
  return { data, body: source.slice(end + 5) };
}

const required = ["id", "slug", "type", "version", "maturity", "status", "title", "summary", "audiences", "relationships", "disclosure", "approved_by", "license", "created", "updated"];
const maturities = new Set(["hypothesis", "observed", "field-tested", "repeated", "reference", "deprecated"]);
const headings = ["## Context", "## Problem", "## Forces", "## Pattern", "## Apply it", "## Failure modes", "## Evidence needed"];
const records = [];

for (const file of (await readdir(patternDir)).filter((name) => name.endsWith(".md")).sort()) {
  try {
    const parsed = parsePattern(await readFile(resolve(patternDir, file), "utf8"), file);
    for (const field of required) if (!(field in parsed.data)) errors.push(`${file}: missing ${field}`);
    if (parsed.data.type !== "pattern") errors.push(`${file}: type must be pattern`);
    if (parsed.data.disclosure !== "green") errors.push(`${file}: public objects must be disclosure green`);
    if (parsed.data.license !== "CC-BY-4.0") errors.push(`${file}: unsupported license`);
    if (!maturities.has(parsed.data.maturity)) errors.push(`${file}: invalid maturity`);
    if (!Array.isArray(parsed.data.audiences) || parsed.data.audiences.length === 0) errors.push(`${file}: audiences must be a non-empty JSON array`);
    if (!Array.isArray(parsed.data.approved_by) || parsed.data.approved_by.length === 0) errors.push(`${file}: approved_by must be a non-empty JSON array`);
    for (const key of ["private_source_refs", "raw_context", "transcript_id"]) if (key in parsed.data) errors.push(`${file}: prohibited public field ${key}`);
    for (const heading of headings) if (!parsed.body.includes(heading)) errors.push(`${file}: missing section ${heading}`);
    records.push({ file, ...parsed });
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
}

const ids = new Map();
const slugs = new Map();
for (const record of records) {
  for (const [value, index, label] of [[record.data.id, ids, "id"], [record.data.slug, slugs, "slug"]]) {
    if (index.has(value)) errors.push(`${record.file}: duplicate ${label} also used by ${index.get(value)}`);
    index.set(value, record.file);
  }
}

for (const record of records) {
  const relationships = record.data.relationships;
  if (!relationships || typeof relationships !== "object") {
    errors.push(`${record.file}: relationships must be a JSON object`);
    continue;
  }
  for (const key of ["supports", "contradicts", "depends_on"]) {
    if (!Array.isArray(relationships[key])) errors.push(`${record.file}: relationships.${key} must be an array`);
    else for (const target of relationships[key]) if (!ids.has(target)) errors.push(`${record.file}: relationship target does not exist: ${target}`);
  }
}

for (const file of ["canon.json", "schemas/canon-object.schema.json", "schemas/pattern.schema.json", "schemas/agency-map.schema.json", "examples/agency-maps/accountability-without-authority.json"]) {
  try {
    JSON.parse(await readFile(resolve(root, file), "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (records.length !== 12) errors.push(`expected 12 founding patterns; found ${records.length}`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${records.length} public patterns and the Agency Map contract.`);
