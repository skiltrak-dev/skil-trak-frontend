import { PersonalInfoForm } from '@partials/common'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

type PersonalInfoProps = {
    setActive: any
    setPersonalInfoData: any
    personalInfoData: any
}

export const PersonalInfo = ({
    setActive,
    setPersonalInfoData,
    personalInfoData,
}: PersonalInfoProps) => {
    const router = useRouter()
    const { id } = router.query

    const courses = SubAdminApi.Courses.useStudentCourses(Number(id), {
        skip: !id,
    })

    const onSubmit = (values: any) => {
        console.log({ values })
        setPersonalInfoData({
            ...values,
            courses: values?.courses?.value,
            haveTransport: values.haveTransport === 'yes' ? true : false,
            haveDrivingLicense:
                values.haveDrivingLicense === 'yes' ? true : false,
        })
        setActive((active: number) => active + 1)
    }

    return (
        <div>
            <PersonalInfoForm
                courses={courses}
                onSubmit={onSubmit}
                personalInfoData={personalInfoData}
            />
        </div>
    )
}
