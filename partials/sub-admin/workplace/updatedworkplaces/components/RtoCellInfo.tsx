import { Typography, useAuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import { useMaskText, useSubadminProfile } from '@hooks'
import { Rto } from '@types'
import { maskText } from '@utils'
import React from 'react'

export const RtoCellInfo = ({ rto }: { rto: Rto }) => {
    const subadmin = useSubadminProfile()
    const isPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
    })

    return (
        <div>
            <Typography variant="small" semibold>
                {rto?.user?.name ?? 'N/A'}
            </Typography>
            <Typography variant="small" color="text-gray-500">
                {useMaskText({
                    key: rto?.user?.email,
                })}
            </Typography>
        </div>
    )
}
