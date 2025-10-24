import { Button, Select, TextInput } from '@components'
import { IndustryCheckFilterType } from '@types'
import { AdminApi } from '@queries'
import { SetQueryFilters } from './SetQueryFilters'

interface IndustryCheckFiltersProps {
    filter: IndustryCheckFilterType
    onFilterChange: (values: IndustryCheckFilterType) => void
}

export const IndustryCheckFilters = ({
    filter,
    onFilterChange,
}: IndustryCheckFiltersProps) => {
    const sectors = AdminApi.Sectors.useListQuery(undefined)

    const sectorOptions = sectors.data?.data?.map((sector: any) => ({
        label: sector?.name,
        value: sector?.id,
    }))

    return (
        <div className="flex gap-x-4 items-end">
            <SetQueryFilters<IndustryCheckFilterType> filter={filter} />
            <div className="w-full">
                <TextInput
                    label="Name"
                    name="name"
                    value={filter?.name}
                    onChange={(e: any) =>
                        onFilterChange({ ...filter, name: e.target.value })
                    }
                    placeholder="Search by name..."
                />
            </div>

            <div className="w-full">
                <Select
                    name={'sector'}
                    label="Sector"
                    options={sectorOptions}
                    value={sectorOptions?.find(
                        (sector) => sector?.value === filter?.sectorId
                    )}
                    onChange={(e: number) =>
                        onFilterChange({ ...filter, sectorId: e })
                    }
                    onlyValue
                    placeholder="Select sector..."
                    loading={sectors?.isLoading}
                />
            </div>
        </div>
    )
}
