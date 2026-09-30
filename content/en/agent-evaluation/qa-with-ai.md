---
title: 'QA with AI: From Traditional Testing to Quality Engineering'
description: 'A practical guide to using AI across requirements, risk analysis, test design, execution, triage, regression, and Agent evaluation while keeping human review and verifiable evidence.'
category: Methodology
slug: qa-with-ai
publishedAt: '2026-09-30'
---

AI can expand QA's analysis and execution capacity, but quality decisions still require clear expectations, trustworthy evidence, and human review. This article places AI inside the real software quality workflow: requirements, risk analysis, test design, automation, execution, bug analysis, regression, and Agent evaluation.

## What this article covers

This guide is for QA practitioners with manual, API, or automation experience, and for quality engineers testing LLM applications, Copilots, or Agents. It does not describe AI as an autonomous “automatic QA,” and it does not treat Prompt, RAG, MCP, or Agent as goals by themselves. The focus is how they can enter an existing quality process.

AI is useful for repetitive, information-heavy work. QA still provides context, checks outputs, supplies business judgment, and makes release decisions. Generated test cases, code, and conclusions must not be treated as review-free by default.

## From traditional QA to an AI-assisted workflow

The traditional QA flow is:

```text
Requirements and change → Requirement analysis → Risk and test planning
→ Scenario / case design → Manual or automated execution
→ Bug reporting and triage → Regression → Release quality assessment
```

An AI-assisted flow can be:

```text
Requirements, API docs, code changes, historical bugs, and test data
→ Controlled context → AI analysis / proposals / generation → QA review
→ Human or controlled tool execution → Logs, responses, screenshots, and other evidence
→ AI-assisted summarization and leads → QA judgment → Regression / CI / ongoing evaluation
```

Capability can grow in stages:

```text
LLM conversation → Files and historical context → Structured outputs
→ APIs, browsers, repositories, or CI → Reusable Workflow / Skill
→ Controlled continuous execution → Evaluation sets and runtime evidence
```

This is an evolution path, not a requirement that every team reach an Agent. Many QA tasks already benefit from “files + one analysis + human review.”

## Eight QA stages

### 1. Requirement analysis

Give the AI PRDs, user stories, API specifications, prototypes, and change notes. Ask it to extract roles, preconditions, happy paths, exception paths, business rules, boundary conditions, and questions that need clarification.

Useful outputs include requirement IDs, expected behavior, dependencies, ambiguities, source locations, and questions for product review. Every conclusion should be traceable to the source; the AI must not turn a guess into a product rule. Confirm amounts, permissions, state transitions, and time conditions one by one.

### 2. Risk analysis and test planning

From requirement changes, dependencies, historical defects, and release scope, AI can propose risk candidates, test levels, priorities, and gaps in the planned coverage.

Risk scores are not objective probabilities. QA, product, and engineering still need to calibrate high-impact scenarios, especially for money, permissions, privacy, and irreversible actions.

### 3. Test scenario and case design

AI can generate positive, negative, boundary, state, permission, compatibility, and exception scenarios from confirmed requirements and risks. It can also format them as a team template, CSV, or JSON.

Review coverage, executability, expected results, test data, and duplicates. AI must not invent product behavior.

### 4. Test automation

Once steps, assertions, and environment boundaries are clear, AI can help turn stable manual steps into test code, add assertions, explain failure logs, or organize test data. Automation code still needs code review and validation in the real environment for stability, isolation, and cleanup.

### 5. UI and end-to-end testing

Computer Use or browser tools can execute real product flows during exploratory testing and record issues, reproduction steps, expected and actual results, and severity.

These tests depend on an accessible environment, account permissions, test data, and system state. Define the scope clearly and avoid blindly running irreversible actions or using real user data. Completing a flow does not prove product quality.

### 6. Bug analysis and triage

AI can summarize signals from alerts, failed checks, logs, and chat reports, helping identify duplicates, possible ownership, and triage summaries.

Classification, severity, and repair priority remain human decisions. Preserve logs, timestamps, environments, and original reports; do not present correlation as root cause.

### 7. Regression and continuous integration

When code or requirements change, AI can suggest a regression set based on the change scope and historical defects, and help organize CI output and uncovered risks.

Automation triggers do not mean automatic release approval. Quality gates need explicit pass conditions, failure handling, evidence retention, and a human escalation path.

### 8. Agent and LLM evaluation

When testing an AI application or Agent, turn “it feels good” into repeatable evaluation: prepare representative inputs, expected behavior, assertions, boundary cases, and failure categories, then compare versions.

Evaluate more than the final answer. Check tool calls, step order, permission boundaries, timeouts, cited evidence, refusal behavior, and handling of abnormal inputs. Evaluation sets should be editable and rerunnable after changes to prompts, models, tools, or business rules.

## You do not need to start with an Agent

Start with progressively more controlled steps:

1. **AI assistant**: summarize requirements, organize logs, or propose scenarios.
2. **AI + standard template**: fix input fields, output formats, and review points.
3. **AI + knowledge context**: add API docs, historical bugs, a glossary, and version scope.
4. **AI + tool execution**: connect APIs, browsers, repositories, or CI under controlled permissions.
5. **Workflow / Agent + evaluation**: rerun stable workflows and validate results against an evaluation set.

A good first exercise is to use a redacted requirements document. Ask the AI to extract testable requirements, risks, and clarification questions; have QA check them against the source; then turn confirmed items into test scenarios. This tests context, output format, and review without requiring a complete Agent.

## Human review and quality boundaries

- Every important conclusion should have a source or runtime evidence.
- Do not turn an AI guess into a product rule, root cause, or pass decision.
- Add human checkpoints for permissions, privacy, money, state transitions, and irreversible actions.
- Record the model, prompt, input version, tool versions, and runtime environment so results remain comparable.
- When suggestions contain false positives, misses, or steps that cannot run, revise the requirements and test baseline instead of only asking for longer output.

## Official examples and sources

The following official pages informed the examples selected here. They describe specific tools and tasks and do not guarantee that every version, plan, or local environment has the same capabilities:

- [QA your app with Computer Use](https://learn.chatgpt.com/use-cases/qa-your-app-with-computer-use): UI / end-to-end testing and issue recording.
- [Automate bug triage](https://learn.chatgpt.com/use-cases/automate-bug-triage): multi-source signal aggregation and triage assistance.
- [Add evals to your AI application](https://learn.chatgpt.com/use-cases/add-evals-to-your-ai-application): turning expected behavior into editable, rerunnable evaluations.
- [Review GitHub pull requests](https://learn.chatgpt.com/use-cases): change-risk analysis and regression clues.

Pages and tool capabilities may change. Recheck the official pages, environment constraints, and scope boundaries before publishing or reusing these examples.
