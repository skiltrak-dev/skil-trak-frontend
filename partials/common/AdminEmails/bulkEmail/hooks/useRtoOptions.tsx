import { UserRoles } from '@constants'
import { CommonApi } from '@queries'
import { getUserCredentials } from '@utils'
import React, { useEffect, useState } from 'react'

export const useRtoOptions = () => {
    const [rtoResponse, setRtoResponse] = useState<any>(null)

    const role = getUserCredentials()?.role

    const adminRtoResponse = CommonApi.Rtos.useRtosList(undefined, {
        skip: role !== UserRoles.ADMIN,
    })
    const subadminRtoResponse = CommonApi.Messages.bulkMailSubadminRTOs(
        undefined,
        {
            skip: role !== UserRoles.SUBADMIN,
        }
    )

    useEffect(() => {
        if (role === UserRoles.ADMIN) {
            setRtoResponse(adminRtoResponse)
        }
    }, [adminRtoResponse])

    useEffect(() => {
        if (role === UserRoles.SUBADMIN) {
            setRtoResponse(subadminRtoResponse)
        }
    }, [subadminRtoResponse])

    const rtoOptions = rtoResponse?.data?.length
        ? rtoResponse?.data?.map((rto: any) => ({
              label: `${rto?.user?.name} ${rto?.rtoCode}`,
              value: rto?.id,
          }))
        : []
    return { rtoOptions, rtoResponse }
}
