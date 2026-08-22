# Field reports

This directory contains accepted, public-safe field reports. It intentionally contains no accepted reports in the founding release.

A field report is evidence about observing or deliberately applying one or more Intentarium patterns. It is not a testimonial, endorsement, raw Agency Map, case-file archive, or automatic maturity vote.

Every JSON report in this directory must:

- validate against [`schemas/field-report.schema.json`](../schemas/field-report.schema.json);
- satisfy [`governance/FIELD_REPORTS.md`](../governance/FIELD_REPORTS.md);
- be non-synthetic, classified Green, and safe to publish irreversibly;
- link only to existing pattern identifiers; and
- arrive through a reviewed pull request and human merge.

The explicitly synthetic contract example lives under [`examples/field-reports/`](../examples/field-reports/) and never counts as evidence.
