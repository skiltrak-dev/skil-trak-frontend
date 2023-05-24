import { useEffect, useState } from 'react'
import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi, useGetSubAdminRtosQuery } from '@queries'

import { statusOptions } from './statusOptions'
import { SetQueryFilters } from './SetQueryFilters'
import { SelectOption } from './types'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const WorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getCourses = CommonApi.Filter.useCourses()
    const getRtos = useGetSubAdminRtosQuery({})

    const industryOptions = getIndustries?.data?.map((industry: any) => ({
        value: industry?.id,
        label: industry?.user?.name,
    }))

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        value: course?.id,
        label: course?.title,
    }))

    const rtoOptions =
        getRtos?.data?.data && getRtos?.data?.data?.length > 0
            ? getRtos?.data?.data?.map((rto: any) => ({
                  value: rto?.id,
                  label: rto?.user?.name,
              }))
            : []

    return (
        <>
            <SetQueryFilters filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    value={filter?.studentId}
                    placeholder={'Search by Student Id Email ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                />
                <TextInput
                    name="name"
                    value={filter?.name}
                    label={'Student Name'}
                    placeholder={'Search by Student Name ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    value={filter?.email}
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
                    value={statusOptions?.find(
                        (status) => status.value === filter?.status
                    )}
                    placeholder={'Select Sectors...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, status: e?.value })
                    }}
                />
                <Select
                    label={'Search by Rto'}
                    name={'rtoId'}
                    options={rtoOptions}
                    value={rtoOptions?.find(
                        (rto: SelectOption) =>
                            rto.value === Number(filter?.rtoId)
                    )}
                    placeholder={'Select Rto...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, rtoId: e?.value })
                    }}
                    loading={getRtos.isLoading}
                    disabled={getRtos.isLoading}
                />
                <Select
                    label={'Search by Industry'}
                    name={'industryId'}
                    options={industryOptions}
                    value={industryOptions?.find(
                        (industry: SelectOption) =>
                            industry.value === Number(filter?.industryId)
                    )}
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
                    value={coursesOptions?.find(
                        (course: SelectOption) =>
                            course.value === Number(filter?.courseId)
                    )}
                    placeholder={'Select Courses...'}
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
