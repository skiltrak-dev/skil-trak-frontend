import { Select, TextInput } from '@components/inputs'
import { CommonApi } from '@queries'
import { OptionType, RTOFilterType, UserStatus } from '@types'
import { CourseSelectOption } from '@utils'
import { SetQueryFilters } from './SetQueryFilters'
import { StatusOptions } from './StatusOptions'

interface ItemFilterProps {
    onFilterChange: (values: RTOFilterType) => void
    filter: RTOFilterType
}
export const RtoFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    // query
    const getCourses = CommonApi.Filter.useCourses()

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    return (
        <>
            <SetQueryFilters<RTOFilterType> filter={filter} />
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
                    name="rtoCode"
                    label={'Code'}
                    placeholder={'Search by RTO Code ...'}
                    value={filter?.rtoCode}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, rtoCode: e.target.value })
                    }}
                />
                <Select
                    label={'Status'}
                    name={'status'}
                    options={StatusOptions}
                    placeholder={'Select Status...'}
                    defaultValue={StatusOptions.find(
                        (status) => status.value === filter?.status
                    )}
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
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, courseId: e?.value })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    components={{
                        Option: CourseSelectOption,
                    }}
                />
            </div>
        </>
    )
}
