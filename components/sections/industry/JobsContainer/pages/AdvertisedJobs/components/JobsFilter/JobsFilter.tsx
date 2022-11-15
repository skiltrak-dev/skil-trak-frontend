import React from 'react'

// components
import { TextInput, Select } from 'components'
export const JobsFilter = ({ onFilterChange, filter }: any) => {
  const StatusOptions = [{ label: 'Pending', value: 'pending' }]

  const JobTypeOptions = [
    { value: 'fullTime', label: 'Full Time' },
    { value: 'partTime', label: 'Part Time' },
    { value: 'temporary-and-casual', label: 'Temporary & Casual' },
  ]

  return (
    <div className="flex items-start gap-x-5 py-2">
      <TextInput
        label={'Title'}
        name={'title'}
        placeholder={'Search By Job Title'}
        onChange={(e) => {
          onFilterChange({ ...filter, title: e.target.value })
        }}
      />
      <Select
        label={'Type'}
        name={'type'}
        onChange={(e) => {
          onFilterChange({ ...filter, type: e.value })
        }}
        options={JobTypeOptions}
      />
      {/* <SelectFieldOption
                label={"Status"}
                name={"status"}
                onChange={(e) => {
                  onFilterChange({ ...filter, status: e.value });
                }}
                options={StatusOptions}
              /> */}
    </div>
  )
}
