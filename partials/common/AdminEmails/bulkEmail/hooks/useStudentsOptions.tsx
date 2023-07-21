import { UserRoles } from '@constants'
import { CommonApi } from '@queries'
import { getUserCredentials } from '@utils'
import React, { useEffect, useState } from 'react'

export const useStudentsOptions = ({
    getCourseIds,
    getRtoIds,
    getIndustriesIds,
    isWithWorkplace,
}: {
    getCourseIds: string
    getRtoIds: string
    getIndustriesIds: string
    isWithWorkplace: number | undefined
}) => {
    const [bulkMailStudentsResponse, setBulkMailStudentsResponse] =
        useState<any>(null)
    const role = getUserCredentials()?.role

    const adminAllStudents = CommonApi.Messages.useSearchBulkMailStudents(
        {
            courses: getCourseIds || undefined,
            rtos: getRtoIds || undefined,
            industries: getIndustriesIds || undefined,
            workplace: isWithWorkplace,
        },
        { skip: role !== UserRoles.ADMIN }
    )

    // const subadminStudents = CommonApi.Messages.useSearchBulkMailStudents(
    const subadminStudents = CommonApi.Messages.bulkMailSubadminStudents(
        {
            courses: getCourseIds || undefined,
            rtos: getRtoIds || undefined,
            industries: getIndustriesIds || undefined,
            workplace: isWithWorkplace,
        },
        { skip: role !== UserRoles.SUBADMIN }
    )

    useEffect(() => {
        if (role === UserRoles.ADMIN) {
            setBulkMailStudentsResponse(adminAllStudents)
        }
    }, [adminAllStudents])
    useEffect(() => {
        if (role === UserRoles.SUBADMIN) {
            setBulkMailStudentsResponse(subadminStudents)
        }
    }, [subadminStudents])

    const studentsOptions = bulkMailStudentsResponse?.data?.length
        ? bulkMailStudentsResponse?.data?.map((student: any) => ({
              label: `${student?.user?.name} ${student?.studentId}`,
              value: student?.id,
          }))
        : []
    return { studentsOptions, bulkMailStudentsResponse }
}
