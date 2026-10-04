import Script from 'next/script';

export const adsterraScriptSrc = 'https://pl30983257.profitableratecpmnetwork.com/fb64f8a45df041e88f19ca037df3a65a/invoke.js';
export const adsterraContainerId = 'container-fb64f8a45df041e88f19ca037df3a65a';

export function AdsterraArticleAd() {
  return (
    <aside className="article-ad" aria-label="Advertisement">
      <Script async id="adsterra-native-banner" src={adsterraScriptSrc} strategy="afterInteractive" data-cfasync="false" />
      <div id={adsterraContainerId} />
    </aside>
  );
}
