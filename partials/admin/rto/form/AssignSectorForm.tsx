import { Button, Select, TextArea, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Course, OptionType, Sector } from '@types'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormProps {
    result: any
    onSubmit: any
    edit?: boolean
    initialValues?: Course
    sectorsWithCourses: any
}

export const AssignSectorForm = ({
    edit,
    result,
    onSubmit,
    initialValues,
    sectorsWithCourses,
}: FormProps) => {
    const sectors = AdminApi.Sectors.useListQuery(undefined, {
        refetchOnMountOrArgChange: true,
    })

    const courses = AdminApi.Courses.useListQuery(undefined)
    const [selectableCourses, setSelectableCourses] = useState<Course[]>([])

    console.log({ selectableCourses })

    const onSectorSelect = (options: any) => {
        const currentSelectedSectors = options.map(
            (opt: OptionType) => opt.value
        )

        const currentSelectableCourses: Course[] = []
        currentSelectedSectors.forEach((sectorId: number) => {
            const currentCourses = courses.data?.data.filter(
                (c) => c.sector.id === sectorId
            )

            if (currentCourses?.length)
                currentSelectableCourses.push(...currentCourses)
        })

        const getAssignedCourses = Object.values(sectorsWithCourses)
            ?.flat()
            ?.map((c: any) => c?.code)

        setSelectableCourses(
            currentSelectableCourses?.filter(
                (f) => !getAssignedCourses?.includes(f?.code)
            )
        )
    }

    const validationSchema = yup.object({})

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    useEffect(() => {
        if (result.isSuccess) {
            methods.reset()
        }
    }, [result])

    const removeAddedSectors = () => {
        return sectors.data?.data?.filter(
            (f) => f?.courses?.length !== sectorsWithCourses[f.name]?.length
        )
    }

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
                                : removeAddedSectors()?.map((s) => ({
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
