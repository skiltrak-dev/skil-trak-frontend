import { UserRoles } from '@constants'
import { withAuth } from 'next-auth/middleware'
import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'

const data: any = getSession()

// async function getUserDetails(token: string) {
//     try {
//         const response = await fetch(
//             `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/me/profile`,
//             {
//                 method: 'GET',
//                 headers: {
//                     authorization: `Bearer ${process.env.token}`,
//                 },
//             }
//         )

//         if (!response.ok) {
//             throw new Error('Failed to fetch user details')
//         }

//         return await response.json()
//     } catch (error) {
//         console.error('Error fetching user details:', error)
//         return null
//     }
// }

export default withAuth(
    async function middleware(req) {
        const user: any = req.nextauth.token
        const path = req.nextUrl.pathname

        // Public routes - accessible to all
        if (path === '/' || path.startsWith('/public')) {
            return NextResponse.next()
        }

        // Check if user is authenticated
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login-auth', req.url))
        }

        // Fetch current user details
        // let userDetailsResponse = null
        // if (data?.data) {
        //     userDetailsResponse = await fetch(
        //         new URL('/api/user-details', req.url)
        //     )
        // }

        // console.log({
        //     userDetailsResponseuserDetailsResponseuserDetailsResponse:
        //         userDetailsResponse,
        // })

        // if (!userDetailsResponse) {
        //     // Handle error - redirect to an error page or default to lowest access
        //     return NextResponse.redirect(new URL('/error', req.url))
        // }

        // const { permissions }: any = userDetailsResponse
        const role = user?.role
        console.log(
            "path.startsWith('/portals/admin')",
            path.startsWith('/portals/admin')
        )

        // Dynamic role and permission based access control
        if (path.startsWith('/portals/admin')) {
            console.log('Path Started!!!!!!')
            if (role === UserRoles.ADMIN) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(
                    new URL('/auth/login-auth', req.url)
                )
            }
            // if (
            //     role === UserRoles.ADMIN ||
            //     (role === UserRoles.SUBADMIN && permissions.canAccessAdmin)
            // ) {
            //     return NextResponse.next()
            // } else {
            //     return NextResponse.redirect(new URL('/unauthorized', req.url))
            // }
        }

        console.log({ role })

        if (path.startsWith('/portals/sub-admin')) {
            if (role === UserRoles.SUBADMIN) {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(
                    new URL('/auth/login-auth', req.url)
                )
            }
        }

        // if (path.startsWith('/student') && role === UserRoles.STUDENT) {
        //     return NextResponse.next()
        // } else if (path.startsWith('/student')) {
        //     return NextResponse.redirect(new URL('/unauthorized', req.url))
        // }

        // If none of the above conditions are met, allow the request
        // return NextResponse.next()
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
