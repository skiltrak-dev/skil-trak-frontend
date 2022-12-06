import { Button, Select, TextArea, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Course, Sector } from '@types'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: Course
    result: any
}

export const AssignSectorForm = ({
    onSubmit,
    edit,
    initialValues,
    result,
}: FormProps) => {
    const sectors = AdminApi.Sectors.useListQuery(
        {},
        { refetchOnMountOrArgChange: true }
    )

    const courses = AdminApi.Courses.useListQuery({})
    const [selectableCourses, setSelectableCourses] = useState<Course[]>([])

    const onSectorSelect = (options: any) => {
        const currentSelectedSectors = options.map((opt: any) => opt.value)

        const currentSelectableCourses: Course[] = []
        currentSelectedSectors.forEach((sectorId: number) => {
            const currentCourses = courses.data?.data.filter(
                (c) => c.sector.id === sectorId
            )

            if (currentCourses?.length)
                currentSelectableCourses.push(...currentCourses)
        })

        setSelectableCourses(currentSelectableCourses)
    }

    const validationSchema = yup.object({})

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className={'flex flex-col gap-y-2'}>
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Add Sectors &amp; Courses
                    </Typography>

                    <Select
                        name={'sectors'}
                        label={'Sector'}
                        options={
                            sectors.isLoading
                                ? []
                                : sectors.data?.data.map((s) => ({
                                      label: s.name,
                                      value: s.id,
                                  }))
                        }
                        onChange={(option: any) => onSectorSelect(option)}
                        loading={sectors.isLoading}
                        multi
                    />

                    <Select
                        name={'courses'}
                        label={'Courses'}
                        options={selectableCourses.map((c) => ({
                            label: c.title,
                            value: c.id,
                        }))}
                        multi
                    />

                    <div className="flex">
                        <Button
                            submit
                            text="Save"
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
