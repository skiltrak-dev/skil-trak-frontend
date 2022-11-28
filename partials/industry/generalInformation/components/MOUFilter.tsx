// components
import { TextInput, Select } from '@components'
export const MOUFilter = ({ onFilterChange, filter }: any) => {
    const StatusOptions = [{ label: 'Pending', value: 'pending' }]

    const selectOptions = [
        {
            label: 'Initiated',
            value: 'initiated',
        },
        {
            label: 'Requested',
            value: 'requested',
        },
        {
            label: 'Signed',
            value: 'signed',
        },
        {
            label: 'Cancelled',
            value: 'cancelled',
        },
        {
            label: 'Not Initiated',
            value: 'not-nitiated',
        },
    ]

    return (
        <div className="flex items-start gap-x-5 py-2">
            <TextInput
                label={'Name'}
                name={'name'}
                placeholder={'Search By RTO Name'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                label={'Email'}
                name={'email'}
                type={'email'}
                placeholder={'Search By RTO Email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
            <TextInput
                label={'Code'}
                name={'rtoCode'}
                placeholder={'Search By RTO Code'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, rtoCode: e.target.value })
                }}
            />
            <Select
                label={'Status'}
                name={'status'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, status: e.value })
                }}
                options={selectOptions}
            />
        </div>
    )
}
