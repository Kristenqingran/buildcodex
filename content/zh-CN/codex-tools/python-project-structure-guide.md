---
title: '如何从零搭建规范的 Python 项目：目录结构、pyproject.toml、测试与 CI 实战'
description: '从零创建可维护、可测试、可打包的 Python 工程，学习 src 目录结构、虚拟环境、pyproject.toml、pytest、Ruff、CLI、Makefile 和 GitHub Actions，并了解 AI 工程如何扩展。'
category: 工程指南
slug: python-project-structure-guide
publishedAt: '2026-10-09'
updatedAt: '2026-10-09'
---

如果你用 Python 写过脚本，却不知道如何把脚本发展为长期维护的工具、测试框架或 AI 应用，这篇文章给出一条可实际操作的路线：**建立目录 → 配置打包与依赖 → 编写模块 → 添加测试 → 统一开发命令 → 接入持续集成**。

本文方法参考了一个开源 Python AI 测试用例生成工程的组织方式，抽象为通用教程。示例项目 `sampleqa` 是用于教学的简化工程，不是对参考仓库代码的逐行复刻；关于 AI/RAG 的部分也不是新项目开箱即用的功能。

## 1. 什么叫一个“规范的 Python 工程”？

单文件脚本可以解决一次性问题，但多人协作或持续迭代时，通常还需要：

- **可安装**：其他环境能通过标准工具安装包，避免依赖当前工作目录。
- **可配置**：依赖、入口命令、Python 版本、工具规则集中管理。
- **可测试**：业务逻辑与命令行、外部 API 分离，可以在不调用真实服务时验证。
- **可维护**：模块职责明确，输入、业务逻辑、输出相互解耦。
- **可交付**：可以打包、发布，也可以通过 CI 自动检查。

一个实用的最小工程结构如下：

```text
sampleqa/
├── pyproject.toml           # 项目元数据、依赖、工具配置
├── README.md                # 安装与使用说明
├── .gitignore               # 忽略虚拟环境、缓存与密钥
├── src/
│   └── sampleqa/
│       ├── __init__.py
│       ├── core.py          # 核心业务逻辑
│       └── cli.py           # 命令行入口
├── tests/
│   └── test_core.py
└── .github/
    └── workflows/
        └── ci.yml           # GitHub Actions
```

### 常见概念

| 概念 | 含义 | 作用 |
| --- | --- | --- |
| **Package（包）** | 可通过 `import sampleqa` 导入的代码单元 | 提供可复用的 Python API |
| **Module（模块）** | 例如 `core.py` 这样的 Python 文件 | 按职责组织代码 |
| **src layout** | 可安装的源代码放在 `src/包名/` | 减少从仓库根目录误导入未安装源码的情况 |
| **Virtual environment** | 项目独立 Python 环境 | 减少依赖冲突 |
| **Build backend** | 如 Hatchling | 把源码构建为 wheel / sdist |
| **CLI** | Command-Line Interface | 让用户在终端通过命令使用功能 |
| **CI** | Continuous Integration | 在提交或 PR 时自动检查与测试 |

> `src` 布局很适合可安装工具和库，但不是所有小脚本都必须采用它。工程化的目标是降低维护成本，而不是为了目录数量而增加复杂度。

## 2. 从零初始化项目

以下命令适合 macOS/Linux，使用 Python 3.11 或以上版本。Windows 可将激活命令替换为 `.venv\\Scripts\\activate`（PowerShell 使用 `.venv\\Scripts\\Activate.ps1`）。

```bash
mkdir sampleqa
cd sampleqa
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
mkdir -p src/sampleqa tests .github/workflows
touch src/sampleqa/__init__.py README.md
```

添加 `.gitignore`：

```gitignore
.venv/
__pycache__/
.pytest_cache/
.ruff_cache/
.coverage
htmlcov/
dist/
build/
*.egg-info/
.env
```

`.venv/` 是本地依赖环境，不应该提交；`.env` 往往存放凭证，不应该提交。实际项目可以提供不含密钥的 `.env.example`。

## 3. 通过 pyproject.toml 集中管理工程

在项目根目录创建 `pyproject.toml`：

```toml
[build-system]
requires = ["hatchling>=1.25"]
build-backend = "hatchling.build"

[project]
name = "sampleqa"
version = "0.1.0"
description = "A minimal, testable Python CLI project"
readme = "README.md"
requires-python = ">=3.11"
dependencies = []

[project.optional-dependencies]
dev = ["pytest>=8", "ruff>=0.5", "build>=1"]

[project.scripts]
sampleqa = "sampleqa.cli:main"

[tool.hatch.build.targets.wheel]
packages = ["src/sampleqa"]

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.ruff]
line-length = 100
target-version = "py311"
```

关键字段分别解决不同问题：

- `[build-system]` 指定构建后端；这里选择 Hatchling。
- `[project]` 定义包名、版本、Python 版本和正式依赖。
- `[project.optional-dependencies]` 把开发工具与运行时依赖分开。复杂团队也可以使用 dependency groups。
- `[project.scripts]` 把 Python 函数注册为终端命令。
- `[tool.pytest.ini_options]` 和 `[tool.ruff]` 集中管理测试和静态检查配置。

### 为什么不只用 requirements.txt？

`requirements.txt` 仍然适合安装固定依赖或部署环境，但它不是完整的 Python 包元数据文件。若你要发布、以 `pip install -e .` 安装、声明 CLI 入口，`pyproject.toml` 更合适。对于生产交付，还需要视工具链和需求决定是否采用锁文件、版本固定及依赖安全检查；上述 `>=` 范围并不等于可重复构建。

## 4. 编写最小功能：核心逻辑与 CLI 分离

创建 `src/sampleqa/core.py`：

```python
def build_test_case(feature: str) -> dict[str, str]:
    """Convert a feature name into a simple example test case."""
    name = feature.strip()
    if not name:
        raise ValueError("feature must not be empty")
    return {
        "title": f"Verify {name}",
        "expected": f"{name} behaves as specified",
    }
```

创建 `src/sampleqa/cli.py`：

```python
import argparse
import json

from sampleqa.core import build_test_case


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate an example test case")
    parser.add_argument("feature", help="Feature name")
    args = parser.parse_args()
    result = build_test_case(args.feature)
    print(json.dumps(result, ensure_ascii=False, indent=2))
```

安装开发依赖并运行：

```bash
python -m pip install -e ".[dev]"
sampleqa "password reset"
```

预期输出：

```json
{
  "title": "Verify password reset",
  "expected": "password reset behaves as specified"
}
```

这里使用可独立测试的 `build_test_case()` 与轻量 `main()`，避免将解析参数、业务规则、文件读写、远程调用全部塞进一个函数。真正的测试用例生成器还需要把步骤、前置条件、数据、预期结果和需求可追踪关系定义成结构化数据；此处只是工程脚手架演示。

## 5. 使用 pytest 构建测试体系

创建 `tests/test_core.py`：

```python
import pytest

from sampleqa.core import build_test_case


def test_build_test_case():
    result = build_test_case("login")
    assert result["title"] == "Verify login"
    assert "login" in result["expected"]


def test_empty_feature_rejected():
    with pytest.raises(ValueError, match="must not be empty"):
        build_test_case("   ")
```

运行：

```bash
python -m pytest
python -m ruff check .
python -m ruff format --check .
```

测试不仅要覆盖正常输入，还要验证边界与错误行为。项目扩大以后可增加：

- **Unit tests**：模块级规则、数据转换、参数校验。
- **Integration tests**：真实数据库、文件系统或服务适配层。
- **Contract tests**：外部 API、模型网关与输入输出契约。
- **End-to-end tests**：通过 CLI/API 验证完整用户流程。

与 LLM 相关的测试应尽量 mock 网关或使用固定响应；真正的模型效果评测则应单独设计数据集、指标与成本控制，不能只靠单元测试通过来证明输出质量。

## 6. 用 Makefile 统一团队命令

大型仓库常常存在很多命令。`Makefile` 可以充当开发入口（Windows 用户通常需要安装 make，或使用跨平台任务工具）。

```makefile
.PHONY: dev test lint format build

dev:
	python -m pip install -e ".[dev]"

test:
	python -m pytest

lint:
	python -m ruff check .
	python -m ruff format --check .

format:
	python -m ruff format .

build:
	python -m build
```

执行时用：

```bash
make dev
make lint
make test
make build
```

`make build` 生成 `dist/` 中的发行包；它不同于 Docker 镜像，也不意味着已经发布到 PyPI。

## 7. 使用 GitHub Actions 实现 CI

创建 `.github/workflows/ci.yml`：

```yaml
name: Python CI

on:
  push:
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - name: Install
        run: python -m pip install -e ".[dev]"
      - name: Lint
        run: |
          python -m ruff check .
          python -m ruff format --check .
      - name: Test
        run: python -m pytest
      - name: Build
        run: python -m build
```

GitHub Actions 可以在 push / PR 时运行基础检查。生产工程还应评估 action 版本更新或固定提交 SHA、最小权限、依赖缓存、Python 版本矩阵和测试报告保存策略。CI 通过只能表明配置的检查已通过，不保证所有业务场景正确。

## 8. 工程复杂以后，怎样拆分模块？

针对“根据需求生成测试用例”的 Python/AI 应用，可以从通用工程进一步拆分：

```text
src/sampleqa/
├── cli/              # 解析命令与参数
├── core/             # 领域对象、配置、错误类型
├── inputs/           # 文本、Markdown、PDF 等输入适配
├── generators/       # 核心生成流程
├── gateway/          # LLM 服务商适配、超时与重试
├── prompts/          # Prompt 模板及版本
├── store/            # 检索与上下文存储（按需）
├── formatters/       # JSON、CSV、Markdown、JUnit XML
└── utils/            # 日志与通用工具
```

**不需要在第一天把所有文件夹都创建出来。** 最初只用 `core.py` 和 `cli.py` 即可；等出现第二种输入、第二种输出或第二个模型服务商时再抽象。

### 核心概念：Gateway / Adapter

如果业务逻辑直接依赖某个模型 SDK，日后切换模型或模拟失败会比较困难。可以让生成器只依赖一个明确接口：

```text
Requirement → Generator → LLM Gateway → Provider
                    ↓
             Structured Results
                    ↓
            Output Formatter
```

Gateway 负责模型调用、超时、重试、限流及响应适配。Generator 负责测试设计任务。Formatter 负责输出格式。这样设计可减少供应商绑定，也便于 mock 模型响应。

### 核心概念：Prompt Template

把 Prompt 从 Python 逻辑中分离出来，利于维护和对比不同版本。例如用 YAML 存配置、Jinja2 模板管理变量，但必须验证输入参数、模板输出和结构化响应；**Prompt 模板不是替代程序验证的方案**。

### 核心概念：RAG（按需选用）

RAG 是先检索相关知识，再把检索结果提供给模型。用于测试生成时，可检索历史用例、接口规范或项目约束，帮助生成结果贴近已有业务；但要额外考虑内容更新、权限、检索准确率、敏感信息和成本。

```text
Requirement
    ↓
Retrieve relevant documents / past test cases
    ↓
Construct prompt with context
    ↓
Call model
    ↓
Validate structured test cases
    ↓
Review / export / optional indexing
```

不要假设“引入向量数据库就一定提升用例质量”。应有无 RAG 对照评测，并监控重复用例、漏测、幻觉和可执行性。

## 9. 怎么把“生成测试用例”做成真正可用的产品？

从示例脚手架走向实用工具，可以按增量阶段推进：

| 阶段 | 构建内容 | 验收重点 |
| --- | --- | --- |
| 1. 可运行 CLI | 输入需求、生成结构化用例、输出文件 | 稳定运行、输入校验、失败可诊断 |
| 2. 测试工程化 | pytest、Ruff、CI、打包 | 修改后能自动回归 |
| 3. 外部 LLM | 网关、配置、超时、重试 | 供应商切换、失败处理、费用上限 |
| 4. 输出集成 | Markdown/CSV/JSON/JUnit 等 | 数据字段一致、下游可导入 |
| 5. 可选 RAG | 需求文档、知识库、历史用例 | 相关性、隐私边界、增益评测 |
| 6. 质量评测 | 人工审核集、覆盖率代理指标、重复率 | 可量化地比基线更好 |

尤其要注意：**生成测试用例**和**执行测试用例**是两项不同能力。导出 JUnit XML 也不代表生成的测试已被真实执行，不能把“生成了测试报告格式”宣传成“测试已通过”。

## 10. 项目完成时的验收清单

- [ ] 代码安装后可以从任意目录导入和运行 CLI
- [ ] Python 版本、依赖和构建后端明确
- [ ] 密钥不进入仓库；示例配置不含真实凭证
- [ ] 业务模块不依赖命令行参数解析
- [ ] pytest 覆盖正常与异常路径
- [ ] 格式化、静态检查与测试可一键运行
- [ ] GitHub Actions 在提交和 PR 上执行检查
- [ ] README 描述安装、示例命令与常见问题
- [ ] 能构建 wheel / sdist，理解运行与发布的区别
- [ ] 使用外部 LLM 时具备可控超时、重试与输出验证

## 参考资料与适用范围

这篇教程综合提炼了开源项目 [TestLoom](https://github.com/saurabh-oss/testloom) 的工程组织思路，尤其是 `src/` 布局、`pyproject.toml`、开发依赖、CLI、测试、Makefile、GitHub Actions，以及其在测试用例生成中划分 gateway、generator、store、formatter 等模块的方法。文章的 `sampleqa` 代码是独立编写的教学示例，**不是该仓库的官方安装手册**。

参考仓库 README 将 LLM Gateway、RAG、命令行与多种格式输出列为能力，并将多智能体评审及 REST/Web UI 放在后续路线图中；因此不要将路线图功能误写为已经交付。

- [TestLoom GitHub Repository](https://github.com/saurabh-oss/testloom)
- [Python Packaging User Guide](https://packaging.python.org/)
- [pytest Documentation](https://docs.pytest.org/)
- [Ruff Documentation](https://docs.astral.sh/ruff/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

**建议下一篇延伸阅读**：如何用 Python + LLM 将需求文档自动转换为结构化测试用例（从 Gateway、Prompt、Pydantic Schema 到质量评测）。

