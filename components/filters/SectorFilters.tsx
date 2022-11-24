import { TextInput } from '@components/inputs'

interface ItemFilterProps {
  onFilterChange: Function
  filter: any
}
export const SectorFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
  return (
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
        name="name"
        label={'Name'}
        placeholder={'Search by Name ...'}
        onChange={(e: any) => {
          onFilterChange({ ...filter, name: e.target.value })
        }}
      />
    </div>
  )
}
