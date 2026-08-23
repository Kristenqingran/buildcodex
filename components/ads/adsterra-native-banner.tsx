'use client';

import {useEffect, useRef} from 'react';

const SCRIPT_ID = 'adsterra-native-banner-script-fb64f8a45df041e88f19ca037df3a65a';
const SCRIPT_SRC = 'https://pl30983257.profitableratecpmnetwork.com/fb64f8a45df041e88f19ca037df3a65a/invoke.js';
const CONTAINER_ID = 'container-fb64f8a45df041e88f19ca037df3a65a';

export function AdsterraNativeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (
      !container ||
      document.getElementById(SCRIPT_ID) ||
      container.dataset.adsterraInitialized === 'true'
    ) {
      return;
    }

    container.dataset.adsterraInitialized = 'true';

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.setAttribute('async', '');
    script.setAttribute('data-cfasync', 'false');
    const handleError = () => {
      container.removeAttribute('data-adsterra-initialized');
      script.remove();
    };
    script.addEventListener('error', handleError, {once: true});

    container.before(script);

    return () => {
      script.removeEventListener('error', handleError);
      script.remove();
      container.removeAttribute('data-adsterra-initialized');
    };
  }, []);

  return (
    <div data-advertisement="native-banner">
      <div id={CONTAINER_ID} ref={containerRef} />
    </div>
  );
}
