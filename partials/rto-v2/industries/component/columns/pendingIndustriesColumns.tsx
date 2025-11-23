import { ColumnDef } from '@tanstack/react-table'
import { MapPin, Mail, Phone, Eye, CheckCircle2, Heart } from 'lucide-react'
import { Badge, InitialAvatar, TableAction, TableActionOption } from '@components'
import { Progressbar } from '@partials/rto-v2/components/Progressbar'
import { PendingIndustryFull } from '../../types'

interface ColumnOptions {
    onView: (industry: PendingIndustryFull) => void
    onApproveCourses: (industry: PendingIndustryFull) => void
}

export const createPendingIndustriesColumns = ({
    onView,
    onApproveCourses,
}: ColumnOptions): ColumnDef<PendingIndustryFull>[] => {
    const tableActionOptions = (
        industry: PendingIndustryFull
    ): TableActionOption<PendingIndustryFull>[] => [
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
                    <CheckCircle2 className="h-4 w-4" />
                    Approve Courses
                </div>
            ),
            onClick: () => onApproveCourses(industry),
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
                        {industry.isFavourite && (
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        )}
                        <InitialAvatar name={industry.name} small />
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
            accessorKey: 'profileCompletion',
            header: () => <span>Profile Completion</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="space-y-1 min-w-[100px]">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold">
                                {industry.profileCompletion}%
                            </span>
                        </div>
                        <Progressbar
                            variant={
                                industry.profileCompletion >= 80
                                    ? 'success'
                                    : industry.profileCompletion >= 50
                                    ? 'primary'
                                    : 'error'
                            }
                            value={industry.profileCompletion}
                            max={100}
                            size="xs"
                        />
                    </div>
                )
            },
        },
        {
            accessorKey: 'courses',
            header: () => <span>Courses</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="space-y-1">
                        <p className="text-xs font-semibold">
                            {industry.courses.length} course(s)
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {industry.courses.filter((c) => c.approved).length}{' '}
                            approved
                        </p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="flex flex-col gap-1">
                        {industry.emailVerified && (
                            <Badge
                                variant="success"
                                text="Email Verified"
                                className="text-xs"
                            />
                        )}
                        {industry.registrationComplete && (
                            <Badge
                                variant="info"
                                text="Registered"
                                className="text-xs"
                            />
                        )}
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

