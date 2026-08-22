import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import {
  createValidators,
  formatSchemaErrors,
  validateFieldReportSemantics,
} from "./lib/validation.mjs";

const root = resolve(import.meta.dirname, "..");
const fixtureRoot = resolve(root, "tests/fixtures/field-reports");
const example = JSON.parse(await readFile(resolve(root, "examples/field-reports/synthetic-production-release-gate.json"), "utf8"));
const { validators } = await createValidators(root);

const patternIds = new Set();
for (const file of (await readdir(resolve(root, "patterns"))).filter((name) => name.endsWith(".md"))) {
  const source = await readFile(resolve(root, "patterns", file), "utf8");
  const match = source.match(/^id:\s*(pattern\.[a-z0-9.-]+)$/m);
  if (match) patternIds.add(match[1]);
}

assert.equal(validators.fieldReport(example), true, formatSchemaErrors(validators.fieldReport).join("\n"));
assert.deepEqual(validateFieldReportSemantics(example, patternIds), []);

for (const outcome of ["supports", "mixed", "neutral", "contradicts"]) {
  const candidate = structuredClone(example);
  candidate.outcome = outcome;
  assert.equal(validators.fieldReport(candidate), true, `${outcome} must remain representable`);
}

for (const file of (await readdir(fixtureRoot)).filter((name) => name.endsWith(".json")).sort()) {
  const fixture = JSON.parse(await readFile(resolve(fixtureRoot, file), "utf8"));
  const candidate = Object.assign(structuredClone(example), fixture.patch);
  const schemaValid = validators.fieldReport(candidate);
  const semanticIssues = schemaValid ? validateFieldReportSemantics(candidate, patternIds, { accepted: fixture.expected === "accepted" }) : [];

  if (fixture.expected === "schema") assert.equal(schemaValid, false, `${file} should fail schema validation`);
  else {
    assert.equal(schemaValid, true, `${file} should reach semantic validation: ${formatSchemaErrors(validators.fieldReport).join("; ")}`);
    assert.ok(semanticIssues.length > 0, `${file} should fail ${fixture.expected} validation`);
  }
}

console.log("Field-report contract tests passed: valid example, all outcome classes, schema failures, references, safety, and accepted-report boundaries.");
