import { Select, TextInput } from '@components/inputs'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const AppointmentTypeFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    return (
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
                options={[
                    { label: 'Industry', value: 'industry' },
                    { label: 'RTO', value: 'rto' },
                    { label: 'Student', value: 'student' },
                ]}
            />
        </div>
    )
}
