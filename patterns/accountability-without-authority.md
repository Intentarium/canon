---
id: pattern.accountability-authority
slug: accountability-without-authority
type: pattern
version: 0.1.0
maturity: hypothesis
status: published
title: Accountability without authority is organizational debt
summary: Assign decision rights, access, and escalation paths wherever a person or team is held responsible for an outcome.
audiences: ["leader", "operator", "architect"]
relationships: {"supports":["pattern.boundaries-increase-agency"],"contradicts":[],"depends_on":["pattern.versioned-decisions"]}
disclosure: green
approved_by: ["chrisleeddotcom"]
license: CC-BY-4.0
created: 2026-08-21
updated: 2026-08-21
---

## Context

A person or team is named as the owner of an outcome while important decisions, access, funding, or execution rights remain elsewhere.

## Problem

Responsibility without corresponding authority creates delay, hidden negotiation, and repeated escalation. Capable people compensate through favors or heroics, so the structural defect remains invisible until the system fails under load.

## Forces

- Central control can protect consistency and risk boundaries.
- Local owners have the context and urgency required to act.
- Broad permissions create risk; absent permissions create dependency.
- Informal escalation is fast once, but unreliable at scale.

## Pattern

For each accountable outcome, state which actor may decide, approve, execute, override, and stop. Bound those rights by scope, reversibility, evidence, and risk. Give routine decisions to the accountable owner and define a visible escalation route for exceptions.

## Apply it

Map the outcome with an Agency Map. Compare each obligation with an explicit decision right and required access. Where they do not match, either move authority toward the owner, move accountability toward the authority holder, or redesign the boundary so routine work can proceed safely.

## Failure modes

- Delegation is announced but permissions do not change.
- Every decision is labeled exceptional.
- The escalation owner has no response expectation.
- Outcomes improve only because one person works around the system.

## Evidence needed

Field reports comparing decision delay, rework, escalations, failed changes, and reliance on individual intervention before and after authority is made explicit.
