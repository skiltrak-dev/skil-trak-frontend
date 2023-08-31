import { Select, TextInput } from '@components/inputs'

import { StatusOptions } from './StatusOptions'

// queries
import { CommonApi } from '@queries'
import { AdminIndustryFormFilter, OptionType, UserStatus } from '@types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: (values: AdminIndustryFormFilter) => void
    filter: AdminIndustryFormFilter
    removeFilterKeysToUrl?: string[] | undefined
}
export const IndustryFilters = ({
    onFilterChange,
    filter,
    removeFilterKeysToUrl,
}: ItemFilterProps) => {
    // query
    const getCourses = CommonApi.Filter.useCourses()

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        value: course?.id,
        label: course?.title,
    }))

    const updatedFilter = {
        ...filter,
    }

    removeFilterKeysToUrl?.forEach((key) => {
        delete updatedFilter[key as keyof typeof updatedFilter]
    })

    return (
        <>
            <SetQueryFilters<AdminIndustryFormFilter> filter={updatedFilter} />
            <div className="grid grid-cols-3 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Industry Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Email'}
                    placeholder={'Search by Industry Email ...'}
                    type={'email'}
                    value={filter?.email}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />
                <TextInput
                    name="phone"
                    label={'Phone No'}
                    placeholder={'Search by Industry Email ...'}
                    value={filter?.phone}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                />
                <Select
                    label={'Status'}
                    name={'status'}
                    options={StatusOptions}
                    defaultValue={StatusOptions?.find(
                        (status) => status.value === filter?.status
                    )}
                    placeholder={'Select Status...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            status: e?.value as UserStatus,
                        })
                    }}
                />
                <TextInput
                    label={'Industry Address'}
                    name={'address'}
                    value={filter?.address}
                    placeholder={'Select Industry Address...'}
                    onChange={(e: any) => {
                        onFilterChange({
                            ...filter,
                            address: e.target.value,
                        })
                    }}
                />
                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    defaultValue={coursesOptions?.find(
                        (course: OptionType) =>
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
