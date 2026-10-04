---
title: 'Agent QA: A Complete Guide to Tools and Testing'
description: 'A practical framework for testing an agent across deterministic tests, evaluation, observability, integration, E2E, and regression.'
category: Agent evaluation
slug: calendar-agent-qa
publishedAt: '2026-10-01'
---

This article uses a calendar agent as the example system. It receives natural-language requests, analyzes intent, parses parameters, asks clarifying questions, plans tool calls, and finally creates or queries events in a real calendar. The companion [Calendar Agent project page](/en/agent-building/calendar-agent/) focuses on how the system is built; this page focuses on how to test it.

## Agent QA is more than testing the final reply

```text
Agent QA = Deterministic Engineering Tests
         + Agent Evaluation
         + Observability
         + Integration / E2E
         + Regression
```

The system boundary includes the AgentRuntime, task state, clarification flow, MacAgentHost, EventKit, and real-world verification.

## 1. Define the system under test

```text
User
 ↓
Siri / Shortcut
 ↓
HTTP API
 ↓
Conversation Resolver
 ↓
AgentRuntime
 ├─ Semantic Analysis
 ├─ Parameters
 ├─ Task State
 ├─ Clarification
 └─ Planner
 ↓
Tool Request → MacAgentHost → EventKit → Calendar
                                      ↓
                                Verification
                                      ↓
                              Final Response
```

The test plan should cover protocol IDs, state transitions, date and timezone parsing, clarification and resume, tool selection, tool arguments, execution traces, real calendar state, and the end-to-end Siri-to-Calendar path.

## 2. Build a dataset before choosing tools

A dataset is the set of prompts and expected outcomes used to evaluate the agent:

```text
TC001 Create a meeting tomorrow at 10 AM for one hour
TC002 Create a meeting tomorrow at 10 AM
TC003 Create a meeting tomorrow
TC004 Create an all-day event tomorrow
TC005 Query tomorrow afternoon's events
TC006 Create a meeting tomorrow at 3 PM for one hour
```

Each case should define expected intent, required parameters, clarification behavior, tool request, verification result, language, and failure category.

## 3. Deterministic tests

Use deterministic tests for behavior that should not vary:

- request and operation ID semantics;
- date, time, duration, and timezone parsing;
- missing-parameter detection;
- clarification state transitions;
- planner and tool selection;
- JSON-lines or HTTP contracts;
- verification of the created event;
- safe handling of unknown real-world state.

These tests form the stable regression layer. An LLM judge should not replace assertions for protocol and state-machine rules.

## 4. Agent evaluation

Agent evaluation checks behavior across a dataset rather than one response. Useful dimensions include:

```text
Intent Accuracy
Parameter Accuracy
Clarification Accuracy
Tool Selection Accuracy
Tool Argument Accuracy
State Transition Accuracy
Verification Accuracy
Language Consistency
```

The evaluator should score both the final answer and the trajectory that produced it. A fluent answer is not a success if the wrong tool was called or the calendar state was not verified.

## 5. Observability

Every run should make it possible to connect:

```text
request_id → conversation_id → task_id → step_id
           → operation_id → execution_id
```

Capture structured events for semantic analysis, clarification, planning, tool execution, verification, and the final response. This makes a missing second-turn resume or a tool timeout diagnosable instead of anecdotal.

## 6. Integration and E2E

The real path is more than an isolated Python function:

```text
Siri / Shortcut → HTTPS → AgentRuntime
                 → MacAgentHost → EventKit
                 → macOS Calendar → Verification
```

Integration tests should cover permission boundaries, network failures, retries, timezones, real-device clarification, and the difference between a successful tool call and a verified task.

## 7. Regression and reliability

Every confirmed defect should become a durable regression case. Important categories include:

- timezone or date offset;
- duplicate execution after retry;
- tool success without verified state;
- clarification resume losing the original task;
- English request receiving a Chinese response;
- HTTP, Shortcut, or EventKit integration failure.

The reliability rule is:

```text
Tool Success ≠ Task Success
Tool Result → Verification → Final Status
```

The final status should be `success`, `failure`, or `unknown` according to the evidence available from the real calendar.

## 8. A practical tool map

Tools solve different parts of the system. Deterministic test frameworks are useful for contracts and state machines; evaluation tools help compare agent behavior across a dataset; observability tools help inspect traces; integration and E2E tools validate the real boundary. No single tool replaces the full QA system.

## Recommended baseline

```text
1. Define the system boundary
2. Create a golden dataset
3. Add deterministic contract and state tests
4. Add trajectory-level evaluation
5. Instrument every important transition
6. Run integration and real-device E2E checks
7. Turn every confirmed defect into regression coverage
```
