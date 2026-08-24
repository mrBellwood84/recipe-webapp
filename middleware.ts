// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/(user)/:path*',
    '/admin/:path*',
  ],
}

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const userRole = getUserRoleFromToken(token)

    if (userRole !== 'Admin') {
      return new NextResponse('Ikke tilgang (403 Forbidden)', { status: 403 })
      // return NextResponse.redirect(new URL('/403', request.url))
    }
  }

  NextResponse.next()

}

// Hjelpefunksjon (kun et eksempel, du må dekode din faktiske JWT)
const getUserRoleFromToken = (token: string): string | undefined  => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = Buffer.from(base64, 'base64').toString()
    return JSON.parse(jsonPayload).role // antar at rollen ligger i 'role'
  } catch {
    return undefined
  }
}
