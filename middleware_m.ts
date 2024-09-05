import { UserRoles } from '@constants'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

async function getUserDetails(userId: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user-details?userId=${userId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
                },
            }
        )

        if (!response.ok) {
            throw new Error('Failed to fetch user details')
        }

        return await response.json()
    } catch (error) {
        console.error('Error fetching user details:', error)
        return null
    }
}

export default withAuth(
    async function middleware(req) {
        const token: any = req.nextauth.token
        const path = req.nextUrl.pathname

        // Public routes - accessible to all
        if (path === '/' || path.startsWith('/public')) {
            return NextResponse.next()
        }

        // Check if user is authenticated
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }

        // Fetch current user details
        const userDetails = await getUserDetails(token.userId)

        if (!userDetails) {
            // Handle error - redirect to an error page or default to lowest access
            return NextResponse.redirect(new URL('/error', req.url))
        }

        const { role, permissions } = userDetails

        // Dynamic role and permission based access control
        if (path.startsWith('/admin')) {
            if (
                role === UserRoles.ADMIN ||
                (role === UserRoles.SUBADMIN && permissions.canAccessAdmin)
            ) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL('/unauthorized', req.url))
            }
        }

        if (path.startsWith('/subadmin')) {
            if (role === UserRoles.SUBADMIN && !permissions.canAccessAdmin) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL('/unauthorized', req.url))
            }
        }

        if (path.startsWith('/student') && role === UserRoles.STUDENT) {
            return NextResponse.next()
        } else if (path.startsWith('/student')) {
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }

        // If none of the above conditions are met, allow the request
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

// Specify which routes this middleware should run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
