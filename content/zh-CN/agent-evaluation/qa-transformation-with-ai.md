---
title: '传统 QA AI 化实战案例'
description: '结合美股交易、资金划转和 Calendar Agent，记录如何把传统 QA 流程转成可生成、可评估、可回归的 AI QA 实验。'
category: Agent 评测 · 实战案例
slug: qa-transformation-with-ai
publishedAt: '2026-10-01'
---

AI 调研真正有价值的地方，不是让 QA 照抄 Uber、Microsoft 或 Fraunhofer 的系统，而是从公开案例中提炼工程模式，再结合自己的业务问题设计、实现和评估。

这篇文章讨论的不是“AI 能不能生成测试用例”，而是：

> AI 能不能帮助 QA 在复杂业务规则下发现更多有效风险，并且用可验证的数据证明这些帮助确实提高了质量？

如果你还不了解本文中的 Calendar Agent，可以先阅读 [Calendar Agent 项目总页](/zh-CN/agent-building/calendar-agent/)。它是本文 Agent QA 部分的真实工程案例。

## 传统 QA 到 AI QA 的转型，不是一步变成 Agent

传统 QA 通常是：

```text
需求与变更 → 需求分析 → 风险识别与测试计划 → 场景 / 用例设计
→ 手工或自动化执行 → 缺陷分析 → 回归验证 → 发布质量评估
```

AI 增强后的流程应该是：

```text
需求、接口、代码变更、历史缺陷、测试数据
→ 受控上下文
→ AI 分析 / 提议 / 生成
→ QA 审核和补充
→ 人或受控工具执行
→ 收集日志、响应、状态和其他证据
→ AI 辅助归纳与定位线索
→ QA 判断
→ 回归 / CI / 持续评估
```

比较稳妥的演进路径是：

```text
LLM 对话
    ↓
AI + 标准模板
    ↓
AI + 需求、历史缺陷和领域知识
    ↓
AI + API / 浏览器 / 代码仓库 / CI
    ↓
Workflow / Agent + Evaluation
```

很多 QA 工作只需要“文件 + 一次分析 + 人工复核”就有价值，不需要为了使用 Agent 而使用 Agent。

## 公开案例应该借鉴什么？

| 公开案例 | 不应该照搬 | 应该借鉴的模式 | 适合的业务场景 |
| --- | --- | --- | --- |
| Fraunhofer | 具体 Test Case | Generate → Quality / Uncertainty Evaluation → Human Review | 资金、美股 |
| Microsoft AI for Testing | 模型或论文实现 | AI 生成测试 + Coverage / Regression 验证 | 美股 |
| Uber uReview | Code Review 产品 | Generate → Filter → Validate → Deduplicate | 美股 Scenario Generation |
| Uber Flaky Test | 具体 Flaky 场景 | Failure → Classification → RCA → Governance → Regression | 资金划转 |
| Uber DragonCrawl | Mobile Agent 实现 | Observe → Decide → Execute → Observe | 未来 Mobile E2E |

公开材料更适合用来提供 Design Pattern。真正进入项目的部分，必须经过自己的 QA 场景设计、实现和 Eval。

本文把这些模式落到两个不同方向：美股交易关注“能不能生成并覆盖有效风险场景”，资金划转关注“能不能根据真实证据定位失败原因”。两者都不是把公开项目原样搬过来。

| 业务案例 | 主要借鉴的公开模式 | 本文中的落地方式 |
| --- | --- | --- |
| 美股交易 | [Fraunhofer 的 AI/LLM 测试用例生成](https://www.iese.fraunhofer.de/blog/software-testing-test-case-generation-using-ai-llm/)、[Microsoft AI for Testing](https://www.microsoft.com/en-us/research/project/ai_for_testing/?lang=zh-cn) | 规则提取、风险分析、场景生成、覆盖率评估、QA 审核 |
| 美股交易评测 | [Microsoft TestExplora](https://www.microsoft.com/en-us/research/publication/testexplora-benchmarking-llms-for-proactive-bug-discovery-via-repository-level-test-generation/) | 用历史缺陷和可复现结果判断测试是否真的发现了问题 |
| 资金划转 | [Microsoft 关于可靠 AI 测试与评估的研究](https://www.microsoft.com/en-us/research/blog/learning-from-other-domains-to-advance-ai-testing-and-evaluation/) | 约束测试目标、保留证据、解释结果，不接受无证据的 AI 猜测 |
| 资金划转治理 | [Microsoft Reliable and self-repairing agents](https://www.microsoft.com/en-us/research/group/m365-research/)、Uber 的失败分类与 Flaky Test 治理思路 | 失败分类、执行轨迹、证据提取、RCA、QA 确认、回归用例 |

## 一、AI Test Design：以美股交易为第一个 Prototype

交易系统的重点不是“AI 生成了多少条用例”，而是 AI 是否覆盖了重要的交易规则、风险维度、边界条件和历史缺陷。

### 从 Trading Requirement 到有效 Scenario

例如需求是：Limit Order 在盘前交易增加某项限制。

第一步不是让模型直接生成 100 条用例，而是先提取规则和受影响维度：

```text
Trading Requirement
        ↓
Rule Extraction
        ↓
Risk Analysis
        ↓
Scenario Generation
```

可能提取出：

```text
Rule:
  order_type = limit
  session = pre_market

Affected Dimensions:
  Side
  Price
  Quantity
  Buying Power
  Account State
  Order State
```

### 生成之后必须继续评估

这里参考的不是某个公司现成的交易系统，而是公开 AI 测试项目中“生成结果必须经过评估”的共同方法。美股项目需要自己建立交易规则、风险维度和历史缺陷数据集。

AI 生成的 30 条或 100 条 Scenario 不能直接进入测试库，还需要检查：

- Rule Coverage：是否覆盖所有规则；
- Risk Dimension Coverage：是否覆盖重要风险维度；
- Boundary Coverage：是否覆盖边界条件；
- Duplicate Scenario：是否存在语义重复；
- Invalid Scenario：是否违反交易规则；
- Historical Defect Coverage：是否覆盖过去真实出现过的缺陷。

更成熟的流程是：

```text
Requirement
    ↓
Rule Extraction
    ↓
Risk Analysis
    ↓
Scenario Generation
    ↓
Filter ─────┐
Validate ───┼──→ Coverage Evaluation → QA Review
Deduplicate┘
    ↓
Approved Scenarios
```

可以记录一组真正有意义的指标：

```text
Generated Scenarios       100
Invalid                    12
Duplicate                  18
Rule Conflict               4
Accepted                   66
```

其中：

```text
Scenario Acceptance Rate = Accepted / Generated
```

这比“AI 生成了 100 条 Case”更能说明 AI 是否有实际价值。

### 美股项目真正应该评估什么

```text
Trading Rules              → Rule Coverage
Risk Dimensions             → Risk Dimension Coverage
Boundary Conditions         → Boundary Coverage
Historical Bugs             → Historical Defect Recall
Generated Scenarios         → Scenario Acceptance Rate
```

最终要回答的问题是：AI 是否帮助 QA 发现了更多有效风险，而不是 AI 是否输出了更多文字。

### 一个具体的交易场景：限价买入

以“限价买入”为例，AI 不应该只生成一条“输入合法价格并成功下单”的 happy path，而应该根据交易规则、账户状态和历史缺陷扩展风险空间：

- 正常限价买入；
- 涨停价和跌停价；
- 小数价格和最小价格变动单位；
- 数量为 0、负数或超过可交易数量；
- 可用资金不足；
- 盘前、盘中、盘后等不同交易时段；
- 重复提交同一个订单；
- 网络超时后的重试；
- 下单成功但持仓没有同步更新；
- 委托成功、成交失败和部分成交等不同状态。

因此，美股项目可以按照下面的链路实现：

```text
交易需求 / API / 规则文档
        ↓
提取交易规则
        ↓
分析风险维度
        ↓
生成测试场景
        ↓
过滤、去重、验证
        ↓
QA 审核
        ↓
执行并统计覆盖率
```

这里的 AI 不是代替 QA 判断“这个场景一定正确”，而是帮助 QA 发现更多候选场景，再由规则校验、执行结果和人工审核共同决定哪些场景可以进入测试库。

## 二、AI Failure Analysis：以资金划转为第二个 Prototype

资金划转和美股交易不应该使用完全相同的 AI QA 方案。资金系统更值得研究的是失败分析、证据收集和根因定位。

### 从失败到 RCA

这里也没有声称资金系统与 Uber 或 Microsoft 的系统相同。公开案例提供的是失败分类、证据链和回归治理的结构；具体的账户、Ledger、幂等和对账规则，必须来自自己的资金业务。

资金系统常见的复杂失败包括：

- Timeout；
- Retry；
- Duplicate Request；
- Partial Failure；
- Balance Mismatch；
- Ledger Mismatch；
- Incorrect State。

一个转账失败不能只看 API Response，还需要结合：

```text
API Result
+ Database State
+ Ledger State
+ Logs
+ Test Context
        ↓
AI Failure Analysis
        ↓
Possible RCA + Evidence
        ↓
QA Review
        ↓
Regression Case
```

例如故意制造一次问题：

```text
Transfer API timeout
DB = SUCCESS
Ledger = SUCCESS
Client retry → duplicate request
```

AI 应该输出结构化分析，而不是一句“可能是网络问题”：

```json
{
  "failure_category": "idempotency",
  "suspected_root_cause": "duplicate retry after an ambiguous timeout",
  "evidence": ["DB state is SUCCESS", "Ledger state is SUCCESS"],
  "confidence": 0.82
}
```

然后使用 Golden RCA Dataset 评估：

- Failure Classification Accuracy；
- RCA Accuracy；
- Evidence Correctness；
- False Diagnosis Rate。

这里借鉴的不是“Flaky Test”这个名词，而是 Failure → Classification → Evidence → Root Cause → Human Confirmation → Regression 的治理闭环。

### 一个具体的资金划转场景：超时后的重复请求

例如一次资金划转出现以下状态：

```text
Transfer API timeout
DB = SUCCESS
Ledger = SUCCESS
Client retry → duplicate request
```

这时 AI 不应该只返回“资金划转失败，可能是网络问题”，而应该结合多个系统的真实证据输出结构化分析：

```text
失败类型：幂等键冲突

证据：
- API 返回 duplicate_request
- Ledger 中存在相同 operation_id
- 账户余额只扣减一次
- 下游通知重复发送

可能根因：
客户端在一次结果不明确的超时后重试，服务端正确阻止了第二次扣款，
但通知服务仍然需要补充幂等处理。

建议：
1. 保留当前防重复扣款逻辑；
2. 增加重复请求回归用例；
3. 检查通知服务是否需要幂等；
4. 将该案例加入 Golden Failure Dataset。
```

对应的 AI 失败分析链路是：

```text
API 请求
+ 数据库状态
+ 账户余额
+ Ledger 记录
+ 消息队列
+ 服务日志
+ Trace
        ↓
AI 失败分类
        ↓
证据提取
        ↓
根因分析
        ↓
QA 审核
        ↓
生成回归用例
```

资金系统重点评估的不是 AI 写了多少分析，而是：

- 失败分类准确率；
- 根因判断准确率；
- 证据引用正确率；
- 误诊率；
- 重复扣款风险识别率；
- 回归用例有效率。

AI 的结论必须绑定 API、数据库、Ledger、日志或 Trace 等可复核证据，不能只根据一条错误信息猜测原因。

## 三、两个项目共享同一个 AI QA Evaluation Framework

美股和资金划转的 Dataset、Workflow 和 Evaluator 不同，但可以共享同一个评估框架：

```text
Dataset
    ↓
AI Workflow
    ↓
Output
    ↓
Evaluator
    ↓
Metrics
    ↓
Regression
```

### 美股：AI Test Design Evaluation

```text
Golden Trading Dataset
        ↓
Scenario Generator
        ↓
Rule Coverage
Risk Coverage
Boundary Coverage
Historical Defect Recall
Scenario Acceptance Rate
```

### 资金：AI Failure Analysis Evaluation

```text
Golden Failure Dataset
        ↓
AI RCA
        ↓
Classification Accuracy
RCA Accuracy
Evidence Correctness
False Diagnosis Rate
```

这一步会把“AI 帮助测试”从概念变成可以重复运行、对比版本和进入回归的工程系统。

## 四、公开案例如何映射到自己的业务

这些公开案例不是本文项目的同类系统，也不是可以直接复制的解决方案。它们提供的是某一个工程环节，本文再把这个环节映射到自己的业务问题：

| 公开案例 | 参考的工程环节 | 本项目中的业务落地 |
| --- | --- | --- |
| Fraunhofer | AI 生成后进行质量与不确定性评估，并保留人工审核 | 美股测试场景生成、过滤、覆盖率评估 |
| Microsoft AI for Testing | 测试生成、故障发现、覆盖率和回归测试 | 交易规则与风险覆盖 |
| TestExplora | 用真实缺陷验证测试是否真正有效 | 历史缺陷召回率 |
| Microsoft Reliable Agents | 失败证据、诊断、受控修复和回归验证 | 资金划转 RCA 与回归治理 |
| Uber Flaky Test | 失败分类、根因分析和治理 | 资金失败分类、证据链和缺陷闭环 |
| Calendar Agent | Agent 工具调用、状态机、验证和 E2E | 真实 Agent QA |

因此，本文的结论不是“我的资金系统或交易系统和这些公司的系统一样”，而是：

> 我从公开案例中提取生成、评估、诊断和回归等方法，再把它们应用到自己的业务场景中。

## 五、Calendar Agent 如何成为 Agent QA 的真实案例

Calendar Agent 的重点不是交易规则，而是 Agent 在真实世界执行任务时的状态、工具和结果可信度。

它需要测试的不只是最终回复，还包括：

- `conversation_id`、`task_id`、`step_id` 等关联是否正确；
- 缺少时间或时长时是否进入 Clarification；
- Clarification 后是否恢复原 Task；
- 是否调用正确的 `create_calendar_event`；
- Tool Arguments 中的时间、时区和持续时间是否正确；
- MacAgentHost 是否真正调用 EventKit；
- Tool success 后是否经过 `verify_state`；
- 真实 Calendar 状态无法确认时是否返回 `unknown`；
- Siri、Shortcut、HTTP、AgentRuntime、EventKit 的 E2E 链路是否完整。

因此 Calendar Agent 的 QA 可以抽象为：

```text
Deterministic Testing
        +
Agent Evaluation
        +
Observability
        +
Integration / E2E
        +
Regression
```

具体项目背景和当前实现边界，见 [Calendar Agent 项目总页](/zh-CN/agent-building/calendar-agent/)。

## 六、转型时最重要的三个原则

### 1. AI 生成不等于质量完成

不要把流程设计成：

```text
Requirement → LLM → Test Cases → Done
```

应当保留质量评价、覆盖率检查和 QA Review：

```text
Requirement → Generate → Evaluate → Review → Approved Asset
```

### 2. 业务规则和真实证据必须进入上下文

没有需求规则、历史缺陷、领域术语、数据库状态、Ledger 状态或日志，模型只能生成听起来合理的内容，不能证明内容正确。

### 3. 指标必须衡量有效性，而不是产量

更值得追踪的是：

- Rule Coverage；
- Risk Coverage；
- Historical Defect Recall；
- Scenario Acceptance Rate；
- Failure Classification Accuracy；
- RCA Accuracy；
- Evidence Correctness；
- False Diagnosis Rate。

“生成了多少条用例”通常不是质量指标。

## 最终路线

如果要把这套转型真正落地，建议按照以下顺序推进：

```text
第一步：选择美股需求，建立 Golden Trading Dataset
        ↓
第二步：实现 Rule / Risk Extraction
        ↓
第三步：实现 Scenario Generation
        ↓
第四步：加入 Filter / Validate / Deduplicate
        ↓
第五步：实现 Coverage Evaluation
        ↓
第六步：让 QA Review 成为正式环节
        ↓
第七步：用历史缺陷和回归结果验证收益
```

资金划转可以并行建立 Golden Failure Dataset，研究 AI Failure Classification 和 RCA。Calendar Agent 则继续作为真实 Agent QA、工具调用、状态机、Verification 和真机 E2E 的工程案例。

最终目标不是证明“AI 可以替代 QA”，而是建立一套可解释、可复核、可评估、可回归的 AI-assisted Quality Engineering 流程。

## 参考资料

下面的公开资料用于提炼工程模式，不代表本文直接复刻这些系统。链接优先采用项目或机构的官方页面，方便读者继续核对背景和实现边界。

- [Fraunhofer IESE：Software Testing — Test Case Generation Using AI/LLM](https://www.iese.fraunhofer.de/blog/software-testing-test-case-generation-using-ai-llm/) —— 参考“生成之后还要进行质量与不确定性评估，并由测试工程师审核”的思路。
- [Microsoft Research：AI for Testing](https://www.microsoft.com/en-us/research/project/ai_for_testing/?lang=zh-cn) —— 参考把测试生成、故障发现、覆盖率和回归测试放在同一条工程链路中评估。
- [Uber：uReview](https://www.uber.com/gb/en/blog/ureview/) —— 参考 Generate → Filter → Validate → Deduplicate 的多阶段 AI 流程。
- [Uber：Handling Flaky Unit Tests in Java](https://www.uber.com/us/en/blog/handling-flaky-tests-java/) —— 参考失败分类、根因分析、复现和回归治理的思路。
