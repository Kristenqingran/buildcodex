import type {MDXComponents} from 'mdx/types';

export const mdxComponents: MDXComponents = {
  table: (props) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
  blockquote: (props) => <blockquote className="source-note" {...props} />
};
