import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.NEXT_PUBLIC_JWT_SECRET

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret })
  if (request.nextUrl.pathname.startsWith('/mypage')) {
    if (token === null) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/edit')) {
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/write')) {
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}
