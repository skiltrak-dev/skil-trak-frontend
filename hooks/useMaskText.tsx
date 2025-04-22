import { maskText } from '@utils'
import { UserRoles } from '@constants'
import { useAuthorizedUserComponent } from '@components'

export const useMaskText = ({
    key,
    roles,
    keyLength,
}: {
    key: string
    keyLength?: number
    roles?: UserRoles[]
}) => {
    const isPermission = useAuthorizedUserComponent({
        roles: roles || [UserRoles.RTO, UserRoles.STUDENT],
    })

    return maskText(
        key,
        isPermission
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
