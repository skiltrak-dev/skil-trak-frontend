import { getUserCredentials } from '@utils'
import { ReactNode } from 'react'

export const AuthorizedUserComponent = ({
    roles,
    children,
}: {
    roles: string[]
    children: any
}) => {
    const role = getUserCredentials()?.role
    return roles?.includes(role) ? children : null
}
