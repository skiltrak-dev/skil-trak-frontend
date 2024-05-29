import { Select, TextInput } from '@components/inputs'

// queries
import { CommonApi } from '@queries'
import { OptionType, SubadminIndustryFilter } from '@types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: (values: SubadminIndustryFilter) => void
    filter: SubadminIndustryFilter
}
export const SubAdminIndustryFilter = ({
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
            <SetQueryFilters<SubadminIndustryFilter> filter={filter} />
            <div className="grid grid-cols-3 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Industry Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                    showError={false}
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
                    showError={false}
                />
                <TextInput
                    name="suburb"
                    label={'Suburb'}
                    placeholder={'Search Industry Suburb ...'}
                    value={filter?.suburb}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, suburb: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    name="state"
                    label={'State'}
                    placeholder={'Search Industry by State ...'}
                    value={filter?.state}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, state: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    label={'Phone Number'}
                    name={'phone'}
                    value={filter?.phone}
                    placeholder={'Search Industry Phone...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    label={'ABN'}
                    name={'abn'}
                    value={filter?.abn}
                    placeholder={'Search Industry ABN...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, abn: e.target.value })
                    }}
                    showError={false}
                />
                <Select
                    label={'Is Hiring'}
                    name={'isHiring'}
                    options={[
                        {
                            label: 'Is Hiring',
                            value: true,
                        },
                    ]}
                    onChange={(e: any) =>
                        onFilterChange({ ...filter, isHiring: e?.value })
                    }
                    showError={false}
                />
                <TextInput
                    label={'Address'}
                    name={'address'}
                    value={filter?.address}
                    placeholder={'Search By Address...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, address: e.target.value })
                    }}
                    showError={false}
                />
                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    value={coursesOptions?.find(
                        (course: OptionType) =>
                            course.value === Number(filter?.courseId)
                    )}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            courseId: Number(e?.value),
                        })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    showError={false}
                />
            </div>
        </>
    )
}
