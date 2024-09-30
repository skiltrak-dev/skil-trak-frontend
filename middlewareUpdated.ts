import { EventEmitter } from 'events'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

// Create a global event emitter
const globalEmitter = new EventEmitter()
// Define the roles
export enum UserRoles {
    ADMIN = 'admin',
    RTO = 'rto',
    STUDENT = 'student',
    INDUSTRY = 'industry',
    SUBADMIN = 'subadmin',
    MANAGER = 'manager',
    MARKETING = 'marketing',
}

// Define protected routes and their required roles
const protectedRoutes: Record<string, UserRoles[]> = {
    '/portals/admin': [UserRoles.ADMIN],
    '/portals/rto': [UserRoles.RTO],
    '/portals/student': [UserRoles.STUDENT],
    '/portals/industry': [UserRoles.INDUSTRY],
    '/portals/sub-admin': [UserRoles.SUBADMIN],
    '/portals/manager': [UserRoles.MANAGER],
    '/portals/marketing': [UserRoles.MARKETING],
}

let cachedSubadminStatus: {
    [key: string]: { isAdmin: boolean; lastChecked: number }
} = {}

async function checkSubadminStatus(token: string): Promise<boolean> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/me/profile`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                cache: 'no-store',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to fetch subadmin status')
        }
        const data = await response.json()
        return data?.isAdmin || false
    } catch (error) {
        console.error('Error checking subadmin status:', error)
        return false
    }
}

// Function to get subadmin status with caching
async function getSubadminStatus(token: string): Promise<boolean> {
    const now = Date.now()
    const cacheEntry = cachedSubadminStatus[token]

    // If cached status is less than 1 minute old, return it
    if (cacheEntry && now - cacheEntry.lastChecked < 100) {
        return cacheEntry.isAdmin
    }

    // Otherwise, fetch new status
    const isAdmin = await checkSubadminStatus(token)
    cachedSubadminStatus[token] = { isAdmin, lastChecked: now }
    return isAdmin
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })
    const userRole: UserRoles = user?.role as UserRoles

    // Check if the path starts with '/portals/'
    if (path.startsWith('/portals/')) {
        console.log({ user })
        if (!user) {
            console.log('leeran da bujja')
            return NextResponse.redirect(
                new URL('/auth/login-auth', request.url)
            )
        }

        let isSubadminAdmin = false

        if (userRole === UserRoles.SUBADMIN) {
            isSubadminAdmin = await getSubadminStatus(
                user?.accessToken as string
            )
        }

        console.log({ isSubadminAdmin })

        const matchingRoute = Object.keys(protectedRoutes).find((route) =>
            path.startsWith(route)
        )

        if (matchingRoute) {
            if (userRole === UserRoles.SUBADMIN) {
                if (isSubadminAdmin) {
                    // Subadmin with admin privileges can access admin routes
                    if (matchingRoute.startsWith('/portals/admin')) {
                        return NextResponse.next()
                    } else if (matchingRoute.startsWith('/portals/sub-admin')) {
                        return NextResponse.redirect(
                            new URL('/portals/admin', request.url)
                        )
                    }
                } else {
                    // Regular subadmin can only access subadmin routes
                    if (!matchingRoute.startsWith('/portals/sub-admin')) {
                        return NextResponse.redirect(
                            new URL('/portals/sub-admin', request.url)
                        )
                    }
                }
            } else {
                // For other roles, check if the user's role is allowed for this route
                if (!protectedRoutes[matchingRoute].includes(userRole)) {
                    return NextResponse.redirect(
                        new URL('/auth/login-auth', request.url)
                    )
                }
            }
        } else {
            // If no matching route is found, redirect to unauthorized
            return NextResponse.redirect(
                new URL('/auth/login-auth', request.url)
            )
        }
    }
    return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
    matcher: ['/portals/:path*'],
}
