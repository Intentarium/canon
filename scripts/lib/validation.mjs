import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const schemaFiles = {
  canon: "schemas/canon-object.schema.json",
  pattern: "schemas/pattern.schema.json",
  agencyMap: "schemas/agency-map.schema.json",
  fieldReport: "schemas/field-report.schema.json",
};

const obviousSensitiveValues = [
  ["email address", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ["private-key material", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["AWS access-key identifier", /\bAKIA[0-9A-Z]{16}\b/],
  ["GitHub access token", /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
  ["payment-provider secret", /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}\b/],
];

const prohibitedPublicKeys = new Set([
  "credentials",
  "customer_name",
  "email",
  "employer_name",
  "organization_name",
  "personal_data",
  "phone",
  "private_source_refs",
  "raw_context",
  "secret",
  "transcript_id",
]);

function isDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function isUri(value) {
  try {
    return Boolean(new URL(value).protocol);
  } catch {
    return false;
  }
}

export async function createValidators(root) {
  const schemas = {};
  for (const [name, file] of Object.entries(schemaFiles)) {
    schemas[name] = JSON.parse(await readFile(resolve(root, file), "utf8"));
  }

  const ajv = new Ajv2020({ allErrors: true, strict: true });
  ajv.addFormat("date", { type: "string", validate: isDate });
  ajv.addFormat("uri", { type: "string", validate: isUri });

  const validators = {};
  for (const [name, schema] of Object.entries(schemas)) validators[name] = ajv.compile(schema);
  return { schemas, validators };
}

export function formatSchemaErrors(validate) {
  return (validate.errors ?? []).map((error) => {
    const location = error.instancePath || "/";
    return `${location} ${error.message}`;
  });
}

function walkPublicValue(value, path, issues) {
  if (typeof value === "string") {
    for (const [label, expression] of obviousSensitiveValues) {
      if (expression.test(value)) issues.push(`${path}: possible ${label}`);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkPublicValue(item, `${path}/${index}`, issues));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (prohibitedPublicKeys.has(key)) issues.push(`${path}/${key}: prohibited public field`);
    walkPublicValue(child, `${path}/${key}`, issues);
  }
}

export function findPublicSafetyIssues(value) {
  const issues = [];
  walkPublicValue(value, "", issues);
  return issues;
}

export function validateAgencyMapSemantics(map) {
  const issues = [];
  const actorIds = new Set();
  for (const actor of map.actors ?? []) {
    if (actorIds.has(actor.id)) issues.push(`/actors: duplicate actor id ${actor.id}`);
    actorIds.add(actor.id);
  }
  for (const [index, rule] of (map.authority ?? []).entries()) {
    if (!actorIds.has(rule.actor)) issues.push(`/authority/${index}/actor: unknown actor ${rule.actor}`);
  }
  return issues;
}

export function validateFieldReportSemantics(report, patternIds, { accepted = false } = {}) {
  const issues = [];

  for (const patternId of report.pattern_ids ?? []) {
    if (!patternIds.has(patternId)) issues.push(`/pattern_ids: unknown pattern ${patternId}`);
  }

  const classification = report.independence?.classification;
  if (report.synthetic === true && classification !== "synthetic") {
    issues.push("/independence/classification: a synthetic report must be classified synthetic");
  }
  if (report.synthetic === false && classification === "synthetic") {
    issues.push("/independence/classification: a non-synthetic report cannot be classified synthetic");
  }

  if (accepted) {
    if (report.synthetic !== false) issues.push("/synthetic: accepted field reports must be non-synthetic");
    if (!["published", "withdrawn"].includes(report.status)) issues.push("/status: accepted field reports must be published or withdrawn");
  }

  if (typeof report.created === "string" && typeof report.updated === "string" && report.updated < report.created) {
    issues.push("/updated: date cannot precede created");
  }

  for (const [index, source] of (report.public_sources ?? []).entries()) {
    try {
      if (new URL(source).protocol !== "https:") issues.push(`/public_sources/${index}: source must use HTTPS`);
    } catch {
      // JSON Schema reports malformed URIs.
    }
  }

  issues.push(...findPublicSafetyIssues(report));
  return issues;
}
