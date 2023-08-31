import { Select, TextInput } from '@components/inputs'
import { CommonApi } from '@queries'
import { SetQueryFilters } from './SetQueryFilters'
import { StatusOptions } from './StatusOptions'
import { SelectOption } from './types'
import { AdminSubadminFilter, Course, OptionType, UserStatus } from '@types'

interface ItemFilterProps {
    onFilterChange: (values: AdminSubadminFilter) => void
    filter: AdminSubadminFilter
}

export const SubAdminFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    // query
    const getCourses = CommonApi.Filter.useCourses()

    const coursesOptions = getCourses?.data?.map((course: Course) => ({
        value: course?.id,
        label: course?.title,
    }))

    return (
        <>
            <SetQueryFilters<AdminSubadminFilter> filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
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
                <Select
                    label={'Status'}
                    name={'status'}
                    options={StatusOptions}
                    value={StatusOptions?.find(
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
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    defaultValue={coursesOptions?.find(
                        (course: OptionType) =>
                            course.value === filter?.courseId
                    )}
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
