import { TextInput } from '@components/inputs'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const AppointmentFilter = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    return (
        <div className="flex gap-x-2">
            <TextInput
                name="name"
                label={'Name'}
                placeholder={'Search by Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Email'}
                placeholder={'Search by Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
        </div>
    )
}
