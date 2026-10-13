import {describe, expect, it} from 'vitest';
import {generationLanguages, workbenchNavigation, workbenchCopy} from '@/lib/workbench';
import {isGenerationResult} from '@/lib/testloom';

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
    expect(workbenchCopy['zh-CN'].steps).toEqual(['测试场景分析', '生成测试用例', '用例规范检查']);
    expect(workbenchCopy.en.steps).toEqual(['Test Scenario Analysis', 'Test Case Generation', 'Specification Check']);
  });

  it('provides matching requirement-file upload support in English and Chinese', () => {
    expect(workbenchCopy.en.uploadRequirement).toContain('.md');
    expect(workbenchCopy.en.uploadRequirement).toContain('.txt');
    expect(workbenchCopy['zh-CN'].uploadRequirement).toContain('.md');
    expect(workbenchCopy['zh-CN'].uploadRequirement).toContain('.txt');
    expect(workbenchCopy.en.uploadRequirement).toContain('.docx');
    expect(workbenchCopy.en.uploadRequirement).toContain('PDF');
    expect(workbenchCopy['zh-CN'].uploadRequirement).toContain('.docx');
    expect(workbenchCopy['zh-CN'].uploadRequirement).toContain('PDF');
    expect(workbenchCopy.en.replaceFileConfirm).toBeTruthy();
    expect(workbenchCopy['zh-CN'].replaceFileConfirm).toBeTruthy();
  });

  it('accepts only the documented GenerationResult status shape', () => {
    expect(isGenerationResult({run_id: 'generation-1', status: 'SUCCESS', language: 'zh-CN'})).toBe(true);
    expect(isGenerationResult({run_id: 'generation-1', status: 'PENDING', language: 'zh-CN'})).toBe(false);
    expect(isGenerationResult({status: 'SUCCESS', language: 'zh-CN'})).toBe(false);
  });
});
