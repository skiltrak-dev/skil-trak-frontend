import { getUserCredentials } from '@utils'
import { ReactNode } from 'react'
import { useAuthorizedUserComponent } from './useAuthorizedUserComponent'

export const AuthorizedUserComponent = ({
    roles,
    children,
    excludeRoles,
    isHod,
}: {
    isHod?: boolean
    roles?: string[]
    excludeRoles?: string[]
    children: ReactNode
}) => {
    const hasPermission = useAuthorizedUserComponent({
        roles,
        excludeRoles,
        isHod,
    })

    return hasPermission ? <>{children}</> : null
}
