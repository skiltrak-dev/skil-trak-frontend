import { useEffect, useState } from 'react'
import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi } from '@queries'
import { SetQueryFilters } from './SetQueryFilters'
import { SelectOption } from './types'
interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const SubAdminAssessmentsFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const [rtoOptions, setRtoOptions] = useState<any>([])
    const [industryOptions, setIndustryOptions] = useState<any>([])
    const [coursesOptions, setCoursesOptions] = useState<any>([])

    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getRtos = CommonApi.Filter.useRtos()
    const getCourses = CommonApi.Filter.useCourses()

    useEffect(() => {
        if (getIndustries.isSuccess) {
            setIndustryOptions(
                getIndustries?.data?.map((industry: any) => ({
                    value: industry?.id,
                    label: industry?.user?.name,
                }))
            )
        }
    }, [getIndustries])

    useEffect(() => {
        if (getRtos.isSuccess) {
            setRtoOptions(
                getRtos?.data?.map((rto: any) => ({
                    value: rto?.id,
                    label: rto?.user?.name,
                }))
            )
        }
    }, [getRtos])

    useEffect(() => {
        if (getCourses.isSuccess) {
            setCoursesOptions(
                getCourses?.data?.map((course: any) => ({
                    value: course?.id,
                    label: course?.title,
                }))
            )
        }
    }, [getCourses])

    const resultOptions = [
        {
            label: 'Pending',
            value: 'pending',
        },
        {
            label: 'Not Competent',
            value: 'notCompetent',
        },
        {
            label: 'Competent',
            value: 'competent',
        },
        {
            label: 'Re-Opened',
            value: 'reOpened',
        },
    ]

    return (
        <>
            <SetQueryFilters filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Student Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Email'}
                    placeholder={'Search by Student Email ...'}
                    type={'email'}
                    value={filter?.email}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />
                <TextInput
                    name="phone"
                    label={'Phone'}
                    placeholder={'Search by Student Phone ...'}
                    value={filter?.phone}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                />
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    placeholder={'Search by Student Id Email ...'}
                    value={filter?.studentId}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                />
                <Select
                    label={'Result'}
                    name={'result'}
                    options={resultOptions}
                    placeholder={'Select Sectors...'}
                    defaultValue={resultOptions?.find(
                        (result: SelectOption) =>
                            result.value === filter?.result
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, result: e?.value })
                    }}
                />
                <Select
                    label={'Search By Rto'}
                    name={'rtoId'}
                    options={rtoOptions}
                    placeholder={'Select Search By Rto...'}
                    defaultValue={rtoOptions?.find(
                        (rto: SelectOption) => rto.value === filter?.rtoId
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, rtoId: e?.value })
                    }}
                    loading={getRtos.isLoading}
                    disabled={getRtos.isLoading}
                />
                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    defaultValue={coursesOptions?.find(
                        (course: SelectOption) =>
                            course.value === filter?.courseId
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, courseId: e?.value })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                />
            </div>
        </>
    )
}
