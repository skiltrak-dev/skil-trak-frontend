import { TextInput } from '@components/inputs'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const RtoFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    return (
        <div className="flex gap-x-2">
            <TextInput
                name="name"
                label={'Name'}
                placeholder={'Search by RTO Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Email'}
                placeholder={'Search by RTO Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
            <TextInput
                name="rtoCode"
                label={'Code'}
                placeholder={'Search by RTO Code ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, rtoCode: e.target.value })
                }}
            />
        </div>
    )
}
