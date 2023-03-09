import { Select, TextInput } from '@components/inputs'
import { useState, useEffect } from 'react'

import { statusOptions } from './statusOptions'

// queries
import { CommonApi } from '@queries'
import { SetQueryFilters } from './SetQueryFilters'
import { SelectOption } from './types'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const SubAdminRtoFilter = ({
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
        <>
            <SetQueryFilters filter={filter} />
            <div className="grid grid-cols-3 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by RTO Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Email'}
                    placeholder={'Search by RTO Email ...'}
                    type={'email'}
                    value={filter?.email}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />
                <TextInput
                    label={'Phone Number'}
                    name={'phone'}
                    value={filter?.phone}
                    placeholder={'Search RTO Phone...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.value })
                    }}
                />
                <TextInput
                    label={'Code'}
                    name={'code'}
                    value={filter?.code}
                    placeholder={'Search RTO Code...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, code: e.value })
                    }}
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
