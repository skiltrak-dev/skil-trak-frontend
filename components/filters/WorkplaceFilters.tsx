import { useEffect, useState } from 'react'
import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi } from '@queries'

import { statusOptions } from './statusOptions'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const WorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const [industryOptions, setIndustryOptions] = useState<any>([])
    const [coursesOptions, setCoursesOptions] = useState<any>([])

    // query
    const getIndustries = CommonApi.Filter.useIndustries()
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
        if (getCourses.isSuccess) {
            setCoursesOptions(
                getCourses?.data?.map((course: any) => ({
                    value: course?.id,
                    label: course?.title,
                }))
            )
        }
    }, [getCourses])

    return (
        <div className="grid grid-cols-3 gap-x-3">
            <TextInput
                name="studentId"
                label={'Student Id'}
                placeholder={'Search by Student Id Email ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, studentId: e.target.value })
                }}
            />
            <TextInput
                name="name"
                label={'Student Name'}
                placeholder={'Search by Student Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Student Email'}
                placeholder={'Search by Student Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />

            <Select
                label={'Status'}
                name={'status'}
                options={statusOptions}
                placeholder={'Select Sectors...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, status: e?.value })
                }}
            />
            <Select
                label={'Search by Industry'}
                name={'industryId'}
                options={industryOptions}
                placeholder={'Select Industry...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, industryId: e?.value })
                }}
                loading={getIndustries.isLoading}
                disabled={getIndustries.isLoading}
            />

            <Select
                label={'Search by Courses'}
                name={'courseId'}
                options={coursesOptions}
                placeholder={'Select Courses...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, courseId: e?.value })
                }}
                loading={getCourses.isLoading}
                disabled={getCourses.isLoading}
            />
        </div>
    )
}
