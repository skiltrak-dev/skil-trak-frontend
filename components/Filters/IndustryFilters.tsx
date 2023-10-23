import { Select, TextInput } from '@components/inputs'

import { StatusOptions } from './StatusOptions'

// queries
import { CommonApi, AuthApi } from '@queries'
import { AdminIndustryFormFilter, OptionType, UserStatus } from '@types'
import { SetQueryFilters } from './SetQueryFilters'
import { CourseSelectOption, formatOptionLabel } from '@utils'

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
    const getSectors = AuthApi.useSectors({})

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    const updatedFilter = {
        ...filter,
    }

    removeFilterKeysToUrl?.forEach((key) => {
        delete updatedFilter[key as keyof typeof updatedFilter]
    })

    const sectorOptions = getSectors.data?.map((sector: any) => ({
        label: sector.name,
        value: sector.id,
    }))

    return (
        <>
            <SetQueryFilters<AdminIndustryFormFilter> filter={updatedFilter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3">
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
                    name="suburb"
                    label={'Suburb'}
                    placeholder={'Search Industry Suburb ...'}
                    value={filter?.suburb}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, suburb: e.target.value })
                    }}
                />
                <TextInput
                    name="state"
                    label={'State'}
                    placeholder={'Search Industry by State ...'}
                    value={filter?.state}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, state: e.target.value })
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
                    label={'Search by Sectors'}
                    name={'sectorId'}
                    options={sectorOptions}
                    placeholder={'Select Sectors...'}
                    value={sectorOptions?.find(
                        (sector: OptionType) =>
                            sector?.value === Number(filter?.sectorId)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, sectorId: e })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    onlyValue
                />
                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    defaultValue={coursesOptions?.find(
                        (course: OptionType) =>
                            course.value === Number(filter?.courseId)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, courseId: e?.value })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    components={{
                        Option: CourseSelectOption,
                    }}
                    formatOptionLabel={formatOptionLabel}
                />
            </div>
        </>
    )
}
