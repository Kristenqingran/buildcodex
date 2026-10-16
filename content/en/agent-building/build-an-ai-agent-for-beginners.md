---
title: 'How to Build an AI Agent: A Beginner’s Guide'
description: 'Learn the difference between workflows and agents, then follow seven practical steps—from defining a task to testing a small end-to-end loop—using a Douyin shop support example.'
category: Agent building · Beginner guide
slug: build-an-ai-agent-for-beginners
publishedAt: '2026-10-16'
updatedAt: '2026-10-16'
---

If you are new to agents, do not start by picking a model or framework. First understand the work you want to improve—and whether it actually needs an agent.

Here is a simple way to think about workflows and agents:

- **Workflow:** A person designs the steps and branches in advance, and the system follows them.
- **Agent:** A person gives the system a goal and boundaries; at runtime, the system decides what to do next, which tools to use, and how to check the result.

Consider a “Douyin shop customer support” assistant:

**Workflow version:**

1. Classify the customer’s question;
2. Look up the relevant product information;
3. Draft a response using a template;
4. Escalate refund requests or complaints to a human.

The process is designed ahead of time. The model mainly handles classification, retrieval, or wording within that process.

**Agent version:**

The goal is to “resolve the customer’s issue as much as possible while following the return and exchange policy.” The system first checks what information is missing, then decides whether to look up an order, search product information, call an after-sales API, or ask the customer a follow-up question. After acting, it checks whether the issue was resolved. If the request exceeds its authority or involves risk, it hands the case to a human.

The key difference is not whether a large language model is involved. It is **who decides the next step at runtime**. Real systems are often hybrids: a surrounding workflow controls permissions, sequence, and fallbacks, while an agent handles specific parts that require judgment.

## A beginner’s 7 steps, starting with the need

### 1. Find a specific, repetitive task

Do not start with “I want to build an agent.” Start with a concrete question:

> Who needs to do what, and under which circumstances? Which part is most frustrating?

For example:

> Douyin shop support staff answer many repetitive product questions every day. Product information is scattered across documents, so it takes time to find and responses are inconsistent.

### 2. Write the need as a task

Use this template:

> When [trigger] happens, the system helps [user] complete [task] and achieve [measurable outcome]. When [risk or exception] occurs, it takes [fallback action].

For example:

> When a customer asks about product sizing, the system recommends a suitable size based on product information and details provided by the customer. Every answer must be supported by source information. If the information is insufficient or the answer would make a return or exchange commitment, the system asks a follow-up question or escalates to a human.

This helps you decide whether the problem is clear enough—and whether an agent is really necessary.

### 3. Document how people handle the task today

Ask yourself or the person doing the work:

- What do they look at first?
- What do they use to make a decision?
- What do they ask when information is missing?
- When do they need to check a system, spreadsheet, or knowledge base?
- Which situations must be handed to a person?
- What could happen if something goes wrong?

Write down the real process. Do not start by imagining how “smart” the agent should be.

### 4. Divide the task into three types of work

| Part of the task | A good fit |
| --- | --- |
| Fixed steps and explicit rules | Workflow, code, or API |
| Understanding, classifying, or extracting information from text | LLM step |
| Choosing the next action or tool based on the current result | Agent |

A useful rule: **if fixed rules can handle something reliably, do not give an agent free rein over it.** Permissions, refund limits, and whether a coupon can be issued should be controlled by deterministic rules.

### 5. Start with the smallest end-to-end loop

Build a first version that completes one task:

> Input → understand the request → retrieve necessary information → produce a result → check it → ask for human approval or complete the task

The first version does not need to perform risky actions automatically. For example, let it draft a customer support response for a person to review. Once the drafts are reliable, gradually allow low-risk actions.

### 6. Test with real cases, not just demos

Collect dozens of real requests, including at least:

- Common questions;
- Missing information;
- Ambiguous wording;
- Questions with no answer in the knowledge base;
- Multiple issues in one request;
- Unauthorized requests or high-risk situations.

Do not only ask whether the answer “sounds human.” Check:

- Was the task completed?
- Was the answer supported by evidence?
- Were the right tools called?
- Did the system ask a follow-up or escalate when needed?
- Did it make an unauthorized promise or take an unauthorized action?

### 7. Decide whether to add an agent based on the results

If the process is already stable, a workflow may be enough. If many requests require changing steps, choosing tools, or gathering more information based on context, give **that part** to an agent. Do not turn the entire system into an agent just to make the product sound more advanced.

## A one-sentence rule of thumb

Ask yourself:

> **If I can write down every step and branch in advance, it is more like a workflow. If the system must decide what to do next from information available at runtime, that part may need an agent.**

So building a workflow first does not mean you chose the wrong direction. It is often the best starting point: get the process working, collect real cases, and then identify the parts that genuinely need dynamic judgment and gradually upgrade those parts to agents.

## A beginner's playbook: Build an Agent from scratch with Codex

> This is a project process you can follow. You do not need to learn every Agent term first; use the prompts and deliverables at each stage to confirm requirements, choose an implementation approach, create project files, build, and test with Codex step by step.
>
> This playbook helps you decide whether the right outcome is a regular program, a standalone Tool, a Workflow, a limited Agent, or an Agent-led system.

### How to use this playbook

1. Open a new project folder or an existing code project in Codex.
2. Give Codex the prompts in this playbook one stage at a time.
3. Confirm the conclusion at each stage before moving on.
4. If Codex's conclusion does not match your actual business, correct it and ask it to update the requirements record.
5. Do not ask Codex to write a large amount of code before the requirements and architecture are confirmed.
6. Ask Codex to save each stage's confirmed outcome in project files so it is not left only in the chat.

**Requirements interview → Workflow card → Technical approach decision → Project files → Incremental implementation → Testing and acceptance → Limited trial → Retrospective and iteration**

### Stage 1: Tell Codex what you want to achieve

#### Goal

Tell Codex that you are a beginner and want help clarifying the need before writing code.

#### First prompt to give Codex

**Copy-and-paste prompt for Codex**

~~~text
I want to use Codex to develop an AI feature that solves a real problem. I am new to Agent development and am not sure whether I need an Agent, Workflow, standalone Tool, or regular program.

First act as my requirements-analysis and technical-design mentor; do not write code yet. Interview me in stages, handling only one stage at a time and asking just 1 to 3 of the most important questions per turn.

Requirements:
1. Explain concepts in plain language; do not assume I know technical terms.
2. First understand the real work problem I want to solve, then discuss technical approaches.
3. Do not invent users, business facts, data sources, API capabilities, or success metrics for me.
4. If I say “I don't know,” help with examples, choices, or by asking me to describe a recent real situation.
5. At the end of each stage, summarize confirmed information, open questions, and the stage conclusion before continuing.
6. Save each stage's conclusion in the project's docs/ directory; create the directory if it does not exist.
7. Do not write implementation code until requirements, workflow, and technical approach have been analyzed.
8. Do not assume an Agent is required. The conclusion may be a regular program, standalone Tool, Workflow, limited Agent, or Agent system.
9. If I correct a conclusion, accept the correction and update the document; do not record unconfirmed assumptions as facts.
10. Start with stage one: help me explain what problem I want to solve.
~~~

#### If you do not yet know what to build

Give Codex this prompt:

**Copy-and-paste prompt for Codex**

~~~text
I still cannot explain what I want to build. Do not ask me to think of a technical approach first. Offer common scenario choices such as organizing information, answering repeated questions, generating content, querying business data, handling multi-step work, or operating a website or software. Ask me to choose the closest one, then help me clarify the need using a specific recent situation.
~~~

### Stage 2: Interview with Codex about the requirements

#### Goal

Turn “I want to build an Agent” into a concrete, assessable, and verifiable business task.

#### Prompt to give Codex

**Copy-and-paste prompt for Codex**

~~~text
We are now in the requirements-interview stage. Ask me 1 to 3 questions at a time until the need can be described clearly.

Explore these questions in order:
1. Who will use this feature?
2. In what situation will they use it?
3. What specific task does the user need to complete?
4. Who does this task today, and how?
5. What is a recent concrete example? What was the input, and what did the person do?
6. Which part takes the most time, is most error-prone, or is most frustrating?
7. How often does this happen, and approximately how much time does each instance take?
8. What should improve: speed, accuracy, completion rate, user experience, or reduced repetitive work?
9. What is explicitly out of scope for the first version?

Do not ask all the questions at once. Follow up on important gaps based on my answers. At the end, give me a concise requirements summary and save it to docs/requirements.md. Label:
- Facts I have confirmed;
- Questions that remain open;
- Your recommendations.
Do not present recommendations as confirmed facts.
~~~

#### What a requirements summary should contain

- Project name or temporary name;
- Users;
- Triggering situation;
- Task the user needs to complete;
- Current human process;
- Current pain points;
- Expected business value;
- First-version scope;
- What the first version explicitly will not do;
- Open questions.

#### Condition for moving to the next stage

You should be able to describe the need in one sentence:

> When [situation] occurs, help [user] complete [task] in order to improve [measurable outcome].

If the only description is still something broad like “build an AI assistant” or “build an Agent platform,” keep interviewing; do not start development.

### Stage 3: Map the workflow with Codex

#### Goal

Reconstruct how people do the work today. The workflow card is important evidence for choosing a Tool, Workflow, or Agent.

#### Prompt to give Codex

**Copy-and-paste prompt for Codex**

~~~text
Based on the requirements confirmed so far, enter the workflow-mapping stage. Do not design an Agent or write code yet.

Use plain-language questions to help me reconstruct how a real person currently does this work. Ask no more than 1 to 3 questions per turn.

Find out:
1. What event triggers the task?
2. What inputs are available at the start?
3. What information does the operator look at first?
4. What actions do they take, and in what order?
5. What decision criteria do they use at each step?
6. In what situations does the process branch?
7. When do they need to ask the user or a colleague a follow-up question?
8. When do they need to query a file, website, database, or third-party system?
9. Which actions change external state, such as sending a message, changing an order, or creating a record?
10. What conditions mean the task is complete?
11. When must work stop and be handed to a person?

When there is enough information, create a workflow card in docs/workflow-card.md using this table:

| Step | Human action | Required input | Decision criteria | Outcome | Fixed or variable | Side effect? |
|---|---|---|---|---|---|---|

Also list:
- Fixed steps;
- Optional branches;
- Steps that need more information;
- Steps that need external materials or systems;
- Steps that require human judgment or authorization;
- Completion conditions;
- Failure and human-escalation conditions.

Mark unconfirmed steps as “open question”; do not fill them in yourself.
~~~

#### Example workflow card

~~~text
Task: Answer a customer's question about product sizing
Trigger: The user sends a sizing question
Inputs: User message, current product ID, and any body measurements the user may provide
Steps:
1. Identify the product
2. Look up that product's official size chart
3. Decide whether the user's information is sufficient
4. Ask a follow-up question if information is missing
5. Draft a recommendation based on the source if there is enough information
6. Escalate to a person for refund requests or guarantees
Complete when: The answer is supported by source material, missing information has been requested, or the case has been handed to a person
~~~

#### Condition for moving to the next stage

- You can understand the workflow card and confirm that it broadly reflects the real work;
- Unclear steps are explicitly marked as open questions;
- Actions that change external state have been identified;
- Completion conditions have been listed.

If any step does not reflect what really happens, tell Codex which one is wrong and ask it to update the workflow card.

### Stage 4: Ask Codex to choose a regular program, Tool, Workflow, or Agent

#### First understand the four approaches

- **Regular program:** Performs a fixed task using explicit rules, such as validating fields, calculating an amount, or converting a file format.
- **Tool:** A single capability that can be called by a person or another system, such as looking up an order, searching documents, or generating an image. A Tool does not necessarily plan multi-step work.
- **Workflow:** Steps, order, and branches arranged in advance by the developer. It can call models, Tools, or Agents.
- **Agent:** Given a goal by a person, the system uses context and tool results at runtime to choose what to do next, call tools, ask questions, check results, or stop.

#### Prompt for the technical approach decision

**Copy-and-paste prompt for Codex**

~~~text
Using docs/requirements.md and docs/workflow-card.md, assess each workflow step as a regular program, Tool, Workflow, model step, Agent, or human action.

Do not write code yet, and do not conclude that an Agent is necessary just because I am interested in one.

For each step, check:
1. Are its inputs and outputs clear?
2. Can its rules be written down in advance?
3. Does it follow the same sequence each time?
4. Must the next step depend on the result just received?
5. Does it need to choose among different tools dynamically?
6. Must it proactively determine what information is missing and ask for it?
7. Can the result be verified automatically or by a person?
8. Can a failure be reversed or handed to a person?

Use these decision rules:
- Fixed rules and actions: regular program.
- One independently callable capability: Tool.
- Steps and branches that can be defined in advance: Workflow.
- Language understanding followed by a fixed process: add a model step to the Workflow.
- If only one step needs contextual tool selection or follow-up questions, use a constrained Agent for that step while the Workflow controls the rest.
- Consider an Agent-led system only when multiple steps truly need dynamic planning and there are acceptance methods and safe fallbacks.
- Keep high-risk actions that cannot be reviewed or reversed with a person; do not automate them with an Agent.

Create docs/solution-decision.md with:
1. Overall recommendation: regular program, Tool, Workflow, limited Agent, or Agent-led system;
2. A step-by-step decision table:

| Workflow step | Recommended implementation | Agent needed? | Rationale | Risks and constraints |
|---|---|---|---|---|

3. If using an Agent: specify what it is and is not responsible for;
4. If not using an Agent: explain how a Workflow or Tool meets the need;
5. Open questions;
6. New evidence that could change the current decision.

Base the conclusion on the workflow card, not just terminology.
~~~

#### Decision principles

- Calling a capability does not make it an Agent; it may simply be a Tool.
- A multi-step process with fixed steps is usually a Workflow.
- A Workflow can call Agents, and an Agent can call multiple Tools.
- An Agent does not have to do everything autonomously; it can handle just one dynamic decision point.
- A common combination is: Workflow controls the main process, a limited Agent handles contextual decisions and follow-up questions, Tools provide capabilities, and a person authorizes actions.

### Stage 5: Create only the essential project files before development

#### Goal

Create maintainable project guidance and working documents before implementation. Do not generate a pile of empty files at the start.

#### Recommended first-version structure

~~~text
project/
├── README.md
├── docs/
│   ├── requirements.md
│   ├── workflow-card.md
│   ├── solution-decision.md
│   ├── agent-design.md
│   ├── tools.md
│   ├── test-plan.md
│   └── decision-log.md
├── prompts/
│   └── system-prompt.md
├── tests/
│   └── eval-cases.jsonl
├── src/
└── .env.example
~~~

Not every project needs every file:

- If you do not need an Agent, you do not need agent-design.md.
- If there are no callable Tools, you do not need tools.md.
- If prompts are not decided yet, you do not need prompts/system-prompt.md.
- If there are no API keys or external configuration, you do not need .env.example yet.
- A simple prototype can combine short documents, but requirements, workflow, solution decision, and test plan should remain.

#### What each file records

- **README.md:** What the project does, who it is for, how to run and configure it, how to test it, and current limitations.
- **docs/requirements.md:** Users, triggering situation, pain points, goals, success criteria, scope, and exclusions.
- **docs/workflow-card.md:** Human steps, decision criteria, inputs and outputs, branches, side effects, handoffs, and completion conditions.
- **docs/solution-decision.md:** Why a regular program, Tool, Workflow, limited Agent, or Agent system was chosen.
- **docs/agent-design.md:** Create only when an Agent is needed; document its goal, context, permissions, boundaries, tool selection, stopping, and failure handling.
- **docs/tools.md:** Tool purpose, inputs, outputs, permissions, side effects, errors, timeouts, and confirmation requirements.
- **prompts/system-prompt.md:** Prompt, version date, applicable task, and expected input and output. A prompt cannot replace programmatic permission controls.
- **docs/test-plan.md:** Test scope, methods, acceptance thresholds, risk cases, and pre-release checks.
- **tests/eval-cases.jsonl:** Record each test input, expected behavior, tools, prohibitions, and result. A Markdown table is also fine at the beginning.
- **docs/decision-log.md:** Important decisions, dates, rationale, alternatives, and conditions for reconsidering them.
- **.env.example:** Environment-variable names and placeholders only; never real secrets.

#### Prompt for creating project files

**Copy-and-paste prompt for Codex**

~~~text
Using the confirmed requirements, workflow, and solution decision, create only the foundation files this project needs.

First inspect the existing project structure and files. Do not overwrite or remove unrelated content. Do not create a large number of empty files.

Use solution-decision.md to decide which of these files are actually needed:
- README.md
- docs/requirements.md
- docs/workflow-card.md
- docs/solution-decision.md
- docs/agent-design.md (only if an Agent is confirmed as necessary)
- docs/tools.md (only if Tools exist)
- prompts/system-prompt.md (if a large language model is used)
- docs/test-plan.md
- tests/eval-cases.jsonl or a maintainable Markdown test table
- docs/decision-log.md
- .env.example (only if external configuration is needed)

Requirements:
1. File contents must come from information that has been confirmed.
2. Mark unknowns as open questions; do not invent answers.
3. Label confirmed facts, recommendations, and assumptions.
4. Explain in docs/solution-decision.md why an Agent is or is not needed.
5. Include normal input, missing information, errors/tool failures, and unauthorized/human-escalation cases in the test file; clearly label examples if real cases are unavailable.
6. Never put real secrets in .env.example or source code.
7. Afterward list created and changed files, explain their purpose, and tell me what still needs confirmation before implementation.
~~~

### Stage 6: Develop with Codex in small steps

Do not ask Codex to “finish the whole Agent” all at once. Complete and review one step before moving to the next.

#### Pre-development inspection prompt

**Copy-and-paste prompt for Codex**

~~~text
Read README.md and the requirements, workflow, architecture, and test documents in docs/, then inspect the current code structure.

Do not edit code yet. Tell me:
1. The project's current tech stack and entry points;
2. Which modules this task may affect;
3. Any conflicts between the requirements documents and current code;
4. Key assumptions that remain unconfirmed;
5. The small implementation steps you recommend;
6. How each step will be verified.

If the documents conflict, point it out and explain what needs my confirmation. Do not choose a version on your own.
~~~

#### Development step A: Implement the Workflow shell and deterministic logic

**Copy-and-paste prompt for Codex**

~~~text
Following the confirmed docs/solution-decision.md, first implement the deterministic foundation and Workflow shell. Do not add unapproved autonomous Agent behavior yet.

Requirements:
- Implement fixed steps and branches from docs/workflow-card.md;
- Put input validation, permission checks, and business rules in deterministic code;
- Return clear states on failure;
- Preserve human handoff points;
- Do not change unrelated modules;
- Before editing, tell me which files you plan to change;
- Afterward, explain what was and was not implemented and how to verify it locally.
~~~

If the chosen approach is a standalone Tool, replace “Workflow shell” with the confirmed Tool interface.

#### Development step B: Implement Tool interfaces

**Copy-and-paste prompt for Codex**

~~~text
Implement only the Tool interfaces approved for this stage, as documented in docs/tools.md.

Each Tool needs:
- Input validation;
- Permission checks;
- A clear return structure;
- Timeout and error handling;
- Logs that avoid unnecessary sensitive information.

Implement only the Tools listed in the documents. Do not add a universal Tool, extra permissions, or unconfirmed external actions. Verify success, no-data, invalid-input, unauthorized, and timeout cases.
~~~

#### Development step C: Add an Agent only where it is needed

If the solution decision says an Agent is not needed, skip this step.

**Copy-and-paste prompt for Codex**

~~~text
Using docs/solution-decision.md and docs/agent-design.md, add an Agent only to the specific steps those documents identify.

The Agent may only:
- Handle the single specified objective;
- Use the allowlisted Tools in docs/tools.md;
- Return the defined structured output;
- Follow limits on turns, calls, and cost;
- Stop or hand off to a person when information is insufficient, evidence is missing, a Tool fails, or the request exceeds its permissions.

Ensure that:
1. Tool calls are validated and executed by the program; the model cannot access arbitrary systems.
2. Critical permissions are enforced in code, not only in prompts.
3. The Agent cannot perform side effects not approved in its design.
4. Appropriate runtime logs are kept without exposing secrets or unnecessary personal information.
5. The Agent's responsibilities are not expanded.

Afterward explain which step the Agent owns and which work remains with the Workflow, regular code, or a person.
~~~

#### Development step D: Add a UI or invocation entry point

**Copy-and-paste prompt for Codex**

~~~text
Based on the backend capabilities that have actually been implemented and confirmed, connect the user interface or invocation entry point.

The interface should clearly show:
- User input;
- Processing status;
- Workflow or Agent result;
- Information the user needs to provide;
- Why a handoff or Tool failure occurred;
- A clear human-confirmation action if the result requires approval.

Do not expose API keys in the frontend. Do not reveal system prompts, secrets, or sensitive data to show the Agent's reasoning. Verify the result using the project's existing methods.
~~~

#### At the end of each development step, ask Codex to report

- Which files changed;
- Why they changed;
- Actual behavior;
- Verification performed;
- Which checks passed or failed;
- Whether requirements, workflow, tool, or test documents need updating;
- Remaining risks or unfinished work.

### Stage 7: Test, accept, and iterate

#### Testing prompt

**Copy-and-paste prompt for Codex**

~~~text
Test the current implementation against docs/test-plan.md and the cases in tests/. Do not change expected results casually just to make the tests pass.

At a minimum, check:
1. Normal input;
2. Missing required information;
3. Ambiguous input;
4. Empty Tool result;
5. Tool failure or timeout;
6. Disallowed Tools or parameters;
7. Cases that must be handed to a person;
8. Structured output validity;
9. Maximum turns and stopping conditions;
10. Any external side effect outside the approved scope.

Report:
- Expected and actual outcome for each case;
- Number of passes and failures;
- Failure causes;
- Any high-risk issue;
- Recommended code or document changes.

Do not make broad changes before confirming the failure cause.
~~~

#### Fixing failures

**Copy-and-paste prompt for Codex**

~~~text
For the confirmed failure, first explain the root cause and point to the relevant file and code path. Then propose the smallest fix and describe which existing behavior it might affect.

After the fix, rerun the relevant cases and necessary regression tests, and update the test record and documents. Mark tests that were not run as not run; do not report them as passing.
~~~

#### Pre-release review prompt

**Copy-and-paste prompt for Codex**

~~~text
Review the current version before release against the requirements, architecture, and test documents. Do not check only whether the program starts; check whether its behavior is within scope.

Review:
- Whether confirmed success criteria are met;
- Whether anything explicitly out of scope was implemented;
- Whether the Agent can call only allowlisted Tools;
- Whether permissions and high-risk actions are enforced in code;
- Whether the system stops safely when a Tool fails;
- Whether there are timeouts, turn limits, and cost limits;
- Whether secrets or sensitive information are exposed;
- Whether a person can take over;
- Whether logs are sufficient for troubleshooting;
- Whether tests cover failure and unauthorized cases.

Conclude with one of: “Ready for a limited trial,” “Needs fixes,” or “Not ready for a trial.” Explain the evidence for each finding. Mark checks that were not performed as not performed.
~~~

#### Limited-trial recommendations

1. Handle one clearly defined task only;
2. Start by generating drafts; do not send them externally;
3. Start with read-only Tools;
4. Have someone familiar with the work sample the results;
5. Record errors, follow-up questions, human handoffs, time, and cost;
6. Fix source-material and workflow issues before considering broader permissions.

### Practical habits for working with Codex

#### 1. Ask Codex to restate before editing

**Copy-and-paste prompt for Codex**

~~~text
Restate the goal, scope, and constraints in your own words, then list the files you plan to change. Do not edit until I confirm.
~~~

#### 2. Require test evidence

Ask Codex which commands and tests it actually ran. Anything not run must be labeled as not run.

#### 3. Keep documents and code aligned

When requirements, workflow, or permissions change, ask Codex to update requirements.md, workflow-card.md, solution-decision.md, agent-design.md, tools.md, the test plan, and README.md as applicable.

#### 4. Change one major factor at a time

If the prompt, model, tools, and workflow all change together, it is difficult to identify the cause of a regression. Change one major factor at a time and rerun the same test set.

#### 5. Preserve uncertainty

Mark unconfirmed APIs, data permissions, business policies, and success metrics as open questions. Do not invent details to make the plan look complete.

### Complete workflow at a glance

| Stage | What you and Codex do | Main deliverable |
|---|---|---|
| 1. Explain the goal | Tell Codex you are a beginner; interview first, no coding | Initial direction |
| 2. Interview requirements | Confirm user, problem, current process, value, and scope | docs/requirements.md |
| 3. Map the workflow | Record human actions, decisions, branches, and completion conditions | docs/workflow-card.md |
| 4. Decide the approach | Choose regular program, Tool, Workflow, Agent, or human | docs/solution-decision.md |
| 5. Prepare project files | Create only the documents and tests currently needed | README, docs, tests |
| 6. Implement in stages | Deterministic logic first, then Tools, then limited Agent and UI | Working MVP |
| 7. Test and iterate | Test normal, failure, permission, and human-handoff cases | Acceptance results and iteration record |

**Core distinction:** A Tool is a capability; a Workflow is a process orchestrated in advance; an Agent is the part that decides what to do next at runtime. A mature system often combines all three. If an Agent does not provide verifiable value, do not add one just for the label.

Start with a real task. Confirm the workflow, approach, boundaries, and acceptance criteria with Codex, then build incrementally.
