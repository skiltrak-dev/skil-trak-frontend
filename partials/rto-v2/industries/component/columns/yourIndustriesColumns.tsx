import {
    Badge,
    Button,
    InitialAvatar,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@components/ui/tooltip'
import { ColumnDef } from '@tanstack/react-table'
import { Industry, User, UserStatus } from '@types'
import {
    AlertCircle,
    Building2,
    CheckCircle2,
    Clock,
    Edit,
    Eye,
    Globe,
    Heart,
    Mail,
    MapPin,
    MoreVertical,
    Phone,
    Send,
    Trash2,
    Users,
    XCircle,
} from 'lucide-react'
import { useNotification } from 'hooks/useNotification'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { IntrustedType } from '../IntrustedType'
import { Progressbar } from '@partials/rto-v2/components/Progressbar'
import { PendingIndustryFull } from '../../types'
import { ComposeEmailModal } from '@partials/rto-v2/student-detail/components/Communications/modal/ComposeEmailModal'

type ActionKey = 'view' | 'edit' | 'delete' | 'approveCourses' | 'sendReminder'

type ColumnKey =
    | 'name'
    | 'sector'
    | 'location'
    | 'status'
    | 'contact'
    | 'interestedType'
    | 'profileCompletion'
    | 'courses'
    | 'compliance'
    | 'action'
    | 'workplaceType'
    | 'contactPerson'
    | 'enrolledStudents'
    | 'placementReady'

interface GetTableConfigOptions {
    columnKeys?: ColumnKey[]
    actionKeys?: ActionKey[]
    removeColumnKeys?: ColumnKey[]
}

type ValidateTableConfigOptions<T extends GetTableConfigOptions> = T extends {
    columnKeys: ColumnKey[]
    removeColumnKeys: ColumnKey[]
}
    ? never
    : T

interface TableConfig {
    columns: ColumnDef<Industry>[]
    actions: TableActionOption<Industry>[]
}

export const useYourIndustriesColumns = () => {
    const router = useRouter()
    const { notification } = useNotification()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onModalCancelClicked = (): void => {
        setModal(null)
    }

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
            default:
                return null
        }
    }

    // All available columns definition
    const allColumns: ColumnDef<Industry>[] = [
        {
            accessorKey: 'name',
            header: () => <span>Industry</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="flex items-center gap-x-2 max-w-72">
                        <div className="h-10 w-10 rounded-lg bg-primaryNew flex items-center justify-center text-white flex-shrink-0 shadow-premium hover:scale-110 transition-transform">
                            <Building2 className="h-5 w-5" />
                        </div>

                        {/* Industry Name & Favorite */}
                        <div className="flex flex-col gap-1 min-w-[200px]">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold truncate">
                                    {industry?.user?.name}
                                </h3>
                            </div>
                            <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground text-gray-600">
                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                <span className="truncate">
                                    {industry?.addressLine1}
                                </span>
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'workplaceType',
            header: () => <span>Workplace Type</span>,
            cell: ({ row }) => {
                console.log({ row })
                return row.original?.workplaceType?.name ? (
                    <Badge
                        text={row.original?.workplaceType?.name}
                        variant="primaryNew"
                        outline
                    />
                ) : (
                    <Typography>---</Typography>
                )
            },
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: ({ row }) => {
                const industry = row.original
                return industry.contactPerson ? (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-[150px]">
                        <div className="h-8 w-8 rounded-full bg-primaryNew/30 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primaryNew" />
                        </div>
                        <div className="flex flex-col">
                            <span className="truncate font-medium">
                                {industry.contactPerson}
                            </span>
                        </div>
                    </div>
                ) : (
                    <Typography>---</Typography>
                )
            },
        },
        {
            accessorKey: 'interestedType',
            header: () => <span>Interest Status</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <IntrustedType
                        industryId={Number(industry?.id)}
                        initialValue={industry?.isInterested}
                    />
                )
            },
        },
        {
            accessorKey: 'enrolledStudents',
            header: () => <span>Enrolled Students</span>,
            cell: ({ row }) => {
                const industrySectorCapacity =
                    row.original.industrySectorCapacity || []

                const totalCapacity = industrySectorCapacity.reduce(
                    (acc: number, curr: any) => acc + Number(curr.capacity || 0),
                    0
                )
                const totalEnrolled = industrySectorCapacity.reduce(
                    (acc: number, curr: any) => acc + Number(curr.enrolled || 0),
                    0
                )

                return (
                    <div className="flex items-center gap-2.5 min-w-[80px]">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/60 border border-secondary/20">
                            <Users className="h-4 w-4" />
                            <p className="text-sm">
                                {totalEnrolled}
                                <span className="text-muted-foreground">
                                    /{totalCapacity}
                                </span>
                            </p>
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'placementReady',
            header: () => <span>Placement Ready</span>,
            cell: ({ row }) => {
                const industry = row.original

                const isCourseApproved = (
                    industry?.industryCourseApprovals || []
                )?.some((approval: any) => approval?.status === 'approved')

                const hasCapacity = industry?.totalCapacity > 0

                const hasWorkplaceType = !!industry?.workplaceType?.name

                const isPlacementReady =
                    isCourseApproved && hasCapacity && hasWorkplaceType

                return (
                    <div className="whitespace-pre">
                        <Badge
                            text={isPlacementReady ? 'Ready' : 'Not Ready'}
                            variant={isPlacementReady ? 'primaryNew' : 'error'}
                            Icon={isPlacementReady ? CheckCircle2 : AlertCircle}
                            outline
                        />
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
                    <div className="flex items-center gap-1 mr-2">
                        {industry?.user?.email && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="primaryNew"
                                            outline
                                            mini
                                            Icon={Mail}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setModal(
                                                    <ComposeEmailModal
                                                        user={industry?.user}
                                                        onCancel={
                                                            onModalCancelClicked
                                                        }
                                                    />
                                                )
                                            }}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>Send Email</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        {industry?.phoneNumber && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="primaryNew"
                                            outline
                                            mini
                                            Icon={Phone}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                window.location.href = `tel:${industry?.phoneNumber}`
                                            }}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>Make Call</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                )
            },
        },

        {
            accessorKey: 'profileCompletion',
            header: () => <span>Profile Completion</span>,
            cell: ({ row }) => {
                const industry = row.original
                const profileCompletion =
                    industry.profileCompletionPercentage || 0
                return (
                    <div className="space-y-1 min-w-[100px]">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold">
                                {profileCompletion}%
                            </span>
                        </div>
                        <Progressbar
                            variant={
                                Number(profileCompletion) >= 80
                                    ? 'success'
                                    : Number(profileCompletion) >= 50
                                        ? 'primary'
                                        : 'error'
                            }
                            value={Number(profileCompletion)}
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
                const courses = industry.courses || []
                return (
                    <div className="space-y-1">
                        <p className="text-xs font-semibold">
                            {courses.length} course(s)
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {courses.filter((c: any) => c.approved).length}{' '}
                            approved
                        </p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'compliance',
            header: () => <span>Compliance</span>,
            cell: ({ row }) => {
                const industry = row.original
                const addressUpdated = industry.isAddressUpdated
                const childSafetyCompleted = industry.isRtoAssociated
                const supervisorVerified = industry.isRtoAssociated

                const progress =
                    ((addressUpdated ? 1 : 0) +
                        (childSafetyCompleted ? 1 : 0) +
                        (supervisorVerified ? 1 : 0)) /
                    3

                return (
                    <div className="flex flex-col gap-1.5 min-w-[200px]">
                        <div className="flex items-center gap-3 text-[10px] whitespace-nowrap">
                            <div
                                className="flex items-center gap-1"
                                title="WHS Documents"
                            >
                                {addressUpdated ? (
                                    <CheckCircle2 className="h-3 w-3 text-success" />
                                ) : (
                                    <XCircle className="h-3 w-3 text-muted-foreground" />
                                )}
                                <span>WHS Docs</span>
                            </div>
                            <div
                                className="flex items-center gap-1"
                                title="Child Safety"
                            >
                                {childSafetyCompleted ? (
                                    <CheckCircle2 className="h-3 w-3 text-success" />
                                ) : (
                                    <XCircle className="h-3 w-3 text-muted-foreground" />
                                )}
                                <span>Child Safety</span>
                            </div>
                            <div
                                className="flex items-center gap-1"
                                title="Supervisor"
                            >
                                {supervisorVerified ? (
                                    <CheckCircle2 className="h-3 w-3 text-success" />
                                ) : (
                                    <XCircle className="h-3 w-3 text-muted-foreground" />
                                )}
                                <span>Supervisor</span>
                            </div>
                        </div>
                        <Progressbar
                            value={progress * 100}
                            max={100}
                            size="xs"
                            variant="primary"
                            className="h-1.5"
                        />
                    </div>
                )
            },
        },
    ]

    const getAllOptionalActions = (
        industry: any
    ): Record<ActionKey, TableActionOption<any>> => ({
        view: {
            text: 'View Details',
            Icon: Eye,
            onClick: () => {
                router.push(
                    `/portals/rto/manage/industries/${industry.id}/detail`
                )
            },
        },
        edit: {
            text: 'Edit',
            Icon: Edit,
            onClick: () => { },
        },
        delete: {
            text: 'Delete',
            Icon: Trash2,
            onClick: () => { },
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
        approveCourses: {
            text: 'Approve Courses',
            Icon: CheckCircle2,
            onClick: () => { },
        },
        sendReminder: {
            text: (
                <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-primary" />
                    <span>Send Reminder</span>
                </div>
            ),
            onClick: () =>
                notification.success({
                    title: 'Reminder Sent',
                    description: 'Reminder email sent to complete setup',
                }),
        },
    })

    const getTableConfig = <T extends GetTableConfigOptions>(
        options?: ValidateTableConfigOptions<T>
    ): TableConfig => {
        const { columnKeys, removeColumnKeys, actionKeys } = options || {}

        if (
            columnKeys &&
            columnKeys.length > 0 &&
            removeColumnKeys &&
            removeColumnKeys.length > 0
        ) {
            throw new Error(
                'Cannot use both columnKeys and removeColumnKeys at the same time. Use only one.'
            )
        }

        let columns: ColumnDef<Industry>[] = allColumns

        if (columnKeys && columnKeys.length > 0) {
            columns = allColumns.filter((column) => {
                const accessorKey =
                    'accessorKey' in column ? column.accessorKey : null
                return (
                    accessorKey && columnKeys.includes(accessorKey as ColumnKey)
                )
            })
        } else if (removeColumnKeys && removeColumnKeys.length > 0) {
            columns = allColumns.filter((column) => {
                const accessorKey =
                    'accessorKey' in column ? column.accessorKey : null
                return (
                    accessorKey &&
                    !removeColumnKeys.includes(accessorKey as ColumnKey)
                )
            })
        }

        const getActionsForIndustry = (
            industry: any
        ): TableActionOption<any>[] => {
            const allOptionalActions = getAllOptionalActions(industry)
            if (actionKeys && actionKeys.length > 0) {
                return actionKeys
                    .filter((key) => allOptionalActions[key])
                    .map((key) => allOptionalActions[key])
            }
            return Object.values(allOptionalActions)
        }

        if (
            columns.findIndex((col: any) => col?.accessorKey === 'action') ===
            -1
        ) {
            columns.push({
                accessorKey: 'action',
                header: () => <span>Action</span>,
                cell: (info) => {
                    const combinedActions = getActionsForIndustry(
                        info.row.original
                    )

                    return (
                        <div className="flex gap-x-1 items-center">
                            <TableAction
                                options={combinedActions}
                                rowItem={info.row.original}
                            />
                        </div>
                    )
                },
            })
        }

        return {
            columns,
            actions: [], // actions are typically row-specific in this pattern
        }
    }

    return {
        modal,
        onModalCancelClicked,
        columns: allColumns,
        getTableConfig,
    }
}
