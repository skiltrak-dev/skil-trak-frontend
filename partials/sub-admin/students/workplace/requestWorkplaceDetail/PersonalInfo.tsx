import { PersonalInfoForm } from '@partials/common'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

type PersonalInfoProps = {
    setActive: any
    setPersonalInfoData: any
}

export const PersonalInfo = ({
    setActive,
    setPersonalInfoData,
}: PersonalInfoProps) => {
    const router = useRouter()
    const { id } = router.query

    const [courses, setCourses] = useState<any>([])

    const { data, isSuccess, isLoading } =
        SubAdminApi.Courses.useStudentCourses(Number(id), {
            skip: !id,
        })

    useEffect(() => {
        if (isSuccess) {
            const options = data?.map((course: any) => ({
                label: course.title,
                value: course.id,
            }))
            setCourses(options)
        }
    }, [data, isSuccess])

    const onSubmit = (values: any) => {
        setPersonalInfoData({
            ...values,
            haveTransport: values.haveTransport === 'yes' ? true : false,
            haveDrivingLicense:
                values.haveDrivingLicense === 'yes' ? true : false,
        })
        setActive((active: number) => active + 1)
    }

    return (
        <div>
            <PersonalInfoForm courses={courses} onSubmit={onSubmit} />
        </div>
    )
}
