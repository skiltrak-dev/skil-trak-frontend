import React from 'react'

// components
import { TextInput, Select } from '@components'
import { SetQueryFilters } from '@components/Filters/SetQueryFilters'
export const JobsFilter = ({ onFilterChange, filter }: any) => {
    const StatusOptions = [{ label: 'Pending', value: 'pending' }]

    const JobTypeOptions = [
        { value: 'fullTime', label: 'Full Time' },
        { value: 'partTime', label: 'Part Time' },
        { value: 'temporary-and-casual', label: 'Temporary & Casual' },
    ]

    return (
        <>
            <SetQueryFilters filter={filter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 py-2">
                <TextInput
                    label={'Title'}
                    name={'title'}
                    placeholder={'Search By Job Title'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, title: e.target.value })
                    }}
                    showError={false}
                />
                <Select
                    label={'Type'}
                    name={'type'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, type: e.value })
                    }}
                    options={JobTypeOptions}
                    showError={false}
                />
            </div>
        </>
    )
}
