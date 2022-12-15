import { Select, TextInput } from '@components/inputs'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const IndustryFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    return (
        <div className="grid grid-cols-4 gap-x-3">
            <TextInput
                name="name"
                label={'Name'}
                placeholder={'Search by Industry Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Email'}
                placeholder={'Search by Industry Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
            <Select
                label={'Status'}
                name={'status'}
                options={[{ value: '', label: '' }]}
                placeholder={'Select Status...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, status: e.value })
                }}
            />
            <TextInput
                label={'Industry Address'}
                name={'address'}
                placeholder={'Select Industry Address...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, address: e.value })
                }}
            />
        </div>
    )
}
