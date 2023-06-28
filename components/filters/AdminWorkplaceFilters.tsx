import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi } from '@queries'

import { OptionType, SubAdmin } from '@types'
import { SetQueryFilters } from './SetQueryFilters'
import { statusOptions } from './statusOptions'
import { SelectOption } from './types'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const AdminWorkplaceFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    // query
    const getIndustries = CommonApi.Filter.useIndustries()
    const getCourses = CommonApi.Filter.useCourses()
    const getCoordinators = CommonApi.Appointments.allCoordinators()
    const getRtos = CommonApi.Filter.useRtos()

    const industryOptions = getIndustries?.data?.map((industry: any) => ({
        value: industry?.id,
        label: industry?.user?.name,
    }))

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        value: course?.id,
        label: course?.title,
    }))

    const coordinatorOptions = getCoordinators?.data?.map(
        (coordinator: SubAdmin) => ({
            value: coordinator?.id,
            label: coordinator?.user?.name,
        })
    )

    const rtoOptions =
        getRtos?.data && getRtos?.data?.length > 0
            ? getRtos?.data?.map((rto: any) => ({
                  value: rto?.id,
                  label: rto?.user?.name,
              }))
            : []

    return (
        <>
            <SetQueryFilters filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    placeholder={'Search by Student Id Email ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                />
                <TextInput
                    name="name"
                    label={'Student Name'}
                    placeholder={'Search by Student Name ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Student Email'}
                    placeholder={'Search by Student Email ...'}
                    type={'email'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />

                <TextInput
                    name="location"
                    label={'Location'}
                    placeholder={'Search by Location ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, location: e.target.value })
                    }}
                />

                <Select
                    label={'Status'}
                    name={'status'}
                    options={statusOptions}
                    value={statusOptions?.find(
                        (status) => status.value === filter.status
                    )}
                    placeholder={'Select Sectors...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({ ...filter, status: e?.value })
                    }}
                />

                <Select
                    label={'Coordinator'}
                    name={'coordinator'}
                    options={coordinatorOptions}
                    value={coordinatorOptions?.find(
                        (coordinators: SelectOption) =>
                            coordinators.value === Number(filter.subAdminId)
                    )}
                    placeholder={'Search by Coordinator...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({ ...filter, subAdminId: e?.value })
                    }}
                    loading={getCoordinators.isLoading}
                    disabled={getCoordinators.isLoading}
                />

                <Select
                    label={'Search by Rto'}
                    name={'rtoId'}
                    options={rtoOptions}
                    value={rtoOptions?.find(
                        (rto: OptionType) => rto.value === Number(filter.rtoId)
                    )}
                    placeholder={'Select Rto...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({ ...filter, rtoId: e?.value })
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
                            industry.value === Number(filter.industryId)
                    )}
                    placeholder={'Select Industry...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({ ...filter, industryId: e?.value })
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
                            course.value === Number(filter.courseId)
                    )}
                    placeholder={'Select Courses...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({ ...filter, courseId: e?.value })
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                />
            </div>
        </>
    )
}
