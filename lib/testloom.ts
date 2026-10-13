export type GenerationStatus = 'SUCCESS' | 'VALIDATION_FAILED' | 'ERROR';

export type TestStep = {
  step_number: number;
  action: string;
  expected_result: string;
  test_data?: string | null;
};

export type TestCase = {
  id: string;
  title: string;
  description: string;
  preconditions: string[];
  steps: TestStep[];
  expected_outcome: string;
  test_type: string;
  priority: string;
  tags: string[];
  requirement_ids: string[];
  generated_at: string;
  model_used?: string | null;
  confidence_score?: number | null;
  metadata: Record<string, unknown>;
};

export type TestSuite = {
  id: string;
  name: string;
  description: string;
  test_cases: TestCase[];
  source_requirement?: string | null;
  generated_at: string;
  generation_metadata: Record<string, unknown>;
};

export type ValidationIssue = {
  code: string;
  severity: 'ERROR' | 'WARNING';
  message: string;
  location: string;
  test_case_id?: string | null;
};

export type ValidationReport = {valid: boolean; issues: ValidationIssue[]};

export type GenerationResult = {
  run_id: string;
  status: GenerationStatus;
  language: string;
  test_suite?: TestSuite | null;
  validation_report?: ValidationReport | null;
  metadata: Record<string, unknown>;
  error?: string | null;
};

export type GenerationRequest = {requirement: string; language: string};

export function isGenerationResult(value: unknown): value is GenerationResult {
  if (!value || typeof value !== 'object') return false;
  const result = value as Record<string, unknown>;
  return typeof result.run_id === 'string'
    && ['SUCCESS', 'VALIDATION_FAILED', 'ERROR'].includes(String(result.status))
    && typeof result.language === 'string';
}

export function isTestLoomConfigured() {
  return Boolean(process.env.TESTLOOM_API_BASE_URL?.trim() && process.env.TESTLOOM_API_SHARED_SECRET?.trim());
}
