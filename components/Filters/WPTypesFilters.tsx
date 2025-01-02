import { TextInput } from '@components/inputs'
import { SetQueryFilters } from './SetQueryFilters'
import { CourseFilterType, WpTypesFilterType } from '@types'

interface ItemFilterProps {
    onFilterChange: (values: WpTypesFilterType) => void
    filter: WpTypesFilterType
}
export const WPTypesFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    return (
        <>
            <SetQueryFilters<WpTypesFilterType> filter={filter} />
            <div className="flex gap-x-2">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Name ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
            </div>
        </>
    )
}
