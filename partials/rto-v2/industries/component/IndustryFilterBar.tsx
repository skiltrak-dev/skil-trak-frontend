import { Search, Filter } from 'lucide-react'
import { TextInput, Select } from '@components'

interface IndustryFilterBarProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    filterSector: string
    onSectorChange: (value: any) => void
    filterStatus: string
    onStatusChange: (value: any) => void
}

const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'Community Services', label: 'Community Services' },
    { value: 'IT & Digital', label: 'IT & Digital' },
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Education', label: 'Education' },
    { value: 'Retail', label: 'Retail' },
]

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' },
]

export const IndustryFilterBar = ({
    searchTerm,
    onSearchChange,
    filterSector,
    onSectorChange,
    filterStatus,
    onStatusChange,
}: IndustryFilterBarProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <TextInput
                    name="search"
                    placeholder="Search industries by name, location, or ABN..."
                    value={searchTerm}
                    onChange={(e: any) => onSearchChange(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex items-center gap-2">
                <Select
                    name="sector"
                    options={sectorOptions}
                    value={sectorOptions.find(
                        (opt) => opt.value === filterSector
                    )}
                    onChange={onSectorChange}
                    placeholder="Sector"
                />
                <Select
                    name="status"
                    options={statusOptions}
                    value={statusOptions.find(
                        (opt) => opt.value === filterStatus
                    )}
                    onChange={onStatusChange}
                    placeholder="Status"
                />
            </div>
        </div>
    )
}
