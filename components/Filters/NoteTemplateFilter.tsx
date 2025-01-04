import { TextInput } from '@components/inputs'
import { NoteTemplateFilterFilterType } from '@types'
import { SetQueryFilters } from './SetQueryFilters'

interface ItemFilterProps {
    onFilterChange: (values: NoteTemplateFilterFilterType) => void
    filter: NoteTemplateFilterFilterType
}
export const NoteTemplateFilter = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    return (
        <>
            <SetQueryFilters<NoteTemplateFilterFilterType> filter={filter} />
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
