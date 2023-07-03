import { Select, TextInput } from '@components/inputs'
import { ChangeEvent } from 'react'

// query
import { CommonApi, useGetSubAdminRtosQuery } from '@queries'

import { SetQueryFilters } from './SetQueryFilters'
import { statusOptions } from './statusOptions'
import { SelectOption } from './types'
import {
    Course,
    Industry,
    OptionType,
    Rto,
    SubadminWorkplaceFiltersType,
    UserStatus,
} from '@types'

interface ItemFilterProps {
    onFilterChange: (values: SubadminWorkplaceFiltersType) => void
    filter: SubadminWorkplaceFiltersType
}
export const WorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getCourses = CommonApi.Filter.useCourses()
    const getRtos = useGetSubAdminRtosQuery({})

    const industryOptions = getIndustries?.data?.map((industry: Industry) => ({
        value: industry?.id,
        label: industry?.user?.name,
    }))

    const coursesOptions = getCourses?.data?.map((course: Course) => ({
        value: course?.id,
        label: course?.title,
    }))

    const rtoOptions =
        getRtos?.data?.data && getRtos?.data?.data?.length > 0
            ? getRtos?.data?.data?.map((rto: Rto) => ({
                  value: rto?.id,
                  label: rto?.user?.name,
              }))
            : []

    return (
        <>
            <SetQueryFilters<SubadminWorkplaceFiltersType> filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    value={filter?.studentId}
                    placeholder={'Search by Student Id Email ...'}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            status: e?.value as UserStatus,
                        })
                    }}
                />
                <Select
                    label={'Search by Rto'}
                    name={'rtoId'}
                    options={rtoOptions}
                    value={rtoOptions?.find(
                        (rto: OptionType) => rto.value === Number(filter?.rtoId)
                    )}
                    placeholder={'Select Rto...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({ ...filter, rtoId: Number(e?.value) })
                    }}
                    loading={getRtos.isLoading}
                    disabled={getRtos.isLoading}
                />
                <Select
                    label={'Search by Industry'}
                    name={'industryId'}
                    options={industryOptions}
                    value={industryOptions?.find(
                        (industry: OptionType) =>
                            industry.value === Number(filter?.industryId)
                    )}
                    placeholder={'Select Industry...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            industryId: Number(e?.value),
                        })
                    }}
                    loading={getIndustries.isLoading}
                    disabled={getIndustries.isLoading}
                />

                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    value={coursesOptions?.find(
                        (course: OptionType) =>
                            course.value === Number(filter?.courseId)
                    )}
                    placeholder={'Select Courses...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            courseId: Number(e?.value),
                        })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                />
            </div>
        </>
    )
}
