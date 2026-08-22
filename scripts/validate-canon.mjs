import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import {
  createValidators,
  findPublicSafetyIssues,
  formatSchemaErrors,
  validateAgencyMapSemantics,
  validateFieldReportSemantics,
} from "./lib/validation.mjs";

const root = resolve(import.meta.dirname, "..");
const patternDir = resolve(root, "patterns");
const fieldReportDir = resolve(root, "field-reports");
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

function collectSchemaErrors(file, validate, value) {
  if (!validate(value)) {
    errors.push(...formatSchemaErrors(validate).map((error) => `${file}: ${error}`));
    return false;
  }
  return true;
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(resolve(root, file), "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

let validation;
try {
  validation = await createValidators(root);
} catch (error) {
  console.error(`- schema compilation failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
const { validators } = validation;

const headings = ["## Context", "## Problem", "## Forces", "## Pattern", "## Apply it", "## Failure modes", "## Evidence needed"];
const records = [];

for (const file of (await readdir(patternDir)).filter((name) => name.endsWith(".md")).sort()) {
  try {
    const parsed = parsePattern(await readFile(resolve(patternDir, file), "utf8"), file);
    collectSchemaErrors(`patterns/${file}`, validators.pattern, parsed.data);
    for (const key of ["private_source_refs", "raw_context", "transcript_id"]) {
      if (key in parsed.data) errors.push(`patterns/${file}: prohibited public field ${key}`);
    }
    for (const heading of headings) {
      if (!parsed.body.includes(heading)) errors.push(`patterns/${file}: missing section ${heading}`);
    }
    records.push({ file, ...parsed });
  } catch (error) {
    errors.push(`patterns/${file}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const ids = new Map();
const slugs = new Map();
for (const record of records) {
  for (const [value, index, label] of [[record.data.id, ids, "id"], [record.data.slug, slugs, "slug"]]) {
    if (index.has(value)) errors.push(`patterns/${record.file}: duplicate ${label} also used by ${index.get(value)}`);
    index.set(value, record.file);
  }
}

for (const record of records) {
  const relationships = record.data.relationships;
  if (!relationships || typeof relationships !== "object") continue;
  for (const key of ["supports", "contradicts", "depends_on"]) {
    if (!Array.isArray(relationships[key])) continue;
    for (const target of relationships[key]) {
      if (!ids.has(target)) errors.push(`patterns/${record.file}: relationship target does not exist: ${target}`);
    }
  }
}

const canon = await readJson("canon.json");
if (canon) collectSchemaErrors("canon.json", validators.canon, canon);

for (const file of (await readdir(resolve(root, "examples/agency-maps"))).filter((name) => name.endsWith(".json")).sort()) {
  const path = `examples/agency-maps/${file}`;
  const example = await readJson(path);
  if (example && collectSchemaErrors(path, validators.agencyMap, example)) {
    errors.push(...validateAgencyMapSemantics(example).map((error) => `${path}: ${error}`));
  }
}

const patternIds = new Set(ids.keys());
const exampleReportIds = new Map();
for (const file of (await readdir(resolve(root, "examples/field-reports"))).filter((name) => name.endsWith(".json")).sort()) {
  const path = `examples/field-reports/${file}`;
  const example = await readJson(path);
  if (!example || !collectSchemaErrors(path, validators.fieldReport, example)) continue;
  if (exampleReportIds.has(example.id)) errors.push(`${path}: duplicate id also used by ${exampleReportIds.get(example.id)}`);
  exampleReportIds.set(example.id, path);
  errors.push(...validateFieldReportSemantics(example, patternIds).map((error) => `${path}: ${error}`));
  if (example.synthetic !== true) errors.push(`${path}: examples must be explicitly synthetic`);
}

const reportIds = new Map();
for (const file of (await readdir(fieldReportDir)).filter((name) => name.endsWith(".json")).sort()) {
  const path = `field-reports/${file}`;
  const report = await readJson(path);
  if (!report || !collectSchemaErrors(path, validators.fieldReport, report)) continue;
  if (exampleReportIds.has(report.id)) errors.push(`${path}: id collides with example ${exampleReportIds.get(report.id)}`);
  if (reportIds.has(report.id)) errors.push(`${path}: duplicate id also used by ${reportIds.get(report.id)}`);
  reportIds.set(report.id, path);
  errors.push(...validateFieldReportSemantics(report, patternIds, { accepted: true }).map((error) => `${path}: ${error}`));
}

for (const issue of findPublicSafetyIssues(canon ?? {})) errors.push(`canon.json: ${issue}`);
if (records.length !== 12) errors.push(`expected 12 founding patterns; found ${records.length}`);

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${records.length} public patterns, ${reportIds.size} accepted field reports, schemas, examples, references, and public-safety invariants.`);
