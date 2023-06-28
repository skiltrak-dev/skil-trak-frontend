import { getUserCredentials } from '@utils'

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
