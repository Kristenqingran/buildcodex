import type {MDXComponents} from 'mdx/types';
import {AdsterraNativeBanner} from '@/components/ads/adsterra-native-banner';
import {YouTubeEmbed} from '@/components/youtube-embed';
import {ClassSection} from '@/components/class-section';

function headingId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '');
}

export const mdxComponents: MDXComponents = {
  AdsterraNativeBanner,
  YouTubeEmbed,
  ClassSection,
  h2: ({children, ...props}) => <h2 id={headingId(String(children))} {...props}>{children}</h2>,
  table: (props) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
  blockquote: (props) => <blockquote className="source-note" {...props} />
};
