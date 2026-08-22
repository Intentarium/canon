# Intentarium Canon

The public, versioned knowledge system behind [Intentarium](https://intentarium.com).

Intentarium turns ambiguous intent into inspectable systems of authority, boundaries, trust, evidence, escalation, and feedback. This repository is the source of truth for its public identity, methods, patterns, and machine-readable contracts.

## What belongs here

- Approved public identity and governance
- The Agency Map specification
- Pattern records and their maturity history
- Public-safe examples and human-reviewed field evidence
- Schemas used to generate human and machine representations

Raw conversations, private personal context, employer or customer information, credentials, and operational platform code do not belong here. See [the public-memory policy](governance/PUBLIC_MEMORY.md).

## Repository map

```text
governance/        Publication, editorial, and maturity rules
patterns/          Canonical pattern records in Markdown + front matter
field-reports/     Accepted public-safe evidence linked to patterns
schemas/           JSON Schema contracts
specs/             Versioned public methods and interfaces
examples/          Public-safe, machine-readable examples
scripts/           Deterministic validation and manifest generation
```

## Validate locally

```bash
npm run validate
npm test
npm run manifest
```

All substantive changes arrive through a pull request. The merge is the human authorization event; generated sites, indexes, feeds, and APIs are derived projections.

See [`ROADMAP.md`](ROADMAP.md) for the implementation sequence and [`governance/FIELD_REPORTS.md`](governance/FIELD_REPORTS.md) before contributing evidence. Never paste a raw Agency Map or private context into a public issue or pull request.
