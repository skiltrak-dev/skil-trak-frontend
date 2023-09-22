import { Select, TextInput } from '@components/inputs'

// query
import { CommonApi } from '@queries'

import {
    Course,
    Industry,
    OptionType,
    Rto,
    StudentsFilterType,
    UserStatus,
} from '@types'
import { AuthUtils, CourseSelectOption, WorkplaceCurrentStatus, formatOptionLabel } from '@utils'
import { SetQueryFilters } from './SetQueryFilters'
import { StatusOptions } from './StatusOptions'
import { SelectOption } from './types'

interface ItemFilterProps {
    onFilterChange: (values: StudentsFilterType) => void
    filter: StudentsFilterType
}

export const workplaceProgressOptions = [
    {
        label: 'Request Sent',
        value: WorkplaceCurrentStatus.Applied,
    },
    {
        label: 'Assigned',
        value: WorkplaceCurrentStatus.CaseOfficerAssigned,
    },
    {
        label: 'Interview',
        value: WorkplaceCurrentStatus.Interview,
    },
    {
        label: 'Waiting',
        value: WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
    },
    {
        label: 'Appointment',
        value: WorkplaceCurrentStatus.AppointmentBooked,
    },
    {
        label: 'Agreement & Eligibility Pending',
        value: WorkplaceCurrentStatus.AwaitingAgreementSigned,
    },
    {
        label: 'Agreement & Eligibility Signed',
        value: WorkplaceCurrentStatus.AgreementSigned,
    },
    {
        label: 'Placement Started',
        value: WorkplaceCurrentStatus.PlacementStarted,
    },
    {
        label: 'Placement Cancelled',
        value: WorkplaceCurrentStatus.Cancelled,
    },
    {
        label: 'Placement Completed',
        value: WorkplaceCurrentStatus.Completed,
    },
    {
        label: 'Rejected',
        value: WorkplaceCurrentStatus.Rejected,
    },
    {
        label: 'Terminated',
        value: WorkplaceCurrentStatus.Terminated,
    },
    {
        label: 'Industry NotResponded',
        value: WorkplaceCurrentStatus.NoResponse,
    },
]

export const StudentFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
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
        value: rto?.id,
        label: rto?.user?.name,
    }))

    const coursesOptions = getCourses?.data?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    return (
        <>
            <SetQueryFilters<StudentsFilterType> filter={filter} />
            <div className="grid grid-cols-3 gap-x-3">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Student Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        // router.push({
                        //     pathname: '/portals/admin/student',
                        //     query: {
                        //         tab: 'active',
                        //         page: 1,
                        //         pageSize: 50,
                        //         name: e.target.value,
                        //     },
                        // })
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <TextInput
                    name="email"
                    label={'Email'}
                    placeholder={'Search by Student Email ...'}
                    type={'email'}
                    value={filter?.email}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, email: e.target.value })
                    }}
                />
                <TextInput
                    name="phone"
                    label={'Phone'}
                    value={filter?.phone}
                    placeholder={'Search by Student Phone ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, phone: e.target.value })
                    }}
                />
                <TextInput
                    name="studentId"
                    label={'Student Id'}
                    value={filter?.studentId}
                    placeholder={'Search by Student Id Email ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, studentId: e.target.value })
                    }}
                />
                <Select
                    label={'Status'}
                    name={'status'}
                    value={StatusOptions.find(
                        (status) => status.value === filter?.status
                    )}
                    options={StatusOptions}
                    placeholder={'Select Sectors...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            status: e?.value as UserStatus,
                        })
                    }}
                />
                {getUserRole?.role !== 'rto' && (
                    <Select
                        label={'Search By Rto'}
                        name={'rtoId'}
                        value={rtoOptions?.find(
                            (rto: OptionType) =>
                                rto.value === Number(filter?.rtoId)
                        )}
                        options={rtoOptions}
                        placeholder={'Select Search By Rto...'}
                        onChange={(e: OptionType) => {
                            onFilterChange({
                                ...filter,
                                rtoId: Number(e?.value),
                            })
                        }}
                        loading={getRtos.isLoading}
                        disabled={getRtos.isLoading}
                    />
                )}
                <Select
                    label={'Search by Industry'}
                    name={'industryId'}
                    options={industryOptions}
                    placeholder={'Select Industry...'}
                    value={industryOptions?.find(
                        (industry: SelectOption) =>
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
                <Select
                    label={'Search by Progress'}
                    name={'currentStatus'}
                    options={workplaceProgressOptions}
                    placeholder={'Select Progress...'}
                    value={workplaceProgressOptions?.find(
                        (currentStatus: SelectOption) =>
                            currentStatus.value === filter?.currentStatus
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, currentStatus: e?.value })
                    }}
                />
            </div>
        </>
    )
}
