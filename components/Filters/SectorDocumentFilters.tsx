import { Button, Select, TextInput } from '@components'
import { SectorDocumentFilterType } from '@types'
import { AdminApi } from '@queries'
import { SetQueryFilters } from './SetQueryFilters'

interface SectorDocumentFiltersProps {
    filter: SectorDocumentFilterType
    onFilterChange: (values: SectorDocumentFilterType) => void
}

export const SectorDocumentFilters = ({
    filter,
    onFilterChange,
}: SectorDocumentFiltersProps) => {
    const sectors = AdminApi.Sectors.useListQuery({
        limit: 100,
        skip: 0,
        search: '',
    })

    const sectorOptions = sectors.data?.data?.map((sector: any) => ({
        label: sector?.name,
        value: sector?.id,
    }))

    return (
        <div className="flex gap-x-4 items-end">
            <SetQueryFilters<SectorDocumentFilterType> filter={filter} />
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
