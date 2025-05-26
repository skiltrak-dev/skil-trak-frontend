import { useSubadminProfile } from '@hooks'
import { getUserCredentials } from '@utils'

export const useAuthorizedUserComponent = ({
    roles,
    isHod,
    excludeRoles,
    isAssociatedWithRto,
}: {
    isHod?: boolean
    roles?: string[]
    excludeRoles?: string[]
    isAssociatedWithRto?: boolean
}) => {
    const role = getUserCredentials()?.role

    const subadmin = useSubadminProfile()

    const hasPermission = !roles?.length || roles.includes(role)

    // If excludeRoles is provided, check if user is not excluded
    const isNotExcluded = !excludeRoles?.length || !excludeRoles.includes(role)

    return (
        ((hasPermission && isNotExcluded) || isHod) &&
        (isAssociatedWithRto
            ? subadmin?.isAssociatedWithRto
            : isAssociatedWithRto === false
            ? !subadmin?.isAssociatedWithRto
            : true)
    )
}
