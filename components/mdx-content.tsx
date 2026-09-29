import type {ReactNode} from 'react';
import {compileMDX} from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

function headingId(children: ReactNode) { return String(children).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, ''); }
export async function MdxContent({source}: {source: string}) { const result = await compileMDX({source, components: {h2: ({children, ...props}) => <h2 id={headingId(children)} {...props}>{children}</h2>, h3: ({children, ...props}) => <h3 id={headingId(children)} {...props}>{children}</h3>}, options: {parseFrontmatter: false, mdxOptions: {remarkPlugins: [remarkGfm]}}}); return <div className="prose">{result.content}</div>; }
