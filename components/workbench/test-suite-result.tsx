'use client';

import {useState} from 'react';
import type {GenerationResult, TestCase} from '@/lib/testloom';

function download(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], {type}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
}

function markdown(result: GenerationResult) {
  const suite = result.test_suite;
  if (!suite) return '';
  return [`# ${suite.name}`, '', suite.description, '', ...suite.test_cases.flatMap((testCase) => [
    `## ${testCase.id} · ${testCase.title}`, '', testCase.description, '', `- Priority: ${testCase.priority}`, `- Type: ${testCase.test_type}`, '', '### Preconditions', ...testCase.preconditions.map((item) => `- ${item}`), '', '### Steps', ...testCase.steps.map((step) => `${step.step_number}. ${step.action}\n   - Expected: ${step.expected_result}`), '', `**Expected outcome:** ${testCase.expected_outcome}`, '',
  ])].join('\n');
}

function TestCaseCard({testCase}: {testCase: TestCase}) {
  const [open, setOpen] = useState(false);
  return <article className="workbench-test-case"><button type="button" onClick={() => setOpen(!open)} aria-expanded={open}><span><b>{testCase.id}</b> {testCase.title}</span><span>{testCase.priority} {open ? '−' : '+'}</span></button>{open && <div className="workbench-test-case-detail"><p>{testCase.description}</p><h4>Preconditions</h4><ul>{testCase.preconditions.map((item) => <li key={item}>{item}</li>)}</ul><h4>Steps</h4><ol>{testCase.steps.map((step) => <li key={step.step_number}><b>{step.action}</b><br />{step.expected_result}{step.test_data ? <small> · {step.test_data}</small> : null}</li>)}</ol><h4>Expected outcome</h4><p>{testCase.expected_outcome}</p></div>}</article>;
}

export function TestSuiteResult({result, locale}: {result: GenerationResult; locale: 'en' | 'zh-CN'}) {
  const suite = result.test_suite;
  if (!suite) return null;
  const validation = result.validation_report;
  const labels = locale === 'zh-CN' ? {result: '生成结果', valid: '规范检查通过', invalid: '规范检查未通过', json: '导出 JSON', md: '导出 Markdown'} : {result: 'Generated result', valid: 'Specification check passed', invalid: 'Specification check failed', json: 'Export JSON', md: 'Export Markdown'};
  return <section className="workbench-suite" aria-labelledby="test-suite-title"><div className="workbench-suite-heading"><div><span className="card-kicker">{labels.result}</span><h2 id="test-suite-title">{suite.name}</h2><p>{suite.description}</p></div><div className={validation?.valid ? 'validation-ok' : 'validation-failed'}>{validation?.valid ? labels.valid : labels.invalid}</div></div><div className="workbench-suite-actions"><button type="button" onClick={() => download(`${suite.id}.json`, JSON.stringify(result, null, 2), 'application/json')}>{labels.json}</button><button type="button" onClick={() => download(`${suite.id}.md`, markdown(result), 'text/markdown')}>{labels.md}</button></div>{suite.test_cases.map((testCase) => <TestCaseCard key={testCase.id} testCase={testCase} />)}{validation && !validation.valid && <ul className="workbench-validation-issues">{validation.issues.map((issue) => <li key={`${issue.code}-${issue.location}`}>{issue.code}: {issue.message}</li>)}</ul>}</section>;
}
