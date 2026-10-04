# BuildCodex 内容发布流程

这份流程用于每次新增或更新网站文章。网站是面向 Codex、AI 工具、Agent 构建、Agent 评测和实战观察的内容站。

## 1. 内容整理

收到 Markdown、Word 或其他原始文档后，先忠实整理原文：

- 保留步骤、警告、适用系统、链接、核对日期和事实边界；
- 不把“可能”改成“保证”；
- 不把第三方链接写成官方链接；
- 不编造软件能力、价格、地区可用性、下载链接或测试结果；
- 发现冲突、疑似过时或表述不清时，先标记并询问；
- 英文版只能基于确认后的中文原文翻译，不遗漏步骤或链接。
- 每个新页面必须同时准备中文和英文版本；两种语言使用相同的 `section` 和 `slug`，不得只发布单语言卡片。
- 如果原始材料只提供一种语言，先完成对应语言草稿，但在另一语言版本完成前不得把它作为“已同步页面”发布；应在发布前补齐翻译并检查两个 URL。

## 2. 内容目录

中文文章放在：

```text
content/zh-CN/<section>/<slug>.md
```

英文文章放在：

```text
content/en/<section>/<slug>.md
```

可用板块：

```text
codex-tools
agent-building
agent-evaluation
field-notes
```

`slug` 必须唯一、稳定，并与文件名一致。中文和英文必须使用同一个 slug，形成一一对应的页面：

```text
content/zh-CN/agent-evaluation/example.md
content/en/agent-evaluation/example.md
```

每次新增页面前，必须检查：

- 中文 URL 可以打开；
- 英文 URL 可以打开；
- 两个版本的卡片都能点击进入正文；
- 正文中的站内链接在两种语言下都不会指向缺失页面；
- 语言切换不会把用户带到 404。

如果暂时无法完成双语版本，应明确标记为“待翻译”，不要让页面显示一个实际不存在的语言切换链接。

## 3. Frontmatter 和页面结构

文章至少需要有效的 `title`、`description`、`category` 和 `slug`。包含英文冒号的 YAML 值要加引号，例如：

```yaml
title: 'QA with AI: From Traditional Testing to Quality Engineering'
```

不要在 Markdown 正文中重复添加文章 H1，页面模板会渲染 frontmatter 标题。命令、路径、网址、API 字段和模型 ID 使用代码格式，并保持原样。

## 4. 自动 sitemap 规则

网站使用 `app/sitemap.ts` 自动生成 sitemap。文章部署后会自动出现在：

```text
https://www.buildcodex.net/sitemap.xml
```

不需要手动编辑第二份 sitemap，也不需要每次重复向 Google Search Console 提交 sitemap。

## 5. 发布前验证

每次更新文章后运行：

```bash
npm run lint
npm test
npm run build
```

部署后检查：

```text
https://www.buildcodex.net/<locale>/<section>/<slug>
https://www.buildcodex.net/sitemap.xml
https://www.buildcodex.net/robots.txt
```

确认新 URL 在 sitemap 中，旧文章或旧路径没有被误加入。

## 6. 三阶段部署与验收

每次开发完成后必须按以下顺序发布：

1. **只改 test**：所有新开发和修改先在 `test` 分支完成，禁止直接修改 `main`。
2. **本地部署**：在 `test` 分支启动本地站点，提供本地 URL，由站长检查页面格式、内容、链接和广告等实际效果。
3. **test 环境**：站长确认本地版本后，将 `test` 分支部署到测试环境，提供测试环境 URL，再次等待站长验收。
4. **生产环境**：只有站长明确回复测试环境已检查通过后，才允许把 `test` 合并到 `main`，并从 `main` 分支部署生产环境。

生产环境不得直接使用 `test`、功能分支或未合并的本地工作区部署。部署成功后必须检查生产 URL、`sitemap.xml` 和 `robots.txt`。

## 7. Search Console 操作

已经成功收录的页面不需要重复提交。新增重要文章时，在 Google Search Console 的“网址检查”中输入完整 URL，选择“请求编入索引”一次即可。

优先提交新发布的英文页面；中文页面按实际需要处理。Google 是否立即收录和排名不由网站代码保证。

## 8. 删除旧内容

旧内容下线前先确认最终 URL 返回 `404` 或 `410`。只对明确的旧路径使用 Search Console 的“移除”，不要移除整个 `buildcodex.net`。临时移除只是隐藏搜索结果，长期清理仍依赖旧 URL 保持 404/410。
