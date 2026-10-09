---
title: 'How to Build a Well-Structured Python Project: Layout, pyproject.toml, Testing, and CI'
description: 'A practical guide to building a maintainable, testable, and packageable Python project with a src layout, pyproject.toml, pytest, Ruff, CLI commands, Makefile, and GitHub Actions.'
category: Engineering guide
slug: python-project-structure-guide
publishedAt: '2026-10-09'
updatedAt: '2026-10-09'
---

If you have written Python scripts but are unsure how to turn them into a tool, test framework, or AI application that can be maintained over time, this guide presents a practical path: **create the layout → configure packaging and dependencies → write modules → add tests → standardize commands → connect continuous integration**.

This article abstracts the organization of an open-source Python AI testing project into a general tutorial. The example project `sampleqa` is a simplified teaching project, not a line-by-line copy of the reference repository. The AI and RAG sections are not claims that the example project ships with those capabilities.

## 1. What makes a Python project well structured?

A single script can solve a one-time problem. A project intended for collaboration or continuous iteration usually also needs to be:

- **Installable**: other environments can install it with standard tools instead of relying on the current working directory.
- **Configurable**: dependencies, entry points, Python versions, and tool rules live in one place.
- **Testable**: business logic is separated from the CLI and external APIs.
- **Maintainable**: modules have clear responsibilities and inputs are separated from outputs.
- **Deliverable**: the project can be packaged and checked automatically by CI.

A useful minimal layout is:

```text
sampleqa/
├── pyproject.toml           # Metadata, dependencies, and tool configuration
├── README.md                # Installation and usage
├── .gitignore               # Virtual environments, caches, and secrets
├── src/
│   └── sampleqa/
│       ├── __init__.py
│       ├── core.py          # Core business logic
│       └── cli.py           # CLI entry point
├── tests/
│   └── test_core.py
└── .github/
    └── workflows/
        └── ci.yml           # GitHub Actions
```

The `src` layout is useful for installable tools and libraries, but small scripts do not need every directory on day one. The goal of engineering structure is to reduce maintenance cost, not to increase the number of folders.

## 2. Initialize the project

The following commands target macOS/Linux with Python 3.11 or newer. On Windows, replace the activation command with `.venv\\Scripts\\activate` or `.venv\\Scripts\\Activate.ps1` in PowerShell.

```bash
mkdir sampleqa
cd sampleqa
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
mkdir -p src/sampleqa tests .github/workflows
touch src/sampleqa/__init__.py README.md
```

Use a `.gitignore` that keeps local environments, caches, build output, and credentials out of Git:

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

An `.env` file often contains credentials. If you provide `.env.example`, keep it free of real secrets.

## 3. Manage the project with pyproject.toml

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

`pyproject.toml` is more than a replacement for `requirements.txt`. A requirements file is still useful for pinned deployment dependencies, but the project metadata, editable installation, build backend, and CLI entry point belong in the packaging configuration.

## 4. Keep core logic separate from the CLI

Create `src/sampleqa/core.py`:

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

Create `src/sampleqa/cli.py`:

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

Install the development package and try it:

```bash
python -m pip install -e ".[dev]"
sampleqa "password reset"
```

Separating `build_test_case()` from `main()` keeps argument parsing, business rules, file access, and remote calls from becoming one untestable function.

## 5. Build a pytest test system

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

Run the checks with:

```bash
python -m pytest
python -m ruff check .
python -m ruff format --check .
```

As the project grows, add unit tests for module rules, integration tests for adapters, contract tests for APIs and model gateways, and end-to-end tests for complete user flows. LLM evaluation should be designed separately with datasets, metrics, cost controls, and fixed or mocked responses where appropriate.

## 6. Standardize team commands with Makefile

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

This turns project commands into a small, discoverable team interface: `make dev`, `make lint`, `make test`, and `make build`.

## 7. Add GitHub Actions

```yaml
name: CI

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

CI proves only that the configured checks passed. Production projects should also review action updates, permissions, dependency caching, Python version matrices, and test-report retention.

## 8. Split modules as the project grows

For a Python/AI application that generates test cases from requirements, a later structure might look like:

```text
src/sampleqa/
├── cli/              # Commands and argument parsing
├── core/             # Domain objects, configuration, errors
├── inputs/           # Text, Markdown, and PDF adapters
├── generators/       # Generation workflow
├── gateway/          # LLM providers, timeouts, retries
├── prompts/          # Versioned prompt templates
├── store/            # Retrieval and context storage, when needed
├── formatters/       # JSON, CSV, Markdown, and JUnit XML
└── utils/            # Logging and shared helpers
```

Do not create every folder on the first day. Add an abstraction when a second input, output, or model provider makes it useful.

The gateway should isolate provider-specific SDKs, timeouts, retries, rate limits, and response adaptation:

```text
Requirement → Generator → LLM Gateway → Provider
                    ↓
             Structured Results
                    ↓
            Output Formatter
```

RAG can retrieve historical cases, API rules, or project constraints before generation, but it does not automatically improve quality. Compare with and without retrieval, and monitor duplication, omissions, hallucinations, executability, privacy, and cost.

## 9. Turn generation into a usable product

An incremental roadmap is:

| Stage | Build | Acceptance focus |
| --- | --- | --- |
| 1. Runnable CLI | Read requirements and output structured cases | Stable execution and diagnosable failures |
| 2. Test engineering | pytest, Ruff, CI, packaging | Automatic regression after changes |
| 3. External LLM | Gateway, configuration, timeout, retry | Provider switching and cost limits |
| 4. Output integration | Markdown, CSV, JSON, JUnit | Stable fields and downstream import |
| 5. Optional RAG | Requirements, knowledge base, history | Relevance, privacy, measured gain |
| 6. Quality evaluation | Review set and coverage proxies | Measurable improvement over a baseline |

Generating test cases and executing test cases are different capabilities. Exporting JUnit XML does not prove that generated tests were executed or passed.

## 10. Completion checklist

- [ ] The package can be installed and imported from any working directory.
- [ ] Python version, dependencies, and build backend are explicit.
- [ ] Secrets never enter the repository.
- [ ] Business modules do not depend on CLI parsing.
- [ ] pytest covers normal and error paths.
- [ ] Formatting, static checks, and tests have one-command entry points.
- [ ] GitHub Actions runs on pushes and pull requests.
- [ ] README documents installation, examples, and common problems.
- [ ] The project can build a wheel or source distribution.
- [ ] External LLM use has controlled timeouts, retries, and output validation.

## References and scope

This tutorial distills engineering organization ideas from the open-source [TestLoom repository](https://github.com/saurabh-oss/testloom), especially its `src/` layout, `pyproject.toml`, development dependencies, CLI, testing, Makefile, GitHub Actions, and separation of gateway, generator, store, and formatter concerns. The `sampleqa` code here is an independently written teaching example, not the repository's official installation manual.

- [TestLoom GitHub Repository](https://github.com/saurabh-oss/testloom)
- [Python Packaging User Guide](https://packaging.python.org/)
- [pytest Documentation](https://docs.pytest.org/)
- [Ruff Documentation](https://docs.astral.sh/ruff/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
