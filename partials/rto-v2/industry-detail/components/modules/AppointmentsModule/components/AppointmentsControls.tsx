import { Clock } from 'lucide-react'
import { Button, Select } from '@components'
import type { ViewType, StatusFilter } from './types'
import { OptionType } from '@types'

interface AppointmentsControlsProps {
    activeView: ViewType
    filterStatus: StatusFilter
    upcomingCount: number
    onViewChange: (view: ViewType) => void
    onFilterChange: (status: StatusFilter) => void
}

const statusFilterOptions: OptionType[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Upcoming', value: 'future' },
    { label: 'Completed', value: 'past' },
    // { label: 'Cancelled', value: 'cancelled' },
]

export function AppointmentsControls({
    activeView,
    filterStatus,
    upcomingCount,
    onViewChange,
    onFilterChange,
}: AppointmentsControlsProps) {
    return (
        <div className="p-4 border-b border-[#E2E8F0] bg-gradient-to-br from-[#F8FAFB] to-white">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {/* View Toggle */}
                    {/* <div className="flex bg-white border border-[#E2E8F0] rounded-lg p-0.5 shadow-sm">
                        <Button
                            onClick={() => onViewChange('list')}
                            variant="info"
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                                activeView === 'list'
                                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                                    : 'text-[#64748B] hover:text-[#1A2332]'
                            }`}
                        >
                            List
                        </Button>
                        <Button
                            onClick={() => onViewChange('calendar')}
                            variant="info"
                            className={`px-3 py-1 text-xs font-medium rounded-md ${
                                activeView === 'calendar'
                                    ? 'bg-[#8B5CF6] text-white shadow-sm'
                                    : 'text-[#64748B] hover:text-[#1A2332]'
                            }`}
                        >
                            Calendar
                        </Button>
                    </div> */}

                    {/* Status Filter */}
                    <div className="w-72">
                        <Select
                            showError={false}
                            name="statusFilter"
                            value={filterStatus}
                            options={statusFilterOptions}
                            onChange={(e: OptionType) =>
                                onFilterChange(e.value as StatusFilter)
                            }
                            className="hover:border-[#8B5CF6]/30 focus:ring-[#8B5CF6]/20"
                            placeholder="Select Status"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">
                        {upcomingCount}{' '}
                        <span className="text-xs text-[#64748B] capitalize">
                            {filterStatus === 'future'
                                ? 'upcoming'
                                : filterStatus}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}
