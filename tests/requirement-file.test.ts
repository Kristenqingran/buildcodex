import {describe, expect, it} from 'vitest';
import {getRequirementFileIssue, MAX_REQUIREMENT_FILE_BYTES, MAX_REQUIREMENT_CHARACTERS} from '@/lib/requirement-file';

describe('requirement file validation', () => {
  it('accepts Markdown and plain text within the character limit', () => {
    expect(getRequirementFileIssue('spec.md', 12, '# Requirement')).toBeNull();
    expect(getRequirementFileIssue('notes.TXT', 12, 'Requirement')).toBeNull();
  });

  it('rejects unsupported file types and files over the size limit', () => {
    expect(getRequirementFileIssue('spec.pdf', 12, 'text')).toBeNull();
    expect(getRequirementFileIssue('spec.docx', 12, 'text')).toBeNull();
    expect(getRequirementFileIssue('spec.pdf', 12, 'text')).toBeNull();
    expect(getRequirementFileIssue('legacy.doc', 12, 'text')).toBe('unsupported');
    expect(getRequirementFileIssue('spec.md', MAX_REQUIREMENT_FILE_BYTES + 1, 'text')).toBe('too-large');
  });

  it('rejects text over the backend character limit without truncating it', () => {
    expect(getRequirementFileIssue('spec.md', 12, 'a'.repeat(MAX_REQUIREMENT_CHARACTERS + 1))).toBe('too-many-characters');
    expect(getRequirementFileIssue('spec.md', 12, '😀'.repeat(MAX_REQUIREMENT_CHARACTERS))).toBeNull();
  });

  it('reports documents that do not contain extractable text', () => {
    expect(getRequirementFileIssue('scanned.pdf', 12, '  ')).toBe('no-text');
  });
});
