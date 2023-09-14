import { Select, TextInput } from '@components/inputs'

// queries
import { CommonApi } from '@queries'
import { OptionType, SubAdminRtoFilterType } from '@types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: (values: SubAdminRtoFilterType) => void
    filter: SubAdminRtoFilterType
}
export const SubAdminRtoFilter = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    // query
    const getCourses = CommonApi.Filter.useCourses()

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    return (
        <>
            <SetQueryFilters<SubAdminRtoFilterType> filter={filter} />
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
                    label={'Phone Number'}
                    name={'phone'}
                    value={filter?.phone}
                    placeholder={'Search RTO Phone...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.value })
                    }}
                />
                <TextInput
                    label={'Code'}
                    name={'code'}
                    value={filter?.code}
                    placeholder={'Search RTO Code...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, code: e.value })
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
