import { PersonalInfoForm } from '@partials/common'
import { useStudentCoursesQuery } from '@queries'
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
    const { data, isSuccess, isLoading } = useStudentCoursesQuery(Number(id), {
        skip: !id,
    })
    const [courses, setCourses] = useState<any>([])

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
