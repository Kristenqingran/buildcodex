import {describe, expect, it} from 'vitest';
import {generationLanguages, workbenchNavigation, workbenchCopy} from '@/lib/workbench';

describe('QA Workbench configuration', () => {
  it('exposes the four V1 workbench destinations in both locales', () => {
    expect(workbenchNavigation).toHaveLength(4);
    expect(workbenchNavigation.map((item) => item.href)).toEqual([
      '/workbench/',
      '/workbench/test-case-generation/',
      '/workbench/test-cases/',
      '/workbench/runs/'
    ]);
    expect(workbenchNavigation.every((item) => item.label.en && item.label['zh-CN'])).toBe(true);
  });

  it('keeps generation language options and pending backend copy explicit', () => {
    expect(generationLanguages).toContainEqual({value: 'zh-CN', label: '简体中文'});
    expect(workbenchCopy.en.pending).toContain('Backend integration pending');
    expect(workbenchCopy['zh-CN'].pending).toContain('后端接入待完成');
  });
});
