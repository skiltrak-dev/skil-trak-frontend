import { TextInput } from '@components/inputs'
import { SetQueryFilters } from './SetQueryFilters'
import { CourseFilterType } from '@types'

interface ItemFilterProps {
    onFilterChange: (values: CourseFilterType) => void
    filter: CourseFilterType
}
export const CourseFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    return (
        <>
            <SetQueryFilters<CourseFilterType> filter={filter} />
            <div className="flex gap-x-2">
                <TextInput
                    name="code"
                    label={'Code'}
                    placeholder={'Search by Code ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, code: e.target.value })
                    }}
                />
                <TextInput
                    name="title"
                    label={'Title'}
                    placeholder={'Search by Title ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, title: e.target.value })
                    }}
                />
            </div>
        </>
    )
}
