export const MAX_REQUIREMENT_FILE_BYTES = 2 * 1024 * 1024;
export const MAX_REQUIREMENT_CHARACTERS = 10_000;

export type RequirementFileIssue = 'unsupported' | 'too-large' | 'too-many-characters' | 'no-text';

export function getRequirementFileIssue(fileName: string, fileSize: number, text: string): RequirementFileIssue | null {
  if (!/\.(md|txt|docx|pdf)$/i.test(fileName)) return 'unsupported';
  if (fileSize > MAX_REQUIREMENT_FILE_BYTES) return 'too-large';
  if (Array.from(text).length > MAX_REQUIREMENT_CHARACTERS) return 'too-many-characters';
  if (!text.trim()) return 'no-text';
  return null;
}
