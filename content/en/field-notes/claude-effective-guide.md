---
title: A Practical Guide to Using Claude More Effectively
description: Use Projects, personal context, custom instructions, and structured prompts to make Claude a long-term thinking partner.
category: Field notes
slug: claude-effective-guide
publishedAt: '2026-09-29'
---

# A Practical Guide to Using Claude More Effectively

> Original author: Anatoli Kopadze; complete English edition based on the supplied Chinese document. Source: [@AnatoliKopadze on X](https://x.com/AnatoliKopadze). The percentages and experience-based judgments below are retained as claims from the source; BuildCodex has not independently verified them.

The source argues that most people use only a small portion of Claude's capabilities. Its central idea is not to collect isolated tricks, but to help Claude understand you and then use it as a continuing work partner. Interfaces may change, so look for controls by meaning when labels differ.

## Start here

### 1. Create a Project instead of an ordinary chat

Every new Claude chat starts without knowing your name, work, goals, or communication preferences. A Project is a persistent workspace where you can keep related context and conversations together.

Open Claude, choose Projects in the sidebar, create a project named for your use case such as Work or Personal, and keep related material there.

### 2. Tell Claude who you are

Fill in this template and save it to the Project knowledge base:

```text
Name / preferred form of address:
Profession / work:
Main goals (short term / long term):
How I like to communicate (direct, detailed, concise, examples, etc.):
Response styles I dislike:
Current priority project:
Other important context:
```

The more specific the information, the easier it is for later replies to fit your way of working.

### 3. Turn it into custom instructions

After providing the background, use this prompt:

```text
Based on the personal background I provided, generate a concise and clear set of Custom Instructions.
Requirements:
1. Address Claude directly in the second person
2. Include who I am, my work, my goals, and my preferred response style
3. Clearly say what Claude should not do, such as unnecessary openings or excessive summaries
4. Keep it concise and forceful, between 300 and 500 Chinese characters
```

Copy the result into Project Instructions as the default operating mode for that Project.

## Claude is not a search engine

### 4. Turn questions into shared thinking

Instead of asking only “What is prompt caching?”, describe the real situation:

```text
I am building a workflow that calls Claude 20 times per session. Explain step by step how prompt caching works and whether it can actually reduce costs in my situation.
```

The second prompt gives Claude a contextual problem to solve rather than asking it to recite a definition.

### 5. Ask Claude to question you first

Before a complex task, use:

```text
Before you start, ask me 3–5 key questions to make sure you understand my requirements and context. Wait for my answers before beginning.
```

You can also specify the audience, core message, tone, and success criteria. This reduces rework caused by incorrect assumptions.

## Techniques many ordinary users miss

### 6. Clone a writing style

Give Claude three to five samples of your writing. Ask it to analyze sentence length, word choice, tone, structure, and punctuation patterns rather than merely label your style:

```text
Here are 3–5 samples of my writing. Analyze my writing patterns carefully, including sentence length, word choices, tone, structural preferences, and punctuation. Do not simply say “your style is...”; break down the concrete patterns. After the analysis, write the following in exactly the same style...
```

### 7. Treat Claude as a sparring partner

Before committing to a plan, decision, or article, ask Claude to pressure-test it:

```text
Attack the idea below in the harshest and most uncompromising way. Identify every flaw, risk, unreasonable assumption, and way it could fail. Do not encourage me; give me only the real problems.
```

### 8. Turn on extended thinking

Simple tasks do not need it. For complex decisions and analysis, click the brain icon in Claude or add:

```text
Use extended thinking and reason through the problem step by step before giving the final answer.
```

### 9. Ask Claude to write its own prompt

When you are unsure how to describe a task:

```text
I want you to help me complete [specific task]. First write a high-quality prompt that will help you perform at your best. Then execute the task using that prompt.
```

## Get more while using fewer tokens

### 10. Specify the output length

State the length and format up front:

```text
Answer in no more than 200 words.
Summarize in three points, one sentence per point.
```

The source says this often reduces token use by 40%–60% on many tasks; that percentage is an experience-based claim from the source, not a BuildCodex test result.

### 11. Remove unnecessary openings

Add this to custom instructions:

```text
Give the answer directly. Do not add an opening, repeat my question, add a disclaimer, or write a closing summary. Do not add extra material unless I ask for it.
```

### 12. Stop explaining yourself in every chat

Put stable background information in the Project and custom instructions instead of pasting it into every new conversation. New chats can then inherit the necessary context without repeated input.

### 13. Start a new chat when the topic changes

Claude carries the context of the current chat. When you switch to an unrelated subject, start a new chat inside the same Project so you retain Project context while dropping irrelevant baggage.

## Prompts you can use right now

### 14. Understand anything with an analogy

```text
Explain [concept] using the Feynman technique.
Requirements:
1. Use everyday language, as if explaining to a bright middle-school student
2. Include at least one vivid analogy
3. Avoid technical terms; explain any unavoidable term first
4. End with one sentence stating the core insight
```

### 15. Plan travel around your real style

```text
Plan a trip based on the following:
- Destination and dates:
- My travel style (slow, intensive, food-first, nature-first, etc.):
- Budget range:
- Experiences I genuinely care about rather than influencer check-ins:
- Things to avoid:
```

### 16. Analyze real monthly spending

```text
Here is my spending detail (or a bank-statement summary) for the past month. Please:
1. Categorize it clearly and total each category
2. Identify unusual or notable spending patterns
3. Give 2–3 specific, actionable adjustments
4. Summarize the month's financial health in one sentence
```

### 17. Use Claude as a private thinking partner

```text
I am stuck on [specific dilemma / decision]. Act as my thinking partner:
1. Ask questions first to help clarify the problem
2. Do not rush to give advice; help me see angles I may be missing
3. Stay neutral and do not promote a particular direction
4. Finally, help me organize the priorities I actually care about
```

This is not therapy. It is structured self-reflection with an outside perspective.

### 18. Pressure-test a business idea before investing

```text
Strictly pressure-test this business idea:
[Describe the idea]
Attack it from these angles:
1. Do target users really have this pain? How strong is it?
2. Why are existing solutions insufficient?
3. What are the largest execution risks and assumption gaps?
4. If it fails in a year, what is the most likely reason?
Do not encourage me; give me only the real problems.
```

## The real point

The source concludes that Claude's value is not only answering questions. It brings patience, broad knowledge, and the ability to consider angles you may not have considered. The people who get the most from it provide real context and treat it as a partner rather than an answer machine.

Set it up once and change the way you work.

## Source

- Original author: Anatoli Kopadze
- Original source: [@AnatoliKopadze on X](https://x.com/AnatoliKopadze)
