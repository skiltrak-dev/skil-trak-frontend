import { maskText } from '@utils'
import { UserRoles } from '@constants'
import { useSubadminProfile } from './useSubadminProfile'

export const useAssignedCoorMaskText = ({
    key,
    roles,
    keyLength,
    subadminId,
}: {
    key: string
    keyLength?: number
    roles?: UserRoles[]
    subadminId: number
}) => {
    const subadmin = useSubadminProfile()

    const isPermission = subadmin && subadmin?.id === subadminId

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
