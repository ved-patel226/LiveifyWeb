import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.mdx`,
  `${docsContentRoute}{/*path}/content.md`
);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/docs', request.nextUrl));
  }

  const resultSuffix = rewriteSuffix(request.nextUrl.pathname);
  if (resultSuffix) {
    return NextResponse.rewrite(new URL(resultSuffix, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const resultDocs = rewriteDocs(request.nextUrl.pathname);
    if (resultDocs) {
      return NextResponse.rewrite(new URL(resultDocs, request.nextUrl));
    }
  }

  return NextResponse.next();
}