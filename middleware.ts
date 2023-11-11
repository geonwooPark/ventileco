import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.NEXT_PUBLIC_JWT_SECRET

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret })
  if (token === null) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/write')) {
    if (token.email !== 'white0581@naver.com') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/edit/:path*', '/mypage', '/write'],
}
