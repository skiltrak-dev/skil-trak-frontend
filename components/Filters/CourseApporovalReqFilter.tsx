import { Select, TextInput } from '@components/inputs'

// queries
import { AuthApi, CommonApi } from '@queries'
import { CourseApprovalReqTypes, OptionType } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { SetQueryFilters } from './SetQueryFilters'

interface CourseApporovalReqFilterProps {
    onFilterChange: (values: CourseApprovalReqTypes) => void
    filter: CourseApprovalReqTypes
    removeFilterKeysToUrl?: string[] | undefined
}
export const CourseApporovalReqFilter = ({
    onFilterChange,
    filter,
    removeFilterKeysToUrl,
}: CourseApporovalReqFilterProps) => {
    // query
    const getCourses = CommonApi.Filter.useCourses()
    const getSectors = AuthApi.useSectors({})
    // const wpTypes = CommonApi.Rtos.getRtoWpTypes()

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
            <SetQueryFilters<CourseApprovalReqTypes> filter={updatedFilter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3">
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
                    name="phone"
                    label={'Phone No'}
                    placeholder={'Search by Industry Email ...'}
                    value={filter?.phone}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    name="abn"
                    label={'Abn'}
                    placeholder={'Search by Industry ABN ...'}
                    value={filter?.abn}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, abn: e.target.value })
                    }}
                    showError={false}
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
                    showError={false}
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
                    showError={false}
                />
            </div>
        </>
    )
}
