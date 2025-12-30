import { Badge, InitialAvatar, TableAction, TableActionOption } from '@components'
import { Progressbar } from '@partials/rto-v2/components/Progressbar'
import { ColumnDef } from '@tanstack/react-table'
import { CheckCircle, CheckCircle2, Eye, Heart, Mail, MapPin, Phone, XCircle } from 'lucide-react'
import { ReactElement, useState } from 'react'
import { PendingIndustryFull } from '../../types'

type ActionKey = 'view' | 'approveCourses'

type ColumnKey =
    | 'name'
    | 'location'
    | 'profileCompletion'
    | 'courses'
    | 'status'
    | 'compliance'
    | 'contact'
    | 'action'

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
    columns: ColumnDef<PendingIndustryFull>[]
    actions: TableActionOption<PendingIndustryFull>[]
}

export const usePendingIndustriesColumns = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onModalCancelClicked = (): void => {
        setModal(null)
    }

    // All available columns definition
    const allColumns: ColumnDef<PendingIndustryFull>[] = [
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
                            {industry.courses?.length || 0} course(s)
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {industry.courses?.filter((c) => c.approved).length || 0}{' '}
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
            accessorKey: 'compliance',
            header: () => <span>Compliance</span>,
            cell: ({ row }) => {
                const industry = row.original
                return (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1.5" title="WHS Documents">
                                {industry.insuranceDocsAdded ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-success" />
                                ) : (
                                    <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                                <span>WHS</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Child Safety">
                                {industry.requiredChecksMarked ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-success" />
                                ) : (
                                    <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                                <span>Checks</span>
                            </div>
                            <div className="flex items-center gap-1.5" title="Supervisor">
                                {industry.supervisorsAdded > 0 ? (
                                    <CheckCircle className="h-3.5 w-3.5 text-success" />
                                ) : (
                                    <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                                <span>Supervisors</span>
                            </div>
                        </div>
                        <Progressbar
                            value={
                                (((industry.insuranceDocsAdded ? 1 : 0) +
                                    (industry.requiredChecksMarked ? 1 : 0) +
                                    (industry.supervisorsAdded > 0 ? 1 : 0)) /
                                    3) *
                                100
                            }
                            max={100}
                            size="xs"
                            variant="primary"
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
    ]

    const getAllOptionalActions = (
        industry: PendingIndustryFull,
        onView?: (industry: PendingIndustryFull) => void,
        onApproveCourses?: (industry: PendingIndustryFull) => void
    ): Record<ActionKey, TableActionOption<PendingIndustryFull>> => ({
        view: {
            text: (
                <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                </div>
            ),
            onClick: () => onView?.(industry),
        },
        approveCourses: {
            text: (
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Approve Courses
                </div>
            ),
            onClick: () => onApproveCourses?.(industry),
        },
    })

    const getTableConfig = <T extends GetTableConfigOptions>(
        callbacks: {
            onView?: (industry: PendingIndustryFull) => void
            onApproveCourses?: (industry: PendingIndustryFull) => void
        },
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

        let columns: ColumnDef<PendingIndustryFull>[] = allColumns

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
            industry: PendingIndustryFull
        ): TableActionOption<PendingIndustryFull>[] => {
            const allOptionalActions = getAllOptionalActions(
                industry,
                callbacks.onView,
                callbacks.onApproveCourses
            )
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
            actions: [],
        }
    }

    return {
        modal,
        onModalCancelClicked,
        columns: allColumns,
        getTableConfig,
    }
}
