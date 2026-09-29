export const siteConfig = {
  name: 'BuildCodex',
  origin: 'https://www.buildcodex.net',
  description: 'Practical notes on Codex, AI agents, and building with them.'
} as const;

export const locales = ['en', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];
export const localeLabels: Record<Locale, string> = {en: 'English', 'zh-CN': '中文'};

export const copy = {
  en: {
    navTutorials: 'Tutorials', navAbout: 'About', language: 'Language', eyebrow: 'Notes from the workbench',
    title: 'Learn by building with Codex and AI agents.', intro: 'Practical tutorials, workflows, and verified field notes from learning, trying, and building.', browse: 'Browse tutorials',
    emptyTitle: 'Tutorials are coming soon.', emptyBody: 'The library is ready for the first field notes. No articles have been published yet.', tutorialsTitle: 'Tutorials', tutorialsIntro: 'A growing library of practical notes and experiments.'
  },
  'zh-CN': {
    navTutorials: '教程', navAbout: '关于', language: '语言', eyebrow: '工作台笔记',
    title: '用 Codex 和 AI Agent 边做边学。', intro: '记录实际学习、尝试和验证过的教程、工作流与工具实践。', browse: '浏览教程',
    emptyTitle: '教程即将上线。', emptyBody: '内容承载结构已经准备好，首批实践笔记将在整理后发布。', tutorialsTitle: '教程', tutorialsIntro: '持续整理中的实践笔记与工作流记录。'
  }
} as const;

export function getCopy(locale: Locale) { return copy[locale]; }
