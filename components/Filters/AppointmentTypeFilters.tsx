import { Select, TextInput } from '@components/inputs'
import { UserRoles } from '@constants'
import { AppointmentTypeFilterType, OptionType } from '@types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: (values: AppointmentTypeFilterType) => void
    filter: AppointmentTypeFilterType
}
export const AppointmentTypeFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const appointmentForOptions = [
        { label: 'Industry', value: UserRoles.INDUSTRY },
        { label: 'RTO', value: UserRoles.RTO },
        { label: 'Student', value: UserRoles.STUDENT },
    ]
    return (
        <>
            <SetQueryFilters<AppointmentTypeFilterType> filter={filter} />
            <div className="flex gap-x-2">
                <TextInput
                    name="title"
                    label={'Title'}
                    placeholder={'Search by Title ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, title: e.target.value })
                    }}
                />
                <Select
                    label={'Appointment For'}
                    name={'appointmentFor'}
                    value={appointmentForOptions?.find(
                        (appointment: OptionType) =>
                            appointment.value === filter?.appintmentType
                    )}
                    options={appointmentForOptions}
                    onChange={(e: OptionType) => {
                        onFilterChange({
                            ...filter,
                            appintmentType: e.value as UserRoles,
                        })
                    }}
                />
            </div>
        </>
    )
}
