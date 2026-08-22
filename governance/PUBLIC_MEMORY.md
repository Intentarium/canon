# Public-memory policy

The public canon is a curated knowledge system, not a transcript archive. Private context may inspire a public abstraction, but it is never copied automatically and never becomes public merely because an agent can access it.

## Classification

### Green — public

Original principles, public statements, deliberately authored material, public sources, and sanitized abstractions that cannot reasonably expose a private person, organization, customer, or control.

Green material may enter the canon through a reviewed pull request.

### Amber — abstract only

Employer, customer, organizational, commercial, security, or personal experiences that may yield a useful general lesson but contain identifying or sensitive context.

Amber material may inform a new abstraction only after identifiers, unique operational details, private quotations, and reconstructable timelines are removed. The public record cites the resulting abstraction or public evidence—not the private source.

### Red — excluded

Credentials; customer or employee data; confidential employer information; private communications; security-sensitive implementation details; personal health or financial records; unpublished business data; and material restricted by legal, ethical, contractual, or fiduciary duties.

Red material must not enter this repository, its issues, pull requests, build artifacts, logs, or generated representations.

## Promotion rule

Every public object must declare `disclosure: green`. A human reviewer authorizes publication by approving and merging the pull request. Automation may flag risk and propose safer wording, but it cannot waive this policy.

## Irreversibility

Git history, forks, caches, feeds, and third-party indexes make public publication difficult to reverse. When classification is uncertain, do not publish. Record the uncertainty outside the public repository and request human review.
