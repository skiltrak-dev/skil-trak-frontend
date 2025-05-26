import { ReactNode } from 'react'
import { useAuthorizedUserComponent } from './useAuthorizedUserComponent'

export const AuthorizedUserComponent = ({
    isHod,
    roles,
    children,
    excludeRoles,
    isAssociatedWithRto,
}: {
    isHod?: boolean
    roles?: string[]
    excludeRoles?: string[]
    children: ReactNode
    isAssociatedWithRto?: boolean
}) => {
    const hasPermission = useAuthorizedUserComponent({
        roles,
        excludeRoles,
        isHod: !!isHod,
        isAssociatedWithRto,
    })

    return hasPermission ? <>{children}</> : null
}
