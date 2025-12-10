import { Button, Select, TextArea, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSectorsAndCoursesOptions } from '@hooks'
import { AdminApi } from '@queries'
import { Course, OptionType, Sector } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormProps {
    addedCourses: Course[]
    onSubmit: (values: any) => void
    edit?: boolean
    initialValues?: any
    result: any
}

export const AssignSectorForm = ({
    addedCourses,
    onSubmit,
    edit,
    initialValues,
    result,
}: FormProps) => {
    const sectors = AdminApi.Sectors.useListQuery(
        {
            limit: 100,
            skip: 0,
            search: '',
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const courses = AdminApi.Courses.useListQuery({
        limit: 100,
        skip: 0,
        search: '',
    })
    const [selectableCourses, setSelectableCourses] = useState<Course[]>([])

    const {
        courseValues,
        sectorOptions,
        courseLoading,
        courseOptions,
        selectedSector,
        onSectorChanged,
        onCourseChange,
        sectorLoading,
        removeAddedSectors,
        updatedSectorsOptions,
    } = useSectorsAndCoursesOptions()

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
                        value={selectedSector}
                        // options={
                        //     sectors.isLoading
                        //         ? []
                        //         : sectors.data?.data.map((s) => ({
                        //               label: s.name,
                        //               value: s.id,
                        //           }))
                        // }
                        options={updatedSectorsOptions(
                            removeAddedSectors(addedCourses)
                        )}
                        loading={sectorLoading}
                        disabled={sectorLoading}
                        onChange={(option: any) =>
                            onSectorChanged(option, addedCourses)
                        }
                        multi
                    />

                    <Select
                        name={'courses'}
                        label={'Courses'}
                        options={courseOptions}
                        loading={courseLoading}
                        value={courseValues}
                        // options={selectableCourses.map((c) => ({
                        //     item: c,
                        //     value: c.id,
                        //     label: c.title,
                        // }))}
                        multi
                        onChange={(event: OptionType[]) => {
                            onCourseChange(event?.map((e: any) => e?.value))
                        }}
                        components={{
                            Option: CourseSelectOption,
                        }}
                        formatOptionLabel={formatOptionLabel}
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
