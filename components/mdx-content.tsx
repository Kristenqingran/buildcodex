import {MDXRemote} from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import {mdxComponents} from './mdx-components';

export function MdxContent({source}: {source: string}) {
  return <MDXRemote source={source} components={mdxComponents} options={{mdxOptions: {remarkPlugins: [remarkGfm]}}} />;
}
