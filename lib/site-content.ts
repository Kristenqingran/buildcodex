export const siteConfig = {
  name: 'BuildCodex',
  origin: 'https://www.buildcodex.net',
  description: 'Practical notes on Codex, AI agents, and building with them.'
} as const;

export const locales = ['en', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];
export const localeLabels: Record<Locale, string> = {en: 'English', 'zh-CN': '中文'};

export const sectionSlugs = ['codex-tools', 'agent-building', 'agent-evaluation', 'field-notes'] as const;
export type SectionSlug = (typeof sectionSlugs)[number];

export const sections: Record<SectionSlug, {label: Record<Locale, string>; description: Record<Locale, string>}> = {
  'codex-tools': {
    label: {en: 'Codex & tools', 'zh-CN': 'Codex 与工具'},
    description: {en: 'Installation notes, configuration, and practical tool use.', 'zh-CN': 'Codex 安装、软件配置和工具使用记录。'}
  },
  'agent-building': {
    label: {en: 'Agent building', 'zh-CN': 'Agent 构建'},
    description: {en: 'Agent projects, workflows, tool connections, and implementation notes.', 'zh-CN': 'Agent 搭建、工作流、工具连接和项目实操。'}
  },
  'agent-evaluation': {
    label: {en: 'Agent evaluation', 'zh-CN': 'Agent 评测'},
    description: {en: 'Test cases, evaluation methods, reliability, and quality questions.', 'zh-CN': '测试用例、评估方法、可靠性和质量问题。'}
  },
  'field-notes': {
    label: {en: 'Field notes', 'zh-CN': '实战观察'},
    description: {en: 'Tool trials, lessons learned, and notes from the field.', 'zh-CN': '工具实测、踩坑记录、学习笔记和资料观察。'}
  }
};

export const copy = {
  en: {
    search: 'Search', language: 'Language', eyebrow: 'Notes from the workbench', title: 'Learn by building with Codex and AI agents.', intro: 'Practical tutorials, workflows, and verified field notes from learning, trying, and building.', browse: 'Browse the library',
    featured: 'Featured notes', latest: 'Latest notes', emptyTitle: 'Articles are coming soon.', emptyBody: 'The content library is ready for the first field notes. No articles have been published yet.', tutorialsTitle: 'All notes', tutorialsIntro: 'A growing library of practical notes and experiments.', searchTitle: 'Search the library', searchPlaceholder: 'Search by title or description', searchEmpty: 'No matching notes yet.'
  },
  'zh-CN': {
    search: '搜索', language: '语言', eyebrow: '工作台笔记', title: '用 Codex 和 AI Agent 边做边学。', intro: '记录实际学习、尝试和验证过的教程、工作流与工具实践。', browse: '浏览内容',
    featured: '精选内容', latest: '最新文章', emptyTitle: '文章即将上线。', emptyBody: '内容承载结构已经准备好，首批实践笔记将在整理后发布。', tutorialsTitle: '全部内容', tutorialsIntro: '持续整理中的实践笔记与工作流记录。', searchTitle: '搜索内容库', searchPlaceholder: '按标题或简介搜索', searchEmpty: '暂时没有匹配的文章。'
  }
} as const;

export function getCopy(locale: Locale) { return copy[locale]; }
