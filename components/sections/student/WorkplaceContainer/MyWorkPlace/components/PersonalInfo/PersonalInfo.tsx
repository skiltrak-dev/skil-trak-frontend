import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { Button } from 'components/buttons/Button'
import { Select, TextInput, RadioButton, RadioGroup } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// components
import { Card, Typography } from 'components'

import { useGetStudentCoursesQuery, useGetCourseDocumentsQuery } from '@queries'
import { SignUpUtils } from '@utils'
type PersonalInfoProps = {
    setActive: any
    setPersonalInfoData: any
}
export const PersonalInfo = ({
    setActive,
    setPersonalInfoData,
}: PersonalInfoProps) => {
    const { data, isSuccess, isLoading } = useGetStudentCoursesQuery()
    const [courses, setCourses] = useState<any[]>([])

    // function getCurrentWeek() {
    //     var currentDate = moment()

    //     var weekStart = currentDate.clone().startOf('week')
    //     var weekEnd = currentDate.clone().endOf('week')

    //     var days = []

    //     for (var i = 0; i <= 6; i++) {
    //         days.push(moment(weekStart).add(i, 'days').format('DD'))
    //     }
    //     return days
    // }
    // console.log(moment.weekdaysShort())
    // console.log(getCurrentWeek())

    // const date = [...Array(7)].map((_, i) => ({
    //     date: getCurrentWeek()[i],
    //     day: moment.weekdaysShort()[i],
    // }))

    // console.log('date', date)

    useEffect(() => {
        if (isSuccess) {
            const options = data?.map((course: any) => ({
                label: course.title,
                value: course.id,
            }))
            setCourses(options)
        }
    }, [data, isSuccess])

    // console.log('courses', courses)

    const initialValues = {
        course: '',
        currentQualification: '',
        currentWork: '',
        haveTransport: '',
        haveDrivingLicense: '',
        preferableLocation: '',
    }

    const validationSchema = yup.object({
        // course: yup.string().required('Must provide course'),
        // currentQualification: yup
        //     .string()
        //     .required('Must provide currentQualification'),
        // currentWork: yup.string().required('Must provide currentWork'),
        // haveTransport: yup.string().required('Must provide haveTransport'),
        // haveDrivingLicense: yup
        //     .string()
        //     .required('Must provide haveDrivingLicense'),
        // preferableLocation: yup
        //     .string()
        //     .required('Must provide preferableLocation'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (values: any) => {
        setPersonalInfoData(values)
        setActive((active: number) => active + 1)
    }

    return (
        <div>
            <Typography variant={'label'} capitalize>
                Please provide following information
            </Typography>
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div>
                            <Select
                                id="courses"
                                placeholder="Select Your Choice"
                                name="courses"
                                label="Course"
                                options={courses}
                                loading={isLoading}
                                disabled={isLoading}
                                multi
                                onlyValue
                            />
                        </div>
                        <div className="flex gap-x-2 mt-4">
                            <TextInput
                                name="currentQualification"
                                label="Current Qualification"
                                placeholder="Current Qualification"
                            />
                            <TextInput
                                name="currentWork"
                                label="Current Work"
                            />
                        </div>
                        <div className=" flex mb-5">
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                // value={'yes'}
                                name="haveTransport"
                                label="Do you have your own transport?"
                                options={[
                                    { value: 'true', label: 'Yes' },
                                    { value: 'false', label: 'No' },
                                ]}
                            />
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                // value={'yes'}
                                name="haveDrivingLicense"
                                label="Do you have Australian driving license?"
                                options={[
                                    { value: 'true', label: 'Yes' },
                                    { value: 'false', label: 'No' },
                                ]}
                            />
                        </div>
                        <div>
                            <TextInput
                                name="preferableLocation"
                                label="Preferable Location"
                                placeholder="Preferable Location"
                            />
                        </div>
                        <Button text={'Continue'} submit />
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
