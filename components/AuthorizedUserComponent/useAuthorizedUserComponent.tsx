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

    console.log(
        'HHH',
        ((hasPermission && isNotExcluded) || isHod
            ? (subadmin && subadmin.departmentMember?.isHod) || false
            : false) &&
            (isAssociatedWithRto
                ? subadmin?.isAssociatedWithRto
                : isAssociatedWithRto === false
                ? !subadmin?.isAssociatedWithRto
                : true)
    )

    return (
        (hasPermission && isNotExcluded) ||
        ((isHod ? subadmin.departmentMember?.isHod : false) &&
            (isAssociatedWithRto
                ? subadmin?.isAssociatedWithRto
                : isAssociatedWithRto === false
                ? !subadmin?.isAssociatedWithRto
                : true))
    )
}
