# Editorial governance

## Source of truth

Git is canonical. Websites, APIs, embeddings, search indexes, feeds, and model context are derived projections and must identify the canon version and source commit used to build them.

## Change path

1. A contributor or agent creates a branch.
2. The pull request states why the change exists, evidence, disclosure class, risk, uncertainty, tests, migration impact, and rollback.
3. Deterministic validation checks schemas, metadata, identifiers, relationships, and prohibited fields.
4. Review separates editorial quality from factual confidence and disclosure safety.
5. A human merge authorizes the change.
6. Downstream systems build immutable representations from the approved commit.

Agents may open and revise proposals. They may not merge, bypass validation, change approval controls, or represent a proposal as approved.

Field reports follow the additional admission, evidence, and disclosure rules in [`FIELD_REPORTS.md`](FIELD_REPORTS.md). Accepting a report and changing a pattern's maturity are separate review decisions.

## Corrections

Correct factual or safety defects promptly. Do not silently rewrite history: update the object version, revision note, and changelog. If publication itself created material risk, remove it from current projections and document the public-safe reason for withdrawal.

## Constitutional changes

Changes to the charter, public-memory policy, editorial governance, licensing, schemas that alter approval semantics, or automation permissions are constitutional. They require explicit human review and must not be bundled invisibly into ordinary editorial work.
