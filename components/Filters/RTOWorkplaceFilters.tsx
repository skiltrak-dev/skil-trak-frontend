import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi, RtoApi } from '@queries'

import { SetQueryFilters } from './SetQueryFilters'
import { SelectOption } from './types'
import { OptionType, RTOWorkplaceFormFilter } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

interface FilterPropType {
    studentId: string
    name: string
    email: string
    location: string
    subAdminId: string
    industryId: string
    courseId: string
}

interface ItemFilterProps {
    onFilterChange: (values: RTOWorkplaceFormFilter) => void
    filter: RTOWorkplaceFormFilter
}
export const RTOWorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const courses = RtoApi.Rto.useProfile()
    const rtoCoordinators = RtoApi.Coordinator.useList({})

    const industryOptions = getIndustries?.data?.map((industry: any) => ({
        value: industry?.id,
        label: industry?.user?.name,
    }))

    const coursesOptions = courses?.data?.courses?.map((course: any) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    const coordinatorsOptions =
        rtoCoordinators?.data?.data && rtoCoordinators?.data?.data?.length > 0
            ? rtoCoordinators?.data?.data?.map((coordinator: any) => ({
                  value: coordinator?.user?.id,
                  label: coordinator?.user?.name,
              }))
            : []

    return (
        <>
            <SetQueryFilters<RTOWorkplaceFormFilter> filter={filter} />
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
                        (coordinator: OptionType) =>
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
                        (industry: OptionType) =>
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
                        (course: OptionType) =>
                            course.value === Number(filter?.courseId)
                    )}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            courseId: Number(e?.value),
                        })
                    }}
                    loading={courses.isLoading}
                    disabled={courses.isLoading}
                    components={{
                        Option: CourseSelectOption,
                    }}
                    formatOptionLabel={formatOptionLabel}
                />
            </div>
        </>
    )
}
