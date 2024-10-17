import { Select, TextInput } from '@components/inputs'

// query
import { AdminApi, AuthApi, CommonApi } from '@queries'

import {
    Course,
    OptionType,
    SubAdmin,
    UserStatus,
    WpCancelationReqFilter,
} from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { SetQueryFilters } from './SetQueryFilters'
import { SelectOption } from './types'
import { StatusOptions } from './StatusOptions'
import { AuthorizedUserComponent } from '@components/AuthorizedUserComponent'
import { UserRoles } from '@constants'

interface ItemFilterProps {
    filter: WpCancelationReqFilter
    onFilterChange: (values: WpCancelationReqFilter) => void
}

export const WPCancelationReqFilters = ({
    filter,
    onFilterChange,
}: ItemFilterProps) => {
    // query
    const getCourses = CommonApi.Filter.useCourses()
    const coordinators = AdminApi.SubAdmins.useSubAdminsFilterList()

    const coursesOptions = getCourses?.data?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    const coordinatorOptions = coordinators?.data?.map(
        (subadmin: SubAdmin) => ({
            value: subadmin?.user?.id,
            label: subadmin?.user?.name,
        })
    )

    const notIncludedStatus = [UserStatus.Blocked, UserStatus.Archived]

    return (
        <>
            <SetQueryFilters<WpCancelationReqFilter> filter={filter} />
            <div className="grid grid-cols-4 gap-x-3">
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    value={filter?.studentId}
                    placeholder={'Search by Student Id ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                    showError={false}
                />
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Student Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                    showError={false}
                />
                <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                    <TextInput
                        name="email"
                        label={'Email'}
                        placeholder={'Search by Student Email ...'}
                        type={'email'}
                        value={filter?.email}
                        onChange={(e: any) => {
                            onFilterChange({ ...filter, email: e.target.value })
                        }}
                        showError={false}
                    />
                </AuthorizedUserComponent>
                <TextInput
                    name="phone"
                    label={'Phone'}
                    value={filter?.phone}
                    placeholder={'Search by Student Phone ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                    showError={false}
                />

                <Select
                    label={'Status'}
                    name={'status'}
                    value={StatusOptions.find(
                        (status) => status.value === filter?.status
                    )}
                    options={StatusOptions?.filter(
                        (status) => !notIncludedStatus.includes(status?.value)
                    )}
                    placeholder={'Select Status...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            status: e?.value as UserStatus,
                        })
                    }}
                    showError={false}
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
                    showError={false}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                    components={{
                        Option: CourseSelectOption,
                    }}
                    formatOptionLabel={formatOptionLabel}
                />
                <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                    <Select
                        label={'Search by Coordinator'}
                        name={'coordinatorId'}
                        options={coordinatorOptions}
                        placeholder={'Select Coordinator...'}
                        value={coordinatorOptions?.find(
                            (subadmin: SelectOption) =>
                                subadmin.value === Number(filter?.coordinatorId)
                        )}
                        onChange={(e: any) => {
                            onFilterChange({
                                ...filter,
                                coordinatorId: e?.value,
                            })
                        }}
                        showError={false}
                        loading={coordinators.isLoading}
                        disabled={coordinators.isLoading}
                    />
                </AuthorizedUserComponent>
            </div>
        </>
    )
}
