import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const secret = process.env.NEXT_PUBLIC_JWT_SECRET

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret })

  if (request.nextUrl.pathname.startsWith('/mypage')) {
    if (token === null) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/blog/edit')) {
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/blog', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/blog/write')) {
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/blog', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/hot-place/create')) {
    if (token === null) {
      return NextResponse.redirect(new URL('/hot-place', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/hot-place/edit')) {
    if (token === null) {
      return NextResponse.redirect(new URL('/hot-place', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/hot-place/delete')) {
    if (token === null) {
      return NextResponse.redirect(new URL('/hot-place', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/book/write')) {
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/book', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/book/edit')) {
    if (token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/book', request.url))
    }
  }
}
