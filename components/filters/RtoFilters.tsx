import { TextInput, Select } from '@components/inputs'
import { CommonApi } from '@queries'
import { useEffect, useState } from 'react'
import { statusOptions } from './statusOptions'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const RtoFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
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
                placeholder={'Search by RTO Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Email'}
                placeholder={'Search by RTO Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
            <TextInput
                name="rtoCode"
                label={'Code'}
                placeholder={'Search by RTO Code ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, rtoCode: e.target.value })
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
