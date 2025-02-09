import { Select, TextInput } from '@components/inputs'

// query
import { AuthApi, CommonApi } from '@queries'

import {
    Course,
    Industry,
    OptionType,
    Rto,
    StudentsFilterType,
    UserStatus
} from '@types'
import {
    AuthUtils,
    CourseSelectOption,
    WorkplaceCurrentStatus,
    formatOptionLabel,
} from '@utils'
import { State } from 'country-state-city'
import { useMemo } from 'react'
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
        label: 'Waiting For Student',
        value: WorkplaceCurrentStatus.AwaitingStudentResponse,
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
    const getRtos = CommonApi.Filter.useRtos()
    const sectorResponse = AuthApi.useSectors({})
    const getCourses = CommonApi.Filter.useCourses()
    const getUserRole = AuthUtils.getUserCredentials()
    const getIndustries = CommonApi.Filter.useIndustries()

    const states = State.getStatesOfCountry('AU')

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
    const stateCodeOptions = states?.map((state: any) => ({
        value: state?.name,
        label: state?.name,
    }))

    const sectorOptions = useMemo(
        () =>
            sectorResponse.data?.map((sector: any) => ({
                label: sector?.name,
                value: sector?.id,
            })),
        [sectorResponse]
    )

    const noWorkplaceOption = [
        {
            label: 'No Workplace',
            value: 'Na',
        },
    ]

    return (
        <>
            <SetQueryFilters<StudentsFilterType> filter={filter} />
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
                    label={'Search by State'}
                    name={'state'}
                    options={stateCodeOptions}
                    placeholder={'Select State...'}
                    value={stateCodeOptions?.find(
                        (state: SelectOption) => state.value === filter?.state
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, state: e?.value })
                    }}
                    showError={false}
                />
                {/* <TextInput
                    name="state"
                    label={'State'}
                    value={filter?.suburb}
                    placeholder={'Search by Student State ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, state: e.target.value })
                    }}
                    showError={false}
                /> */}
                <Select
                    label={'Status'}
                    name={'status'}
                    value={StatusOptions.find(
                        (status) => status.value === filter?.status
                    )}
                    options={StatusOptions}
                    placeholder={'Select Status...'}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            status: e?.value as UserStatus,
                        })
                    }}
                    showError={false}
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
                        showError={false}
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
                    showError={false}
                    loading={getIndustries.isLoading}
                    disabled={getIndustries.isLoading}
                />

                <Select
                    label={'Search by Sector'}
                    name={'sectorId'}
                    options={sectorOptions}
                    placeholder={'Select Sector...'}
                    value={sectorOptions?.find(
                        (sector: SelectOption) =>
                            sector.value === Number(filter?.sectorId)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, sectorId: e?.value })
                    }}
                    showError={false}
                    loading={sectorResponse.isLoading}
                    disabled={sectorResponse.isLoading}
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
                    showError={false}
                />
                <Select
                    label={'Student with no workplace'}
                    name={'nowp'}
                    options={noWorkplaceOption}
                    placeholder={'Student with no workplace...'}
                    value={noWorkplaceOption?.find(
                        (noWp: SelectOption) => noWp.value === filter?.nowp
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, nowp: e?.value })
                    }}
                    showError={false}
                />
            </div>
        </>
    )
}
