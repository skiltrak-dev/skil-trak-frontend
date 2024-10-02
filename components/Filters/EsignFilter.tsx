import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi } from '@queries'

import {
    Course,
    Industry,
    OptionType,
    Rto,
    UserStatus,
    eSignFilterType,
} from '@types'
import { AuthUtils, CourseSelectOption, formatOptionLabel } from '@utils'
import { SetQueryFilters } from './SetQueryFilters'
import { StatusOptions } from './StatusOptions'
import { SelectOption } from './types'

interface ItemFilterProps {
    onFilterChange: (values: eSignFilterType) => void
    filter: eSignFilterType
}

export const EsignFilter = ({ onFilterChange, filter }: ItemFilterProps) => {
    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getRtos = CommonApi.Filter.useRtos()
    const getCourses = CommonApi.Filter.useCourses()
    const getUserRole = AuthUtils.getUserCredentials()

    const industryOptions = getIndustries?.data?.map((industry: Industry) => ({
        value: industry?.id,
        label: industry?.user?.name,
    }))

    const rtoOptions = getRtos?.data?.map((rto: Rto) => ({
        value: rto?.user?.id,
        label: rto?.user?.name,
    }))

    const coursesOptions = getCourses?.data?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    return (
        <>
            <SetQueryFilters<eSignFilterType> filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Document Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />

                <Select
                    label={'Status'}
                    name={'status'}
                    value={StatusOptions.find(
                        (status) => status.value === filter?.status
                    )}
                    options={StatusOptions?.filter(
                        (status) =>
                            status?.value === UserStatus.Approved ||
                            status?.value === UserStatus.Archived
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
                    label={'Search By Rto'}
                    name={'userId'}
                    value={rtoOptions?.find(
                        (rto: OptionType) =>
                            rto.value === Number(filter?.userId)
                    )}
                    options={rtoOptions}
                    placeholder={'Select Search By Rto...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            userId: Number(e?.value),
                        })
                    }}
                    loading={getRtos.isLoading}
                    disabled={getRtos.isLoading}
                />

                <Select
                    label={'Search by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    value={coursesOptions?.find(
                        (course: SelectOption) =>
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
