---
id: pattern.transitional-states
slug: transitional-states-are-architecture
type: pattern
version: 0.1.0
maturity: hypothesis
status: published
title: Transitional states are part of the architecture
summary: Design migration, partial adoption, failure, and rollback states explicitly instead of treating them as temporary exceptions.
audiences: ["architect", "operator", "change-leader"]
relationships: {"supports":["pattern.intent-survives-execution","pattern.reduce-heroics"],"contradicts":[],"depends_on":["pattern.versioned-decisions"]}
disclosure: green
approved_by: ["chrisleeddotcom"]
license: CC-BY-4.0
created: 2026-08-21
updated: 2026-08-21
---

## Context

A system is changing while people, integrations, policies, or data cannot move atomically from the old design to the new one.

## Problem

Architecture diagrams show the desired end state and omit the period in which both systems, incomplete data, mixed permissions, and rollback decisions coexist. Most operational risk lives in that omitted period.

## Forces

- Big-bang changes shorten coexistence but increase blast radius.
- Long migrations accumulate compatibility debt.
- Rollback may restore software without restoring data or authority.
- Users continue to work during transition.

## Pattern

Model each transition as a first-class state with entry criteria, allowed behavior, ownership, observability, duration bound, exit criteria, and recovery path. Define which representation is authoritative at every point and how intent survives conversion.

## Apply it

Draw the migration as a state machine. Include partial completion, retry, cancellation, stale clients, degraded dependencies, and rollback after side effects. Assign an owner to retire compatibility paths once their exit evidence is satisfied.

## Failure modes

- “Temporary” dual operation becomes permanent.
- Rollback exists only for code, not data or policy.
- Metrics describe the destination but not migration progress.
- Users discover mixed-state behavior before operators do.

## Evidence needed

Migration outcomes showing reduced unplanned exception handling, faster fault isolation, safe rollback, and timely retirement of transitional mechanisms.
