import {describe, expect, it} from 'vitest';
import {adsterraContainerId, adsterraScriptSrc} from '@/components/adsterra-ad';

describe('Adsterra Native Banner', () => {
  it('uses the active script and container', () => {
    expect(adsterraScriptSrc).toBe('https://pl30983257.profitableratecpmnetwork.com/fb64f8a45df041e88f19ca037df3a65a/invoke.js');
    expect(adsterraContainerId).toBe('container-fb64f8a45df041e88f19ca037df3a65a');
  });
});
