import React from 'react'
import { useSubadminProfile } from './useSubadminProfile'
import { useAuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import { maskText } from '@utils'

export const useMaskText = ({
    key,
    roles,
    keyLength,
}: {
    key: string
    keyLength?: number
    roles?: UserRoles[]
}) => {
    const subadmin = useSubadminProfile()
    const isPermission = useAuthorizedUserComponent({
        roles: roles || [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
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
