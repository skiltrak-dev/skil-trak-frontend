import { useEffect, useState } from 'react'
import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi, useGetSubAdminRtosQuery, RtoApi } from '@queries'

import { statusOptions } from './statusOptions'
import { SelectOption } from './types'
import { SetQueryFilters } from './SetQueryFilters'

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
    const [selectedDropDownValues, setSelectDropDownValues] = useState<any>({})

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
        <>
            <SetQueryFilters filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    placeholder={'Search by Student Id Email ...'}
                    value={filter?.studentId}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                />
                <TextInput
                    name="name"
                    label={'Student Name'}
                    placeholder={'Search by Student Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Student Email'}
                    placeholder={'Search by Student Email ...'}
                    value={filter?.email}
                    type={'email'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />

                <TextInput
                    name="location"
                    label={'Location'}
                    placeholder={'Search by Location ...'}
                    value={filter?.location}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, location: e.target.value })
                    }}
                />

                <Select
                    label={'Search by Coordinator'}
                    name={'subAdminId'}
                    options={coordinatorsOptions}
                    value={coordinatorsOptions.find(
                        (coordinator: SelectOption) =>
                            coordinator.value === Number(filter?.subAdminId)
                    )}
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
                    value={industryOptions.find(
                        (industry: SelectOption) =>
                            industry.value === Number(filter?.industryId)
                    )}
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
                    value={coursesOptions.find(
                        (course: SelectOption) =>
                            course.value === Number(filter?.courseId)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, courseId: e?.value })
                    }}
                    loading={courses.isLoading}
                    disabled={courses.isLoading}
                />
            </div>
        </>
    )
}
