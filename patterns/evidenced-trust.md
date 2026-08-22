---
id: pattern.evidenced-trust
slug: trust-should-be-evidenced
type: pattern
version: 0.1.0
maturity: hypothesis
status: published
title: Trust should be explicit and continuously evidenced
summary: Permit consequential action from current, scoped evidence rather than role, location, reputation, or a one-time approval alone.
audiences: ["security", "architect", "agent-builder"]
relationships: {"supports":["pattern.boundaries-increase-agency","pattern.separate-access-experience-execution"],"contradicts":[],"depends_on":["pattern.source-of-truth-before-automation"]}
disclosure: green
approved_by: ["chrisleeddotcom"]
license: CC-BY-4.0
created: 2026-08-21
updated: 2026-08-21
---

## Context

A human, service, or agent requests access or authority in a system where conditions can change after initial authentication or approval.

## Problem

Trust becomes dangerous when it is inherited indefinitely from identity, network position, organizational status, or past behavior. The system cannot distinguish a still-valid decision from a stale assumption.

## Forces

- Rechecking every signal adds latency and dependency.
- Static trust is simple to operate but ages silently.
- Signals can be wrong, unavailable, or manipulated.
- Different actions require different confidence.

## Pattern

Define trust as a set of named signals with source, freshness, scope, and required confidence. Evaluate only the signals relevant to the requested action. Produce evidence of the evaluation and fail into a bounded state when confidence is insufficient.

## Apply it

For each consequential action, list the identity, device, policy, approval, data-quality, or environmental signals required. State how recently each must be observed and what happens when it is missing. Separate authorization from the user experience used to request it.

## Failure modes

- More signals are treated as automatically better.
- A missing signal silently becomes approval.
- Trust policy cannot explain a denial.
- Evidence is logged but cannot be associated with the exact action.

## Evidence needed

Observed reduction in unauthorized or unsafe execution without unacceptable increases in false denial, delay, or operator override.
