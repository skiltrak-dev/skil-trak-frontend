import { UserRoles } from '@constants'
import { CommonApi } from '@queries'
import { getUserCredentials } from '@utils'
import React, { useEffect, useState } from 'react'

export const useIndustriesOptions = () => {
    const [industriesResponse, setIndustriesResponse] = useState<any>(null)

    const role = getUserCredentials()?.role
    const adminCoursesResponse = CommonApi.Industries.useIndustriesList(
        undefined,
        {
            skip: role !== UserRoles.ADMIN,
        }
    )
    const subadminCoursesResponse =
        CommonApi.Industries.bulkEmailSubadminIndustries(undefined, {
            skip: role !== UserRoles.SUBADMIN,
        })

    useEffect(() => {
        if (role === UserRoles.ADMIN) {
            setIndustriesResponse(adminCoursesResponse)
        }
    }, [adminCoursesResponse])

    useEffect(() => {
        if (role === UserRoles.SUBADMIN) {
            setIndustriesResponse(subadminCoursesResponse)
        }
    }, [subadminCoursesResponse])

    const industryOptions = industriesResponse?.data?.length
        ? industriesResponse?.data?.map((industry: any) => ({
              label: `${industry?.user?.name} ${industry?.abn}`,
              value: industry?.id,
          }))
        : []

    return { industryOptions, industriesResponse }
}
