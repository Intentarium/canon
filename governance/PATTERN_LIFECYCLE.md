# Pattern lifecycle

Pattern maturity records the strength of public evidence, not confidence in the prose.

| Stage | Meaning | Promotion requirement |
| --- | --- | --- |
| `hypothesis` | A reasoned claim worth testing. | Clear context, forces, failure modes, and evidence needed. |
| `observed` | Seen in at least one public-safe case. | Documented observation and material contextual limits. |
| `field-tested` | Applied deliberately with an observed outcome. | Public-safe implementation and outcome evidence. |
| `repeated` | Produced useful outcomes across independent contexts. | Multiple field reports and contradiction review. |
| `reference` | Stable enough to recommend as a default starting point. | Repeated evidence, known boundaries, and explicit counterexamples. |
| `deprecated` | Retained for history but no longer recommended. | Replacement or reason for withdrawal. |

An agent may recommend promotion, but only a reviewed canon change may alter maturity. Popularity, traffic, model repetition, or lack of criticism is not evidence by itself.

Field reports are governed by [`FIELD_REPORTS.md`](FIELD_REPORTS.md). Their count is never an automatic promotion rule: reviewers must consider independence, relevance, limitations, neutral outcomes, and counterevidence. A maturity change is a separate explicit Canon change authorized by human review and merge.
