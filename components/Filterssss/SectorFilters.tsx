import { TextInput } from '@components/inputs'
import { SetQueryFilters } from './SetQueryFilters'
import { SectorFilterTypes } from '@types'

interface ItemFilterProps {
    onFilterChange: (values: SectorFilterTypes) => void
    filter: SectorFilterTypes
}
export const SectorFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    return (
        <>
            <SetQueryFilters<SectorFilterTypes> filter={filter} />
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
