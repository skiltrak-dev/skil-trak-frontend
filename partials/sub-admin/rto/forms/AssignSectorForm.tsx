import { Button, Select, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Course, OptionType } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { useEffect, useState } from 'react'
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
    const [selectedCourses, setSelectedCourses] = useState<any>([])
    const [selectedHours, setSelectedHours] = useState<any>([])

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

    const onHandleSubmit = (values: any) => {
        onSubmit({ ...values, courses: selectedCourses })
    }

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onHandleSubmit)}
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
                            item: c,
                            value: c.id,
                            label: c.title,
                        }))}
                        multi
                        components={{
                            Option: CourseSelectOption,
                        }}
                        onChange={(option: OptionType[]) =>
                            setSelectedCourses(
                                option?.map((o) => ({
                                    ...o,
                                    hours: o?.item?.hours,
                                }))
                            )
                        }
                        formatOptionLabel={formatOptionLabel}
                    />

                    {selectedCourses && selectedCourses?.length > 0 && (
                        <>
                            <Typography variant="small" bold>
                                Edit Courses Hours
                            </Typography>
                            {selectedCourses?.map((s: any) => (
                                <div className="grid grid-cols-4 items-center">
                                    <div className="col-span-3">
                                        <Typography variant="small">
                                            {s?.label}
                                        </Typography>
                                    </div>
                                    <input
                                        placeholder="Hours"
                                        className="border rounded p-1.5 text-xs"
                                        name="hours"
                                        type="number"
                                        value={s?.hours}
                                        onChange={(e: any) => {
                                            setSelectedCourses((course: any) =>
                                                course?.map((c: any) =>
                                                    c?.value === s?.value
                                                        ? {
                                                              ...c,
                                                              hours: Number(
                                                                  e.target.value
                                                              ),
                                                          }
                                                        : c
                                                )
                                            )
                                        }}
                                    />
                                </div>
                            ))}
                        </>
                    )}

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
