---
id: pattern.versioned-decisions
slug: decisions-should-be-versioned
type: pattern
version: 0.1.0
maturity: hypothesis
status: published
title: Decisions should be versioned artifacts
summary: Preserve consequential decisions with context, authority, evidence, alternatives, and revision history instead of leaving them in conversation.
audiences: ["leader", "architect", "operator"]
relationships: {"supports":["pattern.intent-survives-execution","pattern.accountability-authority"],"contradicts":[],"depends_on":["pattern.source-of-truth-before-automation"]}
disclosure: green
approved_by: ["chrisleeddotcom"]
license: CC-BY-4.0
created: 2026-08-21
updated: 2026-08-21
---

## Context

Consequential choices emerge through meetings, messages, model sessions, incidents, or informal agreements and must survive changes in people and circumstances.

## Problem

A remembered decision loses the assumptions that made it reasonable. Later teams either obey it as folklore or unknowingly repeat the debate. Conversational records are searchable but rarely state final authority or supersession.

## Forces

- Writing a decision adds effort at the moment of urgency.
- Full transcripts contain noise and private context.
- Decisions evolve as evidence changes.
- Governance needs a stable record without freezing learning.

## Pattern

Represent each material decision as a small versioned artifact: outcome, context, authority, considered alternatives, evidence, constraints, effective scope, review trigger, and supersession link. Store it in the system that authorizes the resulting change.

## Apply it

Capture the decision, not the entire conversation. Link public evidence and redact private inputs into safe abstractions. Require an explicit new version or successor when assumptions change. Make current and historical status visible.

## Failure modes

- Documentation records discussion but no decision.
- New information silently edits the old rationale.
- Every trivial choice becomes an artifact.
- The recorded approver did not hold the required authority.

## Evidence needed

Reduction in repeated debate, contradictory implementation, onboarding time, and inability to explain why a current control or design exists.
