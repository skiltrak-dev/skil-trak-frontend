import { getUserCredentials } from '@utils'
import { ReactNode } from 'react'

export const useAuthorizedUserComponent = ({
    roles,
    excludeRoles,
    isHod,
}: {
    isHod?: boolean
    roles?: string[]
    excludeRoles?: string[]
}) => {
    const role = getUserCredentials()?.role

    const hasPermission = !roles?.length || roles.includes(role)

    // If excludeRoles is provided, check if user is not excluded
    const isNotExcluded = !excludeRoles?.length || !excludeRoles.includes(role)

    return (hasPermission && isNotExcluded) || isHod
}
