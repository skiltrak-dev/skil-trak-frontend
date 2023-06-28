import { TextInput } from '@components/inputs'
import { SetQueryFilters } from './SetQueryFilters'

interface FilterPropType {
    code: string
    name: string
}

interface ItemFilterProps {
    onFilterChange: Function
    filter: FilterPropType
}
export const SectorFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    return (
        <>
            <SetQueryFilters<FilterPropType> filter={filter} />
            <div className="flex gap-x-2">
                <TextInput
                    name="code"
                    label={'Code'}
                    placeholder={'Search by Code ...'}
                    value={filter?.code}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, code: e.target.value })
                    }}
                />
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Name ...'}
                    value={filter?.name}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
            </div>
        </>
    )
}
