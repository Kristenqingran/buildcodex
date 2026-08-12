import type {Locale} from '@/i18n/routing';

export const pageContent = {
  en: {
    hero: {eyebrow: 'A BELLRING GAMES EXTRACTION ARPG', title: 'Survive the Mist.\nReturn with Glory.', description: 'Builds, classes, weapons and field-tested guidance for every Gyldhunter entering the mist.', primary: 'Choose a class', secondary: 'Read beginner guide'},
    stats: [{value: '6', label: 'Classes'}, {value: '2', label: 'Weapon stances'}, {value: '1–3', label: 'Squad size'}, {value: 'PvPvE', label: 'Extraction combat'}],
    overview: {eyebrow: 'THE GYLDENMIST', title: 'What is Mistfall Hunter?', body: 'A third-person dark-fantasy extraction ARPG where every expedition is a wager. Fight creatures and rival hunters, gather Gyldenblood and relics, then reach a Returner Woodling before defeat strips away the haul.'},
    facts: [{label: 'Developer', value: 'Bellring Games'}, {label: 'Publisher', value: 'Skystone Games'}, {label: 'Genre', value: 'PvPvE Extraction ARPG'}, {label: 'Platform', value: 'PC · Steam'}, {label: 'Release', value: 'July 29, 2026'}, {label: 'Party', value: 'Solo or 3-player squad'}],
    sections: {classes: ['CHOOSE YOUR PATH', 'Six distinct classes'], guides: ['FIELD MANUAL', 'Start Your Journey'], builds: ['BUILDCODEX PICKS', 'Builds & Recommendations'], featured: ['DEEP DIVE', 'Featured Guides'], faq: ['QUICK ANSWERS', 'Mistfall Hunter FAQ']},
    classNames: [['Mercenary','Frontline · All-rounder'],['Sorcerer','Range · Control'],['Blackarrow','Precision · Pressure'],['Shadowstrix','Mobility · Assassin'],['Seer','Support · Hybrid'],['Withered Knight','Heavy · Defender']],
    cards: {explore: 'Explore', open: 'Open guide'},
    faq: [{question: 'What kind of game is Mistfall Hunter?', answer: 'It is a third-person dark-fantasy PvPvE extraction ARPG built around high-risk loot runs and action combat.'},{question: 'Can I play solo?', answer: 'Yes. Steam describes both lone-wolf play and three-player squads.'},{question: 'How many classes are there?', answer: 'The launch roster contains six distinct classes, each built around two weapon stances.'},{question: 'Is the tier list official?', answer: 'No. BuildCodex rankings are dated editorial guidance informed by testing and public community discussion.'}],
    cta: {eyebrow: 'READY TO ENTER?', title: 'Choose your hunter. Learn the fight.', primary: 'Compare classes', secondary: 'View on Steam'}
  },
  'zh-CN': {
    hero: {eyebrow: 'BELLRING GAMES 撤离动作 RPG', title: '穿过迷雾，\n带着荣耀归来。', description: '为每一位进入金雾的猎人提供配装、职业、武器与实战攻略。', primary: '选择职业', secondary: '阅读新手攻略'},
    stats: [{value: '6', label: '职业'}, {value: '2', label: '武器姿态'}, {value: '1–3', label: '小队人数'}, {value: 'PvPvE', label: '撤离战斗'}],
    overview: {eyebrow: '金雾世界', title: 'Mistfall Hunter 是什么？', body: '一款第三人称暗黑幻想撤离动作 RPG。每次远征都是一场赌局：对抗怪物和其他猎人，收集金血与遗物，并在失败夺走战利品前抵达返程木灵。'},
    facts: [{label: '开发商', value: 'Bellring Games'}, {label: '发行商', value: 'Skystone Games'}, {label: '类型', value: 'PvPvE 撤离动作 RPG'}, {label: '平台', value: 'PC · Steam'}, {label: '发行日期', value: '2026 年 7 月 29 日'}, {label: '队伍', value: '单人或三人小队'}],
    sections: {classes: ['选择你的道路', '六大特色职业'], guides: ['猎人手册', '开始你的旅程'], builds: ['BUILDCODEX 推荐', '配装与选择建议'], featured: ['深入研究', '精选攻略'], faq: ['快速解答', 'Mistfall Hunter 常见问题']},
    classNames: [['佣兵','前排 · 均衡'],['术士','远程 · 控制'],['黑箭','精准 · 压制'],['影刃','机动 · 刺客'],['先知','辅助 · 混合'],['凋零骑士','重装 · 防守']],
    cards: {explore: '查看', open: '打开攻略'},
    faq: [{question: 'Mistfall Hunter 是什么类型的游戏？', answer: '第三人称暗黑幻想 PvPvE 撤离动作 RPG，以高风险搜刮与动作战斗为核心。'},{question: '可以单人玩吗？', answer: '可以。Steam 官方同时介绍了单人行动和三人小队玩法。'},{question: '一共有多少职业？', answer: '首发阵容包含六个特色职业，每个职业围绕两套武器姿态构建。'},{question: '职业评级是官方结论吗？', answer: '不是。BuildCodex 评级是带日期的编辑建议，参考实测与公开社区讨论。'}],
    cta: {eyebrow: '准备进入迷雾？', title: '选择猎人，掌握战斗。', primary: '比较职业', secondary: '前往 Steam'}
  }
} as const satisfies Record<Locale, object>;
