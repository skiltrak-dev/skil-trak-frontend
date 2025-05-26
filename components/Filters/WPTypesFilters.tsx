import { Select, TextInput } from '@components/inputs'
import { SetQueryFilters } from './SetQueryFilters'
import { CourseFilterType, Sector, WpTypesFilterType } from '@types'
import { AuthApi } from '@queries'
import { useMemo } from 'react'
import { SelectOption } from './types'

interface ItemFilterProps {
    onFilterChange: (values: WpTypesFilterType) => void
    filter: WpTypesFilterType
}
export const WPTypesFilters = ({ onFilterChange, filter }: ItemFilterProps) => {
    const sectorResponse = AuthApi.useSectors({})

    const sectorOptions = useMemo(
        () =>
            sectorResponse.data?.map((sector: Sector) => ({
                label: sector?.name,
                value: sector?.id,
            })),
        [sectorResponse]
    )

    return (
        <>
            <SetQueryFilters<WpTypesFilterType> filter={filter} />
            <div className="grid grid-cols-2 gap-x-4">
                <TextInput
                    name="name"
                    label={'Name'}
                    placeholder={'Search by Name ...'}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, name: e.target.value })
                    }}
                />
                <Select
                    label={'Search by Sector'}
                    name={'sectorId'}
                    options={sectorOptions}
                    placeholder={'Select Sector...'}
                    value={sectorOptions?.find(
                        (sector: SelectOption) =>
                            sector.value === Number(filter?.sectorId)
                    )}
                    onChange={(e: any) => {
                        onFilterChange({ ...filter, sectorId: e?.value })
                    }}
                    showError={false}
                    loading={sectorResponse.isLoading}
                    disabled={sectorResponse.isLoading}
                />
            </div>
        </>
    )
}
