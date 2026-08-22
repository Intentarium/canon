# Field-report governance

Field reports are the public evidence loop for Intentarium patterns. They record what was observed, what was deliberately tried, what changed, what did not change, and what remains uncertain. They do not authorize execution or promote a pattern by themselves.

## Admission boundary

Only deliberately sanitized, disclosure-Green reports may enter the public Canon. A report must describe roles, systems, and conditions generically enough that it cannot reasonably identify an unconsenting person, employer, customer, security control, or confidential operation.

Do not submit a raw Agency Map. Do not submit credentials, private communications, personal data, customer or employee data, organization names, private repository details, unpublished incident timelines, or implementation facts restricted by legal, contractual, ethical, security, or fiduciary duties. When classification is uncertain, do not open a public issue or pull request.

Public issues, pull requests, Git history, forks, caches, and indexes are difficult to reverse. Review may reject or rewrite unsafe material, but review cannot make an already-public disclosure private again.

## Required record

Each report must validate against `schemas/field-report.schema.json` and include:

- the pattern identifiers being examined;
- whether the report is an observation or deliberate application;
- a result of `supports`, `mixed`, `neutral`, or `contradicts`;
- generalized context and the method used;
- observable signals, including unchanged, negative, or inconclusive signals;
- limitations and plausible confounders;
- the contributor's relationship to the work, without private identity data;
- only deliberately public source links; and
- disclosure, approval, version, date, and license metadata.

Absence of a positive result is publishable. Contradictions and neutral outcomes must not be removed merely to make a pattern appear stronger.

## Evidence strength

`observation` means the pattern-relevant condition was seen but not deliberately introduced for the report. `deliberate-application` means named pattern elements were intentionally applied and an outcome was observed.

`author-involved` means a report author participated in the work or evaluation. `independent` means the observation and outcome were produced outside the pattern author's intervention and are sufficiently documented for review. `synthetic` means the record is fictional or constructed for testing; it never counts as evidence.

Traffic, popularity, generated prose, model repetition, synthetic examples, and an unverified claim of success do not count as field evidence. A public source can improve inspectability but does not automatically establish independence or causality.

## Maturity and authority

Field reports may inform pattern maturity under `PATTERN_LIFECYCLE.md`, but no count or automated rule promotes a pattern. Reviewers must examine relevance, independence, limitations, contradictions, and evidence quality. Only a separate, explicit Canon change reviewed and merged by a human may alter maturity.

Agents may validate structure, identify missing context, summarize reports, and propose a maturity review. They may not approve a report, classify unsafe material as Green, suppress counterevidence, or change maturity.

## Corrections and withdrawal

Correct errors with a versioned change and revision explanation. Set `status` to `withdrawn` when a report is unsafe, materially unreliable, or no longer suitable for current projections. Preserve a public-safe reason where possible; never repeat the sensitive material being removed.
