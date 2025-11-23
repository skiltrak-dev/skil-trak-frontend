import { ColumnDef } from '@tanstack/react-table'
import { MapPin, AlertCircle, Ban, Eye, Trash2 } from 'lucide-react'
import {
    Badge,
    InitialAvatar,
    TableAction,
    TableActionOption,
} from '@components'
import { BlacklistedIndustry } from '../../types'

interface ColumnOptions {
    onView: (industry: BlacklistedIndustry) => void
    onUnblock: (industry: BlacklistedIndustry) => void
}

export const createBlacklistedColumns = ({
    onView,
    onUnblock,
}: ColumnOptions): ColumnDef<BlacklistedIndustry>[] => {
    const getReasonBadge = (reason: BlacklistedIndustry['reason']) => {
        switch (reason) {
            case 'Non-compliant':
                return (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-error/10 text-error border border-error/20">
                        <AlertCircle className="h-3 w-3" />
                        <span className="text-xs font-medium">
                            Non-compliant
                        </span>
                    </div>
                )
            case 'Rejected':
                return (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-warning/10 text-warning border border-warning/20">
                        <Ban className="h-3 w-3" />
                        <span className="text-xs font-medium">Rejected</span>
                    </div>
                )
            case 'Blocked':
                return (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-error/10 text-error border border-error/20">
                        <Ban className="h-3 w-3" />
                        <span className="text-xs font-medium">Blocked</span>
                    </div>
                )
        }
    }

    const tableActionOptions = (
        industry: BlacklistedIndustry
    ): TableActionOption<BlacklistedIndustry>[] => [
        {
            text: (
                <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                </div>
            ),
            onClick: () => onView(industry),
        },
        {
            text: (
                <div className="flex items-center gap-2 text-green-600">
                    <Trash2 className="h-4 w-4" />
                    Unblock
                </div>
            ),
            onClick: () => onUnblock(industry),
            color: 'text-green-600',
        },
    ]

    return [
        {
            accessorKey: 'industryName',
            header: () => <span>Industry</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="flex items-center gap-3">
                        <InitialAvatar name={industry.industryName} small />
                        <div>
                            <p className="font-semibold text-sm">
                                {industry.industryName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {industry.abn}
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'location',
            header: () => <span>Location</span>,
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {row.original.location}
                </div>
            ),
        },
        {
            accessorKey: 'reason',
            header: () => <span>Reason</span>,
            cell: ({ row }) => getReasonBadge(row.original.reason),
        },
        {
            accessorKey: 'details',
            header: () => <span>Details</span>,
            cell: ({ row }) => (
                <p className="text-sm text-muted-foreground max-w-xs">
                    {row.original.details}
                </p>
            ),
        },
        {
            accessorKey: 'blockedBy',
            header: () => <span>Blocked By</span>,
            cell: ({ row }) => (
                <p className="text-sm font-medium">{row.original.blockedBy}</p>
            ),
        },
        {
            accessorKey: 'blockedDate',
            header: () => <span>Date</span>,
            cell: ({ row }) => (
                <p className="text-sm text-muted-foreground">
                    {new Date(row.original.blockedDate).toLocaleDateString()}
                </p>
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Actions</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <TableAction
                        options={tableActionOptions(industry)}
                        rowItem={industry}
                    />
                )
            },
        },
    ]
}
