import { Button, Select, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Course } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface FormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: Course
    result: any
    sectorsWithCourses: any
}

export const AssignSectorForm = ({
    onSubmit,
    edit,
    initialValues,
    result,
    sectorsWithCourses,
}: FormProps) => {
    const selectInputRef = useRef(null)
    const sectors = AdminApi.Sectors.useListQuery(undefined)

    const courses = AdminApi.Courses.useListQuery(undefined)
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

        const getAssignedCourses = Object.values(sectorsWithCourses)
            ?.flat()
            ?.map((c: any) => `${c?.code}${c?.id}`)

        setSelectableCourses(
            currentSelectableCourses?.filter(
                (f) => !getAssignedCourses?.includes(`${f?.code}${f?.id}`)
            )
        )
    }

    const validationSchema = yup.object({})

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    const removeAddedSectors = () => {
        return sectors.data?.data?.filter(
            (f) => f?.courses?.length !== sectorsWithCourses[f?.name]?.length
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
                        onChange={(option: any) => {
                            onSectorSelect(option)
                        }}
                        loading={sectors.isLoading}
                        multi
                    />

                    <Select
                        name={'courses'}
                        label={'Courses'}
                        options={selectableCourses.map((c) => ({
                            item: c,
                            value: c.id,
                            label: c.title,
                        }))}
                        multi
                        components={{
                            Option: CourseSelectOption,
                        }}
                        formatOptionLabel={formatOptionLabel}
                    />

                    <div className="flex">
                        <Button
                            submit
                            text="Assign"
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
