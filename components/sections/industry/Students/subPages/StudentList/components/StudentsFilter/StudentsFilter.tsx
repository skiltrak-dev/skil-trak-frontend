// components
import { TextInput, Select } from 'components'
export const StudentsFilter = ({ onFilterChange, filter }: any) => {
  const StatusOptions = [{ label: 'Pending', value: 'pending' }]

  const JobTypeOptions = [
    { value: 'fullTime', label: 'Full Time' },
    { value: 'partTime', label: 'Part Time' },
    { value: 'temporary-and-casual', label: 'Temporary & Casual' },
  ]

  return (
    <div className="flex items-start gap-x-5 py-2">
      <TextInput
        label={'Name'}
        name={'name'}
        placeholder={'Search By Student Name'}
        onChange={(e: any) => {
          onFilterChange({ ...filter, title: e.target.value })
        }}
      />
      <TextInput
        label={'Email'}
        name={'email'}
        placeholder={'Search By Student Email'}
        onChange={(e: any) => {
          onFilterChange({ ...filter, email: e.target.value })
        }}
      />
    </div>
  )
}
