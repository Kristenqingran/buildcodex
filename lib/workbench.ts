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
    status: 'Backend integration pending', connectedStatus: 'Generation API connected', pending: 'Backend integration pending — generation will be enabled after the backend contract is connected.', generationDescription: 'Turn a requirement into structured test cases, then check their structure against the P1 rules.',
    generate: 'Generate test cases', requirement: 'Requirement Markdown', language: 'Output language', placeholder: '# Requirement\n\nDescribe the behavior, rules, and risk areas to cover.',
    uploadRequirement: 'Choose a .md, .txt, .docx, or text-based PDF file', fileName: 'Selected file', replaceFileConfirm: 'Replace the current requirement text with this file?', fileUnsupported: 'Choose a .md, .txt, .docx, or text-based PDF file. Legacy .doc files are not supported.', fileTooLarge: 'The file is too large. Maximum size is 2 MB.', fileTooManyCharacters: 'The file has more than 10,000 characters. Shorten it and try again.', fileReadFailed: 'Could not read text from this file. Scanned PDFs without selectable text are not supported.', fileNoText: 'No readable text was found in this file.',
    pipeline: 'Generation pipeline', steps: ['Test Scenario Analysis', 'Test Case Generation', 'Specification Check'],
    emptyCases: 'No test cases yet.', emptyCasesBody: 'Generated suites will appear here after the backend is connected.',
    emptyRuns: 'No runs yet.', emptyRunsBody: 'Execution history will appear here when a test suite can be run.',
    agent: 'Default QA Agent', agentBody: 'Ready for backend connection', navTitle: 'Workbench', homeCta: 'Open QA Workbench'
  },
  'zh-CN': {
    eyebrow: '', title: 'QA Workbench', generationTitle: '测试用例生成', intro: '一个把需求整理成可审阅测试资产的聚焦工作空间。',
    overview: 'V1 只提供规划、审阅以及未来运行测试用例所需的最小界面。',
    status: '后端接入待完成', connectedStatus: '生成接口已连接', pending: '后端接入待完成——连接后端契约后才会启用生成能力。', generationDescription: '输入需求并生成结构化测试用例，再按 P1 规则检查用例规范。',
    generate: '生成测试用例', requirement: '需求 Markdown', language: '输出语言', placeholder: '# 需求\n\n描述需要覆盖的行为、规则和风险区域。',
    uploadRequirement: '选择 .md、.txt、.docx 或文字型 PDF 文件', fileName: '已选择文件', replaceFileConfirm: '用这个文件替换当前需求文本吗？', fileUnsupported: '请选择 .md、.txt、.docx 或文字型 PDF 文件；暂不支持旧版 .doc。', fileTooLarge: '文件过大，最大支持 2 MB。', fileTooManyCharacters: '文件内容超过 10,000 个字符，请缩短后重试。', fileReadFailed: '无法从文件中读取文本。暂不支持没有可选文字的扫描版 PDF。', fileNoText: '文件中没有找到可读取的文字。',
    pipeline: '生成流程', steps: ['测试场景分析', '生成测试用例', '用例规范检查'],
    emptyCases: '还没有测试用例。', emptyCasesBody: '后端接入后，生成的测试套件会显示在这里。',
    emptyRuns: '还没有运行记录。', emptyRunsBody: '测试套件可以运行后，执行历史会显示在这里。',
    agent: '默认 QA Agent', agentBody: '等待后端接入', navTitle: '工作台', homeCta: '打开 QA 工作台'
  }
} as const;

export function getWorkbenchCopy(locale: Locale) { return workbenchCopy[locale]; }
