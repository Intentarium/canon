---
id: pattern.source-of-truth-before-automation
slug: source-of-truth-before-automation
type: pattern
version: 0.1.0
maturity: hypothesis
status: published
title: A source of truth must precede meaningful automation
summary: Establish one authoritative representation of intent before automating projections, decisions, or execution from it.
audiences: ["architect", "operator", "agent-builder"]
relationships: {"supports":["pattern.intent-survives-execution","pattern.versioned-decisions"],"contradicts":[],"depends_on":[]}
disclosure: green
approved_by: ["chrisleeddotcom"]
license: CC-BY-4.0
created: 2026-08-21
updated: 2026-08-21
---

## Context

An organization wants automation across records, interfaces, tools, or teams whose versions of reality disagree.

## Problem

Automation does not remove ambiguity; it executes ambiguity faster. When inputs have no declared authority, every integration embeds an undocumented reconciliation rule and every output becomes another competing source.

## Forces

- Existing systems contain valuable but inconsistent data.
- Declaring authority can expose unresolved ownership conflicts.
- Teams want immediate automation gains.
- Centralizing everything can create a new bottleneck.

## Pattern

Declare the canonical representation for each class of intent or fact. Treat indexes, caches, dashboards, embeddings, rendered pages, and downstream databases as projections with known provenance and rebuild paths. Resolve conflicts at the authority boundary rather than independently in every consumer.

## Apply it

Inventory representations and name the owner, update path, freshness expectation, and recovery method for each. Mark exactly one canonical source per field or decision class. Where authority is legitimately distributed, define an explicit composition rule and preserve its inputs.

## Failure modes

- “Source of truth” means the most convenient database, not the authorized record.
- Generated output overwrites its source.
- A cache becomes canonical because rebuilding it is difficult.
- Conflict resolution remains hidden in integration code.

## Evidence needed

Measurements of reconciliation work, divergent records, failed rebuilds, and time required to explain why a downstream value exists.
