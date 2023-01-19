import { Select, TextInput } from '@components/inputs'
import { useState, useEffect } from 'react'

import { statusOptions } from './statusOptions'

// queries
import { CommonApi } from '@queries'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const IndustryFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const [coursesOptions, setCoursesOptions] = useState<any>([])

    // query
    const getCourses = CommonApi.Filter.useCourses()

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
                name="name"
                label={'Name'}
                placeholder={'Search by Industry Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Email'}
                placeholder={'Search by Industry Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
            <Select
                label={'Status'}
                name={'status'}
                options={statusOptions}
                placeholder={'Select Status...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, status: e?.value })
                }}
            />
            <TextInput
                label={'Industry Address'}
                name={'address'}
                placeholder={'Select Industry Address...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, address: e.value })
                }}
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
