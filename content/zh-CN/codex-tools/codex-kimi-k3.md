---
title: 从零安装 Codex，并接入 Kimi K3
description: 面向中国大陆初学者的 Codex CLI、CC Switch 与 Kimi K3 配置指南。
category: 安装指南
slug: codex-kimi-k3
publishedAt: '2026-09-28'
---

# 从零安装 Codex，并接入 Kimi K3

适用：只会电脑基本操作、身在中国大陆、想在 Windows 或 Mac 上使用 Codex 和 Kimi K3 的人。核对日期：2026 年 9 月 28 日。软件界面可能更新；按钮名称略有不同，请按其含义寻找。

> **重要更正：无法保证所有软件在中国大陆都能下载并使用。**OpenAI 当前公布的 ChatGPT/API 支持地区列表未包含中国大陆；即便从别处获得桌面安装包，也不能据此保证账号登录和服务可用。请先完成“大陆环境检查”。如果 ChatGPT 桌面端不可用，仍可尝试 **Codex CLI + Kimi 开放平台 Key**；如果 Codex CLI 安装包也无法取得，就不能如实承诺在本地完成“Codex + Kimi”。不要购买来历不明的所谓国内版安装包或共享账号。

## 先读这三句话

1. Codex 是帮你读文件、写代码和运行任务的应用。这里是安装现成软件并配置自己的 Kimi 模型，不是在训练一个新模型。
2. 本教程的大陆主线是：**Codex CLI + CC Switch + Kimi 开放平台 API Key**。ChatGPT 桌面应用是可选界面，必须在你能合法正常取得、登录和使用的前提下才添加。请不要同时照其他教程修改 `.codex/config.toml`，两套配置可能互相覆盖。
3. **ChatGPT Plus 和 Kimi API 分别计费。**使用 Kimi 开放平台的 Key 时，模型请求按 Kimi 平台规则扣费。先查看余额与价格，再做简短测试。

## 你将安装什么

| 东西 | 用途 | 官方入口 |
| --- | --- | --- |
| ChatGPT 桌面应用（包含 Codex） | 可选图形界面；大陆不能保证可取得或登录 | [Mac 官方下载](https://chatgpt.com/download/)，Windows 见微软商店 |
| Codex CLI | 让 CC Switch 识别并管理 Codex 的本地配置；只需启动一次 | 优先在 CC Switch 的“设置 → 关于”安装 |
| CC Switch | 用图形界面存放 Key、选择 K3、开启本地路由 | [官网](https://ccswitch.io/) 或 [GitHub Releases](https://github.com/farion1231/cc-switch/releases) |
| Kimi 开放平台 | 创建 API Key、查看余额和用量 | [平台入口](https://platform.kimi.com/) |

**API Key 是一串密码，不是你的 Kimi 登录密码。不要在聊天、截图或公开视频中显示。**

## 0. 大陆环境检查：先做，别先充值

1. 打开 [Kimi 开放平台](https://platform.kimi.com/)。如果能看到登录页，继续；打不开则暂时无法按本教程创建和使用 Key。
2. 打开 [CC Switch 官网](https://ccswitch.io/)，点击“下载”，观察安装文件是否真的完成。该项目表示官网下载由 Cloudflare 节点分发、不依赖 GitHub 页面可打开，但这**不是大陆每条网络都能成功下载的保证**。打不开时可以试[唯一官方仓库的 Releases](https://github.com/farion1231/cc-switch/releases)。都打不开就停在这里，不要去不明网盘找安装包。
3. Mac 如需桌面界面，可试 [ChatGPT 下载页](https://chatgpt.com/download/)；Windows 可在微软商店搜索 ChatGPT。这两个入口在大陆都不能保证可用。下载成功也不代表可以正常登录。
4. 记下结果：Kimi 页面能打开吗？CC Switch 安装包下载完成了吗？ChatGPT 桌面应用入口能打开吗？只要前两项能完成，就先试 CLI 路线；桌面端不是开始所必需的。

## A. 如果你用 Mac：按顺序做

### A1. 看看你的 Mac 是什么芯片

点击苹果图标 `` → “关于本机”，看“芯片”或“处理器”。`M1/M2/M3/M4/...` 是 **Apple Silicon**；写着 `Intel` 就是 **Intel Mac**。

### A2. 可选：安装 ChatGPT 桌面应用

打开 [https://chatgpt.com/download/](https://chatgpt.com/download/)，按芯片选择 Mac 版本。下载 `.dmg` 后双击，把 ChatGPT 拖到 Applications；若是 `.pkg`，按“继续 → 安装”。打开应用并登录；如果提示不支持地区、一直登录失败或无法连接，停止桌面应用步骤，继续 A3 的 CLI 方案。**通过标志：应用已安装，且你能实际登录并进入 Codex。**

### A3. 安装 CC Switch

打开 [CC Switch 下载页](https://ccswitch.io/)；打不开时使用 [Releases](https://github.com/farion1231/cc-switch/releases)。下载文件名带 `macOS.dmg` 的安装包，双击后把 **CC Switch** 拖到 Applications，再打开它。**通过标志：看到 CC Switch 主窗口，并能找到 Codex 标签。**

### A4. 安装并启动一次 Codex CLI

1. CC Switch → 齿轮“设置” → “关于”，找到工具列表中的 **Codex**。显示“安装”就点击；显示“更新”或已安装则不用重复安装。
2. 打开“终端”，输入 `codex --version`。出现版本号说明已安装；再输入 `codex` 启动。若出现 ChatGPT 登录界面且无法登录，先退出，完成 C、D 部分后重试。
3. 看到 Codex 输入界面后输入 `/exit` 或按 `Control + C` 退出。若 CC Switch 下载失败且已安装 Node.js/npm，可尝试：

```bash
npm install -g @openai/codex --registry=https://registry.npmmirror.com
```

这是 npm 软件包镜像，会受同步状况影响；安装完仍以 `codex --version` 验证。**通过标志：`codex --version` 显示版本号。**

## B. 如果你用 Windows：按顺序做

### B1. 安装 ChatGPT 桌面应用

在 Microsoft Store 搜索 ChatGPT，核对发布者后安装。若商店地区不可用，直接跳到 B2。也可以在终端或 PowerShell 执行官方文档列出的方式：

```powershell
winget install --id 9PLM9XGG6VKS -s msstore
```

打开后按提示登录并确认能看到 Codex。若商店说所在地区不可用或登录提示地区问题，跳过本节，不要更改系统地区来假装已验证可用。

### B2. 安装 CC Switch

打开 [官网](https://ccswitch.io/) 或 [Releases](https://github.com/farion1231/cc-switch/releases)。普通 Windows 下载文件名包含 `Windows.msi` 的版本；ARM 设备下载 `Windows-arm64.msi`。双击 `.msi`，按“下一步/安装/完成”，再从开始菜单打开 CC Switch。**通过标志：主窗口里能找到 Codex 标签。**

### B3. 安装并启动一次 Codex CLI

CC Switch → 设置 → 关于 → Codex → 安装。打开终端或 PowerShell，输入 `codex --version`，出现版本号后输入 `codex`。首次提示登录而无法登录时先退出，完成 C、D 后再试。**通过标志：`codex --version` 显示版本号。**

## C. Mac 和 Windows 都要做：申请 Kimi Key

1. 打开 [https://platform.kimi.com/](https://platform.kimi.com/)，注册或登录。
2. 在控制台找到 **API Key 管理**，创建 Key，可命名为 `Codex-K3`。
3. 创建后立即复制并保存到可信的密码管理工具；有的平台只完整显示一次。
4. 查看余额、费用和用量，确认账号可以调用 `kimi-k3`。Kimi 网页聊天会员与开放平台 API 不会自动共享同一份额度。**通过标志：拿到新的 API Key，且能在开放平台查看用量或额度。**

## D. 在 CC Switch 中接入 Kimi K3

### D1. 添加供应商

打开 CC Switch → **Codex** → 右上角 **＋** → “添加供应商/Provider” → 预设选择 **Kimi**。你使用的是 `platform.kimi.com` 开放平台 Key，因此选 **Kimi**，不要选 **Kimi For Coding**。粘贴 API Key，获取模型列表，选择 `Kimi K3` 或 `kimi-k3` 并设为默认模型；如果显示 `Kimi K2.7 Code`，主动改成 K3。最后保存。**通过标志：供应商列表出现 Kimi，所选模型是 `kimi-k3`。**

### D2. 开启本地路由

CC Switch → 设置 → **路由/Routing** → **本地路由/Local Routing**。打开路由总开关和 Codex 开关；Claude、Gemini 不需要打开。回到 Codex 供应商列表启用 Kimi。**通过标志：本地路由显示运行中，Codex 路由已开启。**默认地址是 `127.0.0.1:15721`，它是电脑自身地址，不是浏览器登录网站。

### D3. 重启并做两个小测试

保持 CC Switch 和本地路由运行，完全退出 Codex/ChatGPT 应用。在终端输入 `codex`。用 `/model` 或顶部标识确认是 Kimi K3，然后输入“请只回答：连接成功。”再用一个空测试文件夹，让 Codex 创建 `hello.txt` 并检查路径。到 CC Switch 路由记录或用量页面、Kimi 平台查看请求。**全部成功的标志：CLI 有模型回复、测试文件夹出现 `hello.txt`、CC Switch 当前供应商为 Kimi 且有新请求记录。**

## E. 卡住时按现象检查

| 现象 | 先检查什么 |
| --- | --- |
| 桌面应用打不开或无法登录 | 中国大陆不能保证桌面版可用；跳过桌面端，继续 CLI + Kimi |
| `codex` 找不到 | 回 CC Switch 设置 → 关于确认已安装；关闭终端再打开 |
| 找不到 K3 | 更新 CC Switch，重新获取模型列表，确认开放平台账号支持 `kimi-k3` |
| `401 Unauthorized` | Key 是否完整？是否来自 `platform.kimi.com`？供应商是否选了 Kimi？ |
| `403` 或 `429` | 检查模型权限、余额、速率或并发限制 |
| `/responses` 报 `404` | 检查路由总开关、Codex 开关和启用供应商；完全重启 Codex |
| 不知道实际用了谁 | 看 CC Switch 当前供应商和请求记录，不要只凭回答判断 |
| 配置修改后被改回 | CC Switch 开启路由时会管理配置，不要同时修改 `config.toml` |

记录报错**原文**并截图，但截图前遮住 API Key。`401`、`403`、`404`、`429` 比“打不开”更有助于定位。

## F. 你必须知道的可用性边界

- Kimi 开放平台面向国内用户，但账号是否有模型权限和额度，要在自己的控制台确认。
- CC Switch 提供官网下载和 GitHub Releases，但不能保证当前大陆网络必定下载成功。
- Codex CLI 可通过 CC Switch 或 npm 获取；安装成功不等于 ChatGPT 服务在大陆受支持。
- ChatGPT/Codex 桌面应用的 OpenAI 支持地区列表未列中国大陆。下载成功也可能无法登录或调用服务；切换 Kimi 不会自动解决应用登录或地区限制。
- 本教程核对的是发布渠道和配置文档，没有在你的深圳网络及你的 Mac/Windows 设备上逐一下载安装。不能仅靠网页信息保证所有软件在中国大陆都能下载。

## G. 关于视频里提到的额外软件

视频中的第三方 GitHub 安装包仓库、GitHub 加速器和系统更新工具，不属于上述必需步骤。先从 OpenAI、Kimi 和 CC Switch 各自的入口下载。只接入 Codex 时，也无需打开 CC Switch 的 Claude、Gemini 路由。

## 核对来源

- OpenAI 下载入口与 Windows 安装：[下载](https://chatgpt.com/download/)、[Windows 文档](https://learn.chatgpt.com/docs/windows/windows-app)（第二个仅供溯源）
- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Kimi 的 Codex K3 官方指南](https://platform.kimi.com/docs/guide/codex-kimi)
- [CC Switch 安装指南](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/en/1-getting-started/1.2-installation.md)
- [CC Switch Kimi 路由指南](https://github.com/farion1231/cc-switch/blob/main/docs/guides/codex-kimi-routing-guide-zh.md)
- [OpenAI 支持地区](https://help.openai.com/en/articles/8983035-why-cant-i-sign-up-due-to-unsupported-country)

**说明：**Kimi 已支持 Codex 通过 Responses API 直连。本文选择 CC Switch 路线，是为了让初学者尽量在图形界面完成 Key 与模型选择；它是一款第三方工具，界面可能随版本变化。
