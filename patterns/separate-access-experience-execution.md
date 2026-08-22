---
id: pattern.separate-access-experience-execution
slug: separate-access-experience-execution
type: pattern
version: 0.1.0
maturity: hypothesis
status: published
title: Access, experience, and execution are distinct concerns
summary: Design who may enter, what they perceive, and what effects they may cause as separate policy surfaces joined by explicit contracts.
audiences: ["security", "product", "architect"]
relationships: {"supports":["pattern.evidenced-trust","pattern.intent-survives-execution"],"contradicts":[],"depends_on":["pattern.boundaries-increase-agency"]}
disclosure: green
approved_by: ["chrisleeddotcom"]
license: CC-BY-4.0
created: 2026-08-21
updated: 2026-08-21
---

## Context

A product or workflow combines authentication, interface behavior, and consequential operations in one application or agent experience.

## Problem

When these concerns collapse, a good experience can imply excessive authority, a security control can degrade unrelated usability, and an authenticated session can be mistaken for permission to execute every visible action.

## Forces

- Unified interfaces are easier to build initially.
- People infer capability from what the interface presents.
- Execution risk varies by action and context.
- Access policy and product design evolve at different speeds.

## Pattern

Model three layers explicitly: access establishes who or what may enter; experience determines the information and choices presented; execution authorizes and records effects. Connect them through scoped claims and action-specific policy rather than shared session assumptions.

## Apply it

Inventory each visible action and its actual effect. Determine whether visibility, request, approval, and execution require different rights. Recheck execution authority at the point of effect using current evidence, and produce a result the experience can explain.

## Failure modes

- Hidden buttons are treated as authorization controls.
- Authentication is treated as universal execution permission.
- Execution errors expose internal policy details.
- Experience and control teams optimize independently without an end-to-end contract.

## Evidence needed

Security and usability outcomes demonstrating fewer authority leaks and clearer recovery without unnecessary prompts, denials, or duplicated policy logic.
