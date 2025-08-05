import { Button, Typography } from '@components'
import { CommunicationFiltersProps } from '../types'

export const CommunicationFilters: React.FC<CommunicationFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    fromFilter,
    setFromFilter,
    isExpanded,
    onExpandToggle,
}) => (
    <div className="flex items-center space-x-4 mb-4 p-4 bg-gray-50">
        <div className="flex-1">
            <input
                type="text"
                placeholder="Search communications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
        </div>

        <div className="flex items-center space-x-2">
            <Typography variant="small" color="text-gray-600">
                Type:
            </Typography>
            <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            >
                <option value="All">All</option>
                <option value="Email">Email</option>
                <option value="Call">Call</option>
                <option value="Message">Message</option>
                <option value="Ticket">Ticket</option>
                <option value="Note">Note</option>
                <option value="PinnedNotes">Pinned Notes</option>
                <option value="internalNotes">Internal Notes</option>
            </select>
        </div>

        {/* <Button
            variant={isExpanded ? 'error' : 'secondary'}
            onClick={onExpandToggle}
        >
            {isExpanded ? '📋 Collapse All' : '📋 Expand All'}
        </Button> */}

        {/* <div className="flex items-center space-x-2">
            <Typography variant="small" color="text-gray-600">
                From:
            </Typography>
            <select
                value={fromFilter}
                onChange={(e) => setFromFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="All">All</option>
            </select>
        </div> */}
    </div>
)
