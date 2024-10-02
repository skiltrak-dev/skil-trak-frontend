import React from 'react'
import { getUserCredentials } from '@utils'
import { SubAdminApi } from '@queries'
import { UserRoles } from '@constants'

export const useCheckPermission = () => {
    const role = getUserCredentials()?.role
    const subAdmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
        // refetchOnFocus: true,
    })

    const extractTruePermissions = (data: any) => {
        if (!data) return {}

        // Filter only boolean values that are true
        const truePermissions = Object.keys(data)?.reduce((acc, key) => {
            if (typeof data[key] === 'boolean' && data[key] === true) {
                acc[key] = true
            }
            return acc
        }, {} as { [key: string]: boolean })

        return truePermissions
    }

    const isHod = subAdmin?.data?.departmentMember?.isHod
    const isAdmin = subAdmin?.data?.isAdmin
    const subAdminRole = role === UserRoles.SUBADMIN

    // Extract permissions from subAdmin data
    const permissions = extractTruePermissions(subAdmin?.data)

    return {
        role,
        subAdminRole,
        isHod,
        isAdmin,
        permissions,
    }
}
