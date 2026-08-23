import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {AdsterraNativeBanner} from '@/components/ads/adsterra-native-banner';

const scriptSelector = '#adsterra-native-banner-script-fb64f8a45df041e88f19ca037df3a65a';
const containerSelector = '#container-fb64f8a45df041e88f19ca037df3a65a';

describe('AdsterraNativeBanner', () => {
  it('loads one script per mount and initializes again after a route remount', () => {
    const first = render(<AdsterraNativeBanner />);
    const script = document.querySelector<HTMLScriptElement>(scriptSelector);

    expect(document.querySelectorAll(containerSelector)).toHaveLength(1);
    expect(document.querySelectorAll(scriptSelector)).toHaveLength(1);
    expect(script?.src).toBe(
      'https://pl30983257.profitableratecpmnetwork.com/fb64f8a45df041e88f19ca037df3a65a/invoke.js'
    );
    expect(script).toHaveAttribute('async');
    expect(script).toHaveAttribute('data-cfasync', 'false');

    first.rerender(<AdsterraNativeBanner />);
    expect(document.querySelectorAll(scriptSelector)).toHaveLength(1);

    first.unmount();
    render(<AdsterraNativeBanner />);
    expect(document.querySelectorAll(containerSelector)).toHaveLength(1);
    expect(document.querySelectorAll(scriptSelector)).toHaveLength(1);
  });
});
