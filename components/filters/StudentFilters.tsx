import { Select, TextInput } from '@components/inputs'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const StudentFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    return (
        <div className="grid grid-cols-4 gap-x-3">
            <TextInput
                name="name"
                label={'Name'}
                placeholder={'Search by Student Name ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, name: e.target.value })
                }}
            />
            <TextInput
                name="email"
                label={'Email'}
                placeholder={'Search by Student Email ...'}
                type={'email'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
            <TextInput
                name="phone"
                label={'Phone'}
                placeholder={'Search by Student Phone ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, phone: e.target.value })
                }}
            />
            <TextInput
                name="studentId"
                label={'Student Id'}
                placeholder={'Search by Student Id Email ...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, studentId: e.target.value })
                }}
            />
            <Select
                label={'Status'}
                name={'status'}
                options={[{ value: '', label: '' }]}
                placeholder={'Select Sectors...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, status: e.value })
                }}
            />
            <Select
                label={'Search By Rto'}
                name={'rto'}
                options={[{ value: '', label: '' }]}
                placeholder={'Select Search By Rto...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, rto: e.value })
                }}
            />
            <Select
                label={'Search by Industry'}
                name={'industry'}
                options={[{ value: '', label: '' }]}
                placeholder={'Select Industry...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, industry: e.value })
                }}
            />
            <Select
                label={'Search by Batch/Class'}
                name={'batch'}
                options={[{ value: '', label: '' }]}
                placeholder={'Select Batch/Class...'}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, batch: e.value })
                }}
            />
        </div>
    )
}
