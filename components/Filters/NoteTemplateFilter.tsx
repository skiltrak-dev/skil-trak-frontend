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
                    name="subject"
                    label={'Subject'}
                    placeholder={'Search by Subject ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, subject: e.target.value })
                    }}
                />
            </div>
        </>
    )
}
