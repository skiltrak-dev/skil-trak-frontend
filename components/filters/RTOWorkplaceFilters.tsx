import { useEffect, useState } from 'react'
import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi, useGetSubAdminRtosQuery, RtoApi } from '@queries'

import { statusOptions } from './statusOptions'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const RTOWorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const [industryOptions, setIndustryOptions] = useState<any>([])
    const [coursesOptions, setCoursesOptions] = useState<any>([])

    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const courses = RtoApi.Rto.useProfile()
    const rtoCoordinators = RtoApi.Coordinator.useList({})

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
        if (courses.isSuccess) {
            setCoursesOptions(
                courses?.data?.courses?.map((course: any) => ({
                    value: course?.id,
                    label: course?.title,
                }))
            )
        }
    }, [courses])

    const coordinatorsOptions =
        rtoCoordinators?.data?.data && rtoCoordinators?.data?.data?.length > 0
            ? rtoCoordinators?.data?.data?.map((coordinator: any) => ({
                  value: coordinator?.user?.id,
                  label: coordinator?.user?.name,
              }))
            : []

    return (
        <div className="grid grid-cols-4 gap-x-3">
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

            <TextInput
                name="location"
                label={'Location'}
                placeholder={'Search by Location ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, location: e.target.value })
                }}
            />

            <Select
                label={'Search by Coordinator'}
                name={'subAdminId'}
                options={coordinatorsOptions}
                placeholder={'Select Coordinator...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, subAdminId: e?.value })
                }}
                loading={rtoCoordinators.isLoading}
                disabled={rtoCoordinators.isLoading}
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
                loading={courses.isLoading}
                disabled={courses.isLoading}
            />
        </div>
    )
}
