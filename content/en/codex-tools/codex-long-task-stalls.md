---
title: When Codex Stalls During a Long Development Task
description: Common reasons Codex pauses, stops, or appears stuck during long development tasks, plus a practical recovery order from status checks to resuming work.
category: Troubleshooting
slug: codex-long-task-stalls
publishedAt: '2026-09-30'
---

When Codex stops making progress during a long development task, it is not always a real process hang. Common causes include waiting for permission, reaching a usage limit, ending the turn early, or losing state because of a connection or context problem.

The commands and modes mentioned here—such as `/goal`, `/status`, `/ps`, `codex resume --last`, Auto-approve, and permission-skipping modes—can vary by Codex version and environment. Check what the current environment actually supports before using them.

## 1. Most common: permission confirmation / human-in-the-loop

Codex may pause for approval before it performs actions such as:

- running terminal commands, especially commands requiring elevated permissions;
- writing or overwriting files;
- performing potentially risky actions;
- answering an additional elevated-permission prompt in newer versions.

If you are away from the screen and do not approve the action, the task may appear to wait indefinitely.

### What to do

- If the environment is safe and the project scope is clear, consider Auto-approve or another more autonomous mode available in the current environment.
- Do not casually enable permission-skipping modes in untrusted projects, production environments, or directories containing sensitive data.
- Use Goal mode, if supported, with a clear completion condition.
- Add frequently used, low-risk commands to the allowlist supported by the current environment.

Permission confirmation is a safety boundary, not simply a failure to bypass. Keep human approval for deletion, production changes, data uploads, and unknown scripts.

## 2. Usage limits: quota / rate limit

Codex may enforce usage limits across time windows or billing periods. Once a limit is reached, a task can stop, and sometimes the active turn is terminated as well.

If a task ends without an obvious error or approval prompt, check the current account or workspace usage state. Limits, windows, and reset times vary by account, model, plan, and product version; do not assume that one fixed five-hour or weekly limit applies to every user.

### What to do

- Check the usage and reset information shown by the current Codex environment.
- Break long tasks into independently verifiable milestones.
- Save progress, changed files, and the next objective before starting a long run.
- After a limit is reached, wait for reset or use a model and environment currently available to the account.

## 3. The model “finishes early”

This is a model-behavior or task-management problem. Common signs include:

- the model calls `final` halfway through a long task because it decides the work is “good enough”;
- after context compaction, it loses momentum and waits for a new instruction;
- Goal mode enters a paused-state loop such as `Remain paused`.

### What to do

Send an explicit continuation request:

```text
Continue the previous task. First inspect the current files, test results, and unfinished items. Resume from the last incomplete step and continue until the original completion criteria are met.
```

Shorter instructions can also work:

```text
continue
keep going
resume from last step
```

It is better to include the current goal, completed work, unfinished work, and completion criteria rather than saying only “continue.”

## 4. Other common causes

### Model capacity

An error such as `Selected model is at capacity` usually means that the selected model cannot accept the task temporarily. Wait or switch to a model currently available.

### A temporary network or connection failure

After a connection drops, the UI may not immediately return to the correct state. Confirm that the connection has recovered and check whether the task is still running. Do not blindly resubmit commands with side effects.

### An oversized context

An oversized context can cause slow responses, frequent compaction, or loss of task details. You can try `/compact`, if supported, and then say:

```text
Continue the previous task. First read the current project state and existing changes. Do not restart and do not repeat completed work.
```

## A practical recovery order

### Step 1: check the current state

Determine whether Codex is waiting for approval, a background command is still running, or the task has ended. Try `/status` or `/ps` if the current environment supports them.

Also check:

- whether an approval prompt is visible;
- whether a terminal command is still running;
- whether there is a quota, capacity, or connection error;
- whether new workspace changes appeared;
- whether tests, builds, or a development server are still alive.

### Step 2: ask it to continue explicitly

```text
Continue the current objective. First inspect the completed files, test output, and git diff. Identify the last unfinished step and continue from there. Do not repeat work that is already complete.
```

Some CLI environments may support a recovery command such as:

```bash
codex resume --last
```

Whether this command is available depends on the current CLI version and run mode; check the current help output first.

### Step 3: reduce the pressure of one long run

- Split the work into analysis, implementation, testing, repair, and commit milestones.
- Save files and test results after each milestone.
- Remove unrelated context from the task.
- State completion criteria and forbidden actions at the start.

### Step 4: adjust autonomy or the model

Within a safe scope, use a mode with fewer manual interruptions. If one model variant repeatedly stops early, try another model or a lower reasoning effort available in the current environment. Do not generalize a behavior observed in a particular model variant to every account or version.

## A more reliable long-task prompt

```text
Goal: [state the final result clearly]

Break the task into verifiable milestones:
1. Inspect the project and list the plan
2. Implement the first part and run relevant tests
3. Implement the remaining work and fix issues
4. Run lint, test, and build
5. Check git diff, git status, and the final result

If you encounter an approval prompt, network error, usage limit, or model-capacity issue, report the current state and blocker. After recovery, continue from the last completed milestone instead of restarting.

Completion criteria: [list checkable files, pages, tests, or command results]
```

## Final checks

When Codex resumes, do not only check that it is producing output. Verify the actual result:

- changes were written to the intended files;
- tests and builds actually ran and passed;
- no duplicate commits or repeated changes were created;
- no permission, network, or security warning remains unresolved;
- the working tree and task outcome match expectations.

Continuing to produce output is not the same as completing the task. Use files, test results, and verifiable runtime evidence as the final authority.
