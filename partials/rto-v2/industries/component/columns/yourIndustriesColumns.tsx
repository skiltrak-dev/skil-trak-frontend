import {
    Badge,
    InitialAvatar,
    TableAction,
    TableActionOption,
} from '@components'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { ColumnDef } from '@tanstack/react-table'
import { Industry, User, UserStatus } from '@types'
import {
    CheckCircle2,
    Clock,
    Edit,
    Eye,
    Globe,
    Mail,
    MapPin,
    Phone,
    Trash2,
    XCircle,
} from 'lucide-react'
import { useRouter } from 'next/router'

export const createYourIndustriesColumns = (): ColumnDef<Industry>[] => {
    const router = useRouter()

    const getStatusBadge = (status: User['status']) => {
        switch (status) {
            case UserStatus.Approved:
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
            case UserStatus.Archived:
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
            onClick: () => {},
        },
        {
            text: (
                <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                </div>
            ),
            onClick: () => {},
        },
        {
            text: (
                <div className="flex items-center gap-2 text-red-600">
                    <Trash2 className="h-4 w-4" />
                    Delete
                </div>
            ),
            onClick: () => {},
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
                            <InitialAvatar name={industry?.user?.name} small />
                        </div>
                        <div
                            onClick={() => {
                                router.push(
                                    `/portals/rto/manage/industries/${industry.id}/detail`
                                )
                            }}
                            className="cursor-pointer"
                        >
                            <p className="font-semibold text-sm">
                                {industry?.user?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {industry?.abn}
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sector</span>,
            cell: ({ row }) => (
                <Badge
                    text={row.original?.courses
                        ?.map((course) => course?.name)
                        .join(', ')}
                />
            ),
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
            cell: ({ row }) => getStatusBadge(row.original?.user?.status),
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
                                {industry?.user?.email}
                            </span>
                        </div>
                        {industry?.phoneNumber && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{industry?.phoneNumber}</span>
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
