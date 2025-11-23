import { ColumnDef } from '@tanstack/react-table'
import {
    MapPin,
    Mail,
    Phone,
    CheckCircle2,
    Clock,
    XCircle,
    Globe,
    Eye,
    Edit,
    Trash2,
} from 'lucide-react'
import { Badge, InitialAvatar, TableAction, TableActionOption } from '@components'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { Progressbar } from '@partials/rto-v2/components/Progressbar'
import { Industry } from '../../types'

interface ColumnOptions {
    getTotalCapacity: (industry: Industry) => number
    getTotalPlacements: (industry: Industry) => number
    getAvailablePositions: (industry: Industry) => number
    onView: (industry: Industry) => void
    onEdit: (industry: Industry) => void
    onDelete: (industry: Industry) => void
}

export const createYourIndustriesColumns = ({
    getTotalCapacity,
    getTotalPlacements,
    getAvailablePositions,
    onView,
    onEdit,
    onDelete,
}: ColumnOptions): ColumnDef<Industry>[] => {
    const getStatusBadge = (status: Industry['status']) => {
        switch (status) {
            case 'verified':
                return (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 text-success border border-success/20">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="text-xs font-medium">Verified</span>
                    </div>
                )
            case 'pending':
                return (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-warning/10 text-warning border border-warning/20">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs font-medium">Pending</span>
                    </div>
                )
            case 'inactive':
                return (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border">
                        <XCircle className="h-3 w-3" />
                        <span className="text-xs font-medium">Inactive</span>
                    </div>
                )
        }
    }

    const tableActionOptions = (
        industry: Industry
    ): TableActionOption<Industry>[] => [
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
                <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                </div>
            ),
            onClick: () => onEdit(industry),
        },
        {
            text: (
                <div className="flex items-center gap-2 text-red-600">
                    <Trash2 className="h-4 w-4" />
                    Delete
                </div>
            ),
            onClick: () => onDelete(industry),
            color: 'text-red-600',
        },
    ]

    return [
        {
            accessorKey: 'name',
            header: () => <span>Industry</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {industry.isGlobal && (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-md z-10">
                                            <Globe className="h-3 w-3 text-white" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>SkilTrak Global Directory</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                            <InitialAvatar name={industry.name} small />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">
                                {industry.name}
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
            accessorKey: 'sector',
            header: () => <span>Sector</span>,
            cell: ({ row }) => <Badge text={row.original.sector} />,
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
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: ({ row }) => getStatusBadge(row.original.status),
        },
        {
            accessorKey: 'capacity',
            header: () => <span>Capacity</span>,
            cell: ({ row }) => {
                const industry = row.original
                const totalCapacity = getTotalCapacity(industry)
                const totalPlacements = getTotalPlacements(industry)
                const availablePositions = getAvailablePositions(industry)

                return (
                    <div className="space-y-1 min-w-[120px]">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                                {totalPlacements}/{totalCapacity}
                            </span>
                            <span className="font-semibold text-success">
                                {availablePositions} available
                            </span>
                        </div>
                        <Progressbar
                            variant="success"
                            value={totalPlacements}
                            max={totalCapacity}
                            size="xs"
                        />
                    </div>
                )
            },
        },
        {
            accessorKey: 'performance',
            header: () => <span>Performance</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="text-xs font-semibold">
                                    {industry.complianceScore}%
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Compliance Score</p>
                            </TooltipContent>
                        </Tooltip>
                        <div className="flex items-center gap-0.5 text-xs">
                            <span>⭐</span>
                            <span className="font-semibold">
                                {industry.rating}
                            </span>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'contact',
            header: () => <span>Contact</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="flex flex-col gap-1 text-xs">
                        <div className="flex items-center gap-1.5">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">
                                {industry.contactEmail}
                            </span>
                        </div>
                        {industry.contactPhone && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{industry.contactPhone}</span>
                            </div>
                        )}
                    </div>
                )
            },
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

