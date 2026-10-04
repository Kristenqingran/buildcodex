---
title: 'Traditional QA: An AI Transformation Case Study'
description: 'How testing for trading, fund transfers, and a Calendar Agent can evolve into measurable, evidence-based AI-assisted QA.'
category: Agent evaluation · Case study
slug: qa-transformation-with-ai
publishedAt: '2026-10-01'
---

This is a practical case study of turning traditional QA into an AI-assisted quality process. It uses two business scenarios—US stock trading and fund transfers—and connects them to the real [Calendar Agent project](/en/agent-building/calendar-agent/).

The goal is not to copy a public system. It is to extract one useful engineering pattern from public work and map it to a business problem that can be measured and reviewed.

## Traditional QA to AI-assisted QA

```text
Requirements, APIs, code changes, historical defects, test data
        ↓
Controlled context
        ↓
AI analysis / proposal / generation
        ↓
QA review and correction
        ↓
Execution and evidence collection
        ↓
Evaluation and regression
```

AI should expand the scenario space and reduce analysis effort. It should not silently replace business judgment or evidence-based verification.

## Case 1: US stock trading — scenario generation and coverage

The first prototype focuses on generating and evaluating useful trading scenarios. The workflow is:

```text
Trading requirements / APIs / rule documents
        ↓
Rule extraction
        ↓
Risk analysis
        ↓
Scenario generation
        ↓
Filter, validate, and deduplicate
        ↓
QA review
        ↓
Execution and coverage measurement
```

### Example: a limit-buy order

An AI-assisted design should consider more than the happy path:

- a normal limit buy;
- upper and lower price boundaries;
- decimal prices and minimum tick size;
- zero, negative, or excessive quantity;
- insufficient buying power;
- pre-market, regular, and after-hours sessions;
- duplicate submission;
- retry after a network timeout;
- a successful order with stale position data;
- accepted, partially filled, rejected, and failed states.

Useful metrics include rule coverage, risk-dimension coverage, boundary coverage, historical-defect recall, scenario acceptance rate, and duplicate-scenario rate.

The question is not “How many cases did AI generate?” but “Did AI help QA discover more valid risks?”

## Case 2: Fund transfers — failure analysis and evidence

Fund-transfer systems need a different emphasis. The central problem is often not generating more test cases, but explaining a failure from multiple sources of truth:

```text
API request
+ database state
+ account balance
+ ledger records
+ message queue
+ service logs
+ trace
        ↓
Failure classification
        ↓
Evidence extraction
        ↓
Root-cause analysis
        ↓
QA review
        ↓
Regression case
```

### Example: timeout followed by a duplicate request

```text
Transfer API timeout
DB = SUCCESS
Ledger = SUCCESS
Client retry → duplicate request
```

The AI should not answer only “the transfer failed, probably because of the network.” A useful result is structured and evidence-based:

```text
Failure type: idempotency conflict

Evidence:
- API returned duplicate_request
- The ledger contains the same operation_id
- The account balance was debited only once
- A downstream notification was sent more than once

Likely cause:
The client retried after an ambiguous timeout. The service correctly
prevented a second debit, but the notification path still needs idempotency.

Actions:
1. Keep the duplicate-debit protection.
2. Add a duplicate-request regression case.
3. Review notification idempotency.
4. Add the incident to the Golden Failure Dataset.
```

Evaluate failure analysis with classification accuracy, root-cause accuracy, evidence correctness, false-diagnosis rate, duplicate-debit risk recall, and regression-case effectiveness.

## Shared evaluation framework

Both projects can use the same evaluation shape even though their datasets differ:

```text
Dataset → AI Workflow → Output → Evaluator → Metrics → Regression
```

For trading, the dataset contains requirements, rules, risks, scenarios, and historical defects. For transfers, it contains failures, traces, ledger outcomes, root causes, and approved diagnoses.

## How public cases map to this work

Public projects provide patterns, not a claim that these systems are identical:

| Public work | Engineering pattern | Application here |
| --- | --- | --- |
| Fraunhofer AI/LLM testing | Generate, assess quality and uncertainty, then review | Trading scenario generation |
| Microsoft AI for Testing | Generation, fault finding, coverage, and regression | Trading rules and risk coverage |
| Microsoft TestExplora | Test whether generated tests find real defects | Historical-defect recall |
| Microsoft reliable agents | Evidence, diagnosis, bounded repair, and regression | Fund-transfer RCA |
| Uber flaky-test work | Failure classification and governance | Failure evidence and closure |
| Calendar Agent | Tool calls, state, verification, and E2E | Real agent QA |

These references are starting points for design, not substitutes for business rules and production evidence.

## Principles

1. AI generation is not quality completion.
2. Business rules and real evidence must be part of the context.
3. Metrics should measure validity and risk coverage, not output volume.
4. Human review remains a formal control point for high-risk decisions.

## References

- [Fraunhofer IESE: Test Case Generation Using AI/LLM](https://www.iese.fraunhofer.de/blog/software-testing-test-case-generation-using-ai-llm/)
- [Microsoft Research: AI for Testing](https://www.microsoft.com/en-us/research/project/ai_for_testing/?lang=zh-cn)
- [Microsoft Research: TestExplora](https://www.microsoft.com/en-us/research/publication/testexplora-benchmarking-llms-for-proactive-bug-discovery-via-repository-level-test-generation/)
- [Microsoft Research: Learning from Other Domains to Advance AI Testing and Evaluation](https://www.microsoft.com/en-us/research/blog/learning-from-other-domains-to-advance-ai-testing-and-evaluation/)
- [Microsoft M365 Research: Reliable and self-repairing agents](https://www.microsoft.com/en-us/research/group/m365-research/)
- [Uber: Handling Flaky Unit Tests in Java](https://www.uber.com/us/en/blog/handling-flaky-tests-java/)
