import { maskText } from '@utils'
import { UserRoles } from '@constants'
import { useAuthorizedUserComponent } from '@components'
import { useSubadminProfile } from './useSubadminProfile'

export const useMaskText = ({
    key,
    roles,
    keyLength,
    associatedWithRto = true,
}: {
    key: string
    keyLength?: number
    roles?: UserRoles[]
    associatedWithRto?: boolean
}) => {
    const isPermission = useAuthorizedUserComponent({
        roles: roles || [UserRoles.RTO, UserRoles.STUDENT],
    })

    const subadmin = useSubadminProfile()

    const isAssociatedWithRto = subadmin?.isAssociatedWithRto

    const updatedPermission =
        isPermission || associatedWithRto ? isAssociatedWithRto : false

    return maskText(
        key,
        updatedPermission
            ? key?.length || 0
            : keyLength !== undefined
            ? keyLength
            : key && key?.length > 3
            ? 4
            : key && key?.length > 0
            ? key?.length
            : 0
    )
}
