import { PersonalInfoForm, workplaceQuestions } from '@partials/common'
import { useGetStudentCoursesQuery } from '@queries'
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
    const courses = useGetStudentCoursesQuery()
    // const [courses, setCourses] = useState<any>([])

    const onSubmit = (values: any) => {
        let questions: { question: string; answer: string; type: string }[] = []
        Object.entries(workplaceQuestions).forEach(([key, value]: any) =>
            questions.push({
                question: value,
                answer: values[key],
                type: key,
            })
        )

        setPersonalInfoData({
            courses: values?.courses?.value,
            preferableLocation: values?.preferableLocation,
            questions,
            // courses: values?.courses?.value,
            // haveTransport: values.haveTransport === 'yes' ? true : false,
            // haveDrivingLicense:
            //     values.haveDrivingLicense === 'yes' ? true : false,
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
