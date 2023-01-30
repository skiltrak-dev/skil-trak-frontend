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
    onSubmit: any
    courses: any
}
export const PersonalInfoForm = ({ onSubmit, courses }: PersonalInfoProps) => {
    const coursesOptions = courses?.data?.map((course: any) => ({
        label: course.title,
        value: course.id,
    }))

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

    // const date = [...Array(7)].map((_, i) => ({
    //     date: getCurrentWeek()[i],
    //     day: moment.weekdaysShort()[i],
    // }))

    const validationSchema = yup.object({
        courses: yup.string().required('Must provide course'),
        currentQualification: yup
            .string()
            .required('Must provide currentQualification'),
        currentWork: yup.string().required('Must provide currentWork'),
        haveTransport: yup
            .string()
            .nullable(true)
            .required('Must provide Transport Option'),
        haveDrivingLicense: yup
            .string()
            .nullable(true)
            .required('Must provide Driving License Option'),
        preferableLocation: yup
            .string()
            .required('Must provide preferableLocation'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

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
                                options={coursesOptions}
                                loading={courses.isLoading}
                                disabled={courses.isLoading}
                                onlyValue
                            />
                        </div>
                        <div className="flex flex-col md:flex-row  gap-x-2 mt-4">
                            <TextInput
                                name="currentQualification"
                                label="Current Qualification"
                                placeholder="Current Qualification"
                            />
                            <TextInput
                                name="currentWork"
                                label="Current Work"
                                placeholder="Current Work"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-3 mb-5">
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                name="haveTransport"
                                label="Do you have your own transport?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                // value={'yes'}
                                name="haveDrivingLicense"
                                label="Do you have Australian driving license?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
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
