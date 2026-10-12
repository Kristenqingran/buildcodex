import type {Locale} from './site-content';

export const workbenchNavigation = [
  {href: '/workbench/', label: {en: 'Overview', 'zh-CN': '概览'}},
  {href: '/workbench/test-case-generation/', label: {en: 'Test Case Generation', 'zh-CN': '测试用例生成'}},
  {href: '/workbench/test-cases/', label: {en: 'Test Cases', 'zh-CN': '测试用例'}},
  {href: '/workbench/runs/', label: {en: 'Run History', 'zh-CN': '运行历史'}}
] as const;

export const generationLanguages = [
  {value: 'zh-CN', label: '简体中文'},
  {value: 'en', label: 'English'}
] as const;

export const workbenchCopy = {
  en: {
    eyebrow: '', title: 'QA Workbench', generationTitle: 'Test Case Generation', intro: 'A focused workspace for turning requirements into reviewable test assets.',
    overview: 'A deliberately small V1 surface for planning, reviewing, and eventually running generated test cases.',
    status: 'Backend integration pending', pending: 'Backend integration pending — generation will be enabled after the backend contract is connected.',
    generate: 'Generate test cases', requirement: 'Requirement Markdown', language: 'Output language', placeholder: '# Requirement\n\nDescribe the behavior, rules, and risk areas to cover.',
    pipeline: 'Generation pipeline', steps: ['Scenario Planning', 'Batch Generation', 'P1 Validation'],
    emptyCases: 'No test cases yet.', emptyCasesBody: 'Generated suites will appear here after the backend is connected.',
    emptyRuns: 'No runs yet.', emptyRunsBody: 'Execution history will appear here when a test suite can be run.',
    agent: 'Default QA Agent', agentBody: 'Ready for backend connection', navTitle: 'Workbench', homeCta: 'Open QA Workbench'
  },
  'zh-CN': {
    eyebrow: '', title: 'QA Workbench', generationTitle: '测试用例生成', intro: '一个把需求整理成可审阅测试资产的聚焦工作空间。',
    overview: 'V1 只提供规划、审阅以及未来运行测试用例所需的最小界面。',
    status: '后端接入待完成', pending: '后端接入待完成——连接后端契约后才会启用生成能力。',
    generate: '生成测试用例', requirement: '需求 Markdown', language: '输出语言', placeholder: '# 需求\n\n描述需要覆盖的行为、规则和风险区域。',
    pipeline: '生成流程', steps: ['场景规划', '批量生成', 'P1 校验'],
    emptyCases: '还没有测试用例。', emptyCasesBody: '后端接入后，生成的测试套件会显示在这里。',
    emptyRuns: '还没有运行记录。', emptyRunsBody: '测试套件可以运行后，执行历史会显示在这里。',
    agent: '默认 QA Agent', agentBody: '等待后端接入', navTitle: '工作台', homeCta: '打开 QA 工作台'
  }
} as const;

export function getWorkbenchCopy(locale: Locale) { return workbenchCopy[locale]; }
