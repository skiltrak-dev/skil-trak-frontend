import { Select, TextInput } from '@components/inputs'
import { SetQueryFilters } from './SetQueryFilters'
import { SelectOption } from './types'
import { UserRoles } from '@constants'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
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
            <SetQueryFilters filter={filter} />
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
                    defaultValue={appointmentForOptions?.find(
                        (appointment: SelectOption) =>
                            appointment.value === filter?.appintmentType
                    )}
                    options={appointmentForOptions}
                />
            </div>
        </>
    )
}
