import type {MDXComponents} from 'mdx/types';
import {AdsterraNativeBanner} from '@/components/ads/adsterra-native-banner';

export const mdxComponents: MDXComponents = {
  AdsterraNativeBanner,
  table: (props) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
  blockquote: (props) => <blockquote className="source-note" {...props} />
};
