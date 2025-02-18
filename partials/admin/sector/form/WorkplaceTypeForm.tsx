import { Button, Select, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { AdminApi } from '@queries'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import { Course, OptionType, Sector, WPSectorType } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

interface WPTypeFormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: any
    result: any
}

const validationSchema = yup.object({
    sectors: yup.array().min(1, 'Must select at least 1 sector'),
    name: yup.string().required('Name is required!'),
})

export const WorkplaceTypeForm = ({
    result,
    onSubmit,
    edit,
    initialValues,
}: WPTypeFormProps) => {
    const sectors = AdminApi.Sectors.useListQuery(undefined)
    // const courses = AdminApi.Courses.useListQuery(undefined)

    const [selectedSector, setSelectedSector] = useState<number[] | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectableCourses, setSelectableCourses] = useState<OptionType[]>([])

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: initialValues?.name,
            sectors: initialValues?.sectors?.map(
                (s: WPSectorType) => s?.sector?.id
            ),
        },
        mode: 'all',
    })

    useEffect(() => {
        if (edit) {
            setSelectedSector(
                initialValues?.sectors?.map((s: WPSectorType) => s?.sector?.id)
            )
        }
    }, [initialValues, edit])

    // const onSectorSelect = (sectorId: number) => {
    //     setSelectedSector(sectorId)
    //     const currentSelectableCourses: Course[] = []
    //     const currentCourses = courses.data?.data.filter(
    //         (c) => c.sector.id === sectorId
    //     )

    //     if (currentCourses?.length)
    //         currentSelectableCourses.push(...currentCourses)

    //     setSelectableCourses(
    //         currentSelectableCourses?.map((c) => ({
    //             item: c,
    //             value: c.id,
    //             label: c.title,
    //         }))
    //     )
    // }

    const sectorOptions = sectors.data?.data?.map((sector: any) => ({
        label: sector?.name,
        value: sector?.id,
    }))

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Workplace Type Details
                        </Typography>
                    </div>

                    <Select
                        name={'sectors'}
                        label={'Sector'}
                        options={sectorOptions}
                        value={sectorOptions?.filter((sector) =>
                            selectedSector?.includes(sector?.value)
                        )}
                        multi
                        onChange={(e: number[]) => {
                            setSelectedSector(e)
                        }}
                        onlyValue
                        disabled={sectors?.isLoading}
                        loading={sectors.isLoading}
                    />

                    {/* <Select
                        name={'course'}
                        label={'Courses'}
                        options={selectableCourses}
                        onlyValue
                        onChange={(e: number) => {
                            setSelectedCourse(e)
                        }}
                        value={selectableCourses?.find(
                            (course) => course?.value === selectedCourse
                        )}
                        components={{
                            Option: CourseSelectOption,
                        }}
                        loading={courses?.isLoading}
                        disabled={courses?.isLoading}
                        formatOptionLabel={formatOptionLabel}
                    /> */}

                    <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Workplace Type...'}
                            required
                            validationIcons
                        />
                    </div>

                    <div>
                        <Button
                            submit
                            loading={result.isLoading}
                            disabled={result.isLoading}
                            {...(edit ? { outline: true } : {})}
                        >
                            {edit
                                ? 'Update Workplace Type'
                                : 'Add Workplace Type'}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
