import { getUserCredentials } from '@utils'
import { ReactNode } from 'react'

export const AuthorizedUserComponent = ({
    roles,
    children,
    excludeRoles,
}: {
    roles?: string[]
    excludeRoles?: string[]
    children: ReactNode
}) => {
    const role = getUserCredentials()?.role

    const hasPermission = !roles?.length || roles.includes(role)

    // If excludeRoles is provided, check if user is not excluded
    const isNotExcluded = !excludeRoles?.length || !excludeRoles.includes(role)

    return hasPermission && isNotExcluded ? <>{children}</> : null

    return roles?.includes(role) ? <> {children} </> : null
}
