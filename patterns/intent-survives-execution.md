---
id: pattern.intent-survives-execution
slug: intent-must-survive-execution
type: pattern
version: 0.1.0
maturity: hypothesis
status: published
title: Human intent must survive machine execution
summary: Carry the approved outcome, constraints, authority, and rollback semantics into every executable representation and resulting action.
audiences: ["agent-builder", "architect", "governance"]
relationships: {"supports":["pattern.evidenced-trust","pattern.versioned-decisions"],"contradicts":[],"depends_on":["pattern.source-of-truth-before-automation","pattern.transitional-states"]}
disclosure: green
approved_by: ["chrisleeddotcom"]
license: CC-BY-4.0
created: 2026-08-21
updated: 2026-08-21
---

## Context

A human request is translated by software or an intelligent agent into plans, tool calls, infrastructure changes, messages, or other real-world effects.

## Problem

Each translation can preserve the requested action while losing the outcome, boundary, or reason that constrained it. A technically successful execution may therefore violate the intent it was meant to serve.

## Forces

- Natural language is expressive but ambiguous.
- Executable interfaces are precise but narrow.
- Agents may infer missing steps correctly most of the time.
- Review becomes harder as transformations multiply.

## Pattern

Create a structured intent envelope containing outcome, authorized scope, prohibited effects, assumptions, required evidence, approval, expiration, and rollback. Bind every plan and execution record to that envelope and reject transformations that cannot demonstrate compatibility.

## Apply it

Separate proposal from execution. Show the material effects and unresolved assumptions before approval. Use least-privilege tools whose permissions match the approved scope. Record the exact inputs, plan, authorization, results, and rollback reference.

## Failure modes

- Approval applies to a summary while a different artifact executes.
- A broad tool permission silently expands the request.
- Success is measured only by tool completion.
- Rollback reverses output but not notifications or external side effects.

## Evidence needed

Evaluations that compare requested outcomes and boundaries with actual effects, including adversarial, ambiguous, stale-approval, and partial-failure cases.
