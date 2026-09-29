import {compileMDX} from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

export async function MdxContent({source}: {source: string}) { const result = await compileMDX({source, options: {parseFrontmatter: false, mdxOptions: {remarkPlugins: [remarkGfm]}}}); return <div className="prose">{result.content}</div>; }
