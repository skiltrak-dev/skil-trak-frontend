'use client'

import {
    ActionButton,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { AppointmentAchievments, KpiTarget } from '@types'
import { debounce } from 'lodash'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { MdVerified } from 'react-icons/md'
import { PiUsersBold } from 'react-icons/pi'
import { CircularProgress } from '../Common/CircularProgress'
import { MetricsHeader } from '../Common/MetricsHeader'
import { SerialNumber } from '../Common/SerialNumber'
import { DataTable } from '../Table'
import Link from 'next/link'

interface MetricsConfig {
    accessorKey: string
    label:
        | 'Appointment'
        | 'Workplace request'
        | 'Completed'
        | 'Agreement by student'
        | 'Agreement by workplace'
    targetKey: string
    dbKey: string
    achievementKey: keyof AppointmentAchievments
}

export const EmployeeTableColumns = ({
    startDate,
    endDate,
}: {
    startDate?: Moment | null
    endDate?: Moment | null
}) => {
    const [itemsPerPage, setItemsPerPage] = useState<number>(20)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchQueryDebounced, setSearchQueryDebounced] = useState<string>('')

    const router = useRouter()

    const employeeData = AdminApi.Kpi.subadminReportList(
        {
            search: `name:${searchQueryDebounced},startDate:${moment(
                startDate
            ).format('YYYY-MM-DD')},endDate:${moment(endDate).format(
                'YYYY-MM-DD'
            )}`,
            skip: itemsPerPage * currentPage - itemsPerPage,
            limit: itemsPerPage,
        },
        { refetchOnMountOrArgChange: 30, skip: !startDate || !endDate }
    )
    const itemsList = AdminApi.Kpi.kpiTypes()

    const metricsConfigurations: MetricsConfig[] = [
        {
            accessorKey: 'appointmentMetrics',
            label: 'Appointment',
            targetKey: 'appointments',
            dbKey: 'appointment',
            achievementKey: 'appointments',
        },
        {
            accessorKey: 'workplaceMetrics',
            label: 'Workplace request',
            targetKey: 'workplaceRequests',
            dbKey: 'workplaceRequest',
            achievementKey: 'workplaceRequests',
        },
        {
            accessorKey: 'completedMetrics',
            label: 'Completed',
            targetKey: 'completed',
            dbKey: 'completed',
            achievementKey: 'completed',
        },
        {
            accessorKey: 'studentAgreementMetrics',
            label: 'Agreement by student',
            targetKey: 'AgreementByStudent',
            dbKey: 'agreementByStudent',
            achievementKey: 'agreementByStudent',
        },
        {
            accessorKey: 'workplaceAgreementMetrics',
            label: 'Agreement by workplace',
            targetKey: 'AgreementByWorkplace',
            dbKey: 'AgreementByWorkplace',
            achievementKey: 'agreementByWorkplace',
        },
    ]

    const itemsAdded = itemsList?.data?.map((item: any) => item?.name)

    const metricsColumns: ColumnDef<KpiTarget>[] = metricsConfigurations
        ?.filter((item) => itemsAdded?.includes(item?.dbKey))
        .map((metric) => ({
            accessorKey: metric.accessorKey,
            header: () => <MetricsHeader keyData={metric.label} />,
            cell: ({ row }) => {
                const targetValue =
                    row?.original?.user?.targets?.[
                        metric.targetKey as keyof typeof row.original.user.targets
                    ] || 0
                return (
                    <span className="text-red-500 text-[12px] rounded block mx-auto">
                        {targetValue > 0
                            ? row?.original?.user?.[metric?.achievementKey]
                            : '-'}
                        /{targetValue > 0 ? targetValue : '-'}
                    </span>
                )
            },
            enableSorting: false,
        }))

    const columns: ColumnDef<KpiTarget>[] = [
        {
            accessorKey: 'id',
            header: 'S.No',
            cell: (info) => (
                <SerialNumber
                    row={info?.row}
                    pagination={employeeData?.data?.pagination}
                />
            ),
            enableSorting: false,
        },
        {
            accessorKey: 'name',
            header: 'Employee',
            enableSorting: false,
            cell: ({ row }) => (
                <Link
                    href={`/portals/admin/kpis-progress/${row?.original?.id}`}
                    className="flex gap-2"
                >
                    <InitialAvatar
                        name={row.original?.user?.name}
                        imageUrl={row.original?.user?.avatar}
                    />
                    <div>
                        <div className="font-medium text-sm">
                            {row.original?.user?.name}
                        </div>
                        <div className="text-xs text-gray-500">
                            {row.original?.user?.email}
                        </div>
                    </div>
                </Link>
            ),
        },
        {
            accessorKey: 'department',
            header: 'Department',
            cell: ({ row }) => (
                <span className="text-xs">
                    {row.original?.departmentMember?.department?.name || '---'}
                </span>
            ),
            enableSorting: false,
        },
        {
            accessorKey: 'kpiScore',
            header: 'KPI',
            cell: ({ row }) => (
                <CircularProgress
                    value={Math.round(row?.original?.user?.progress || 0)}
                />
            ),
            enableSorting: false,
        },
        ...metricsColumns,
        {
            accessorKey: 'departmentMember.subadmin.assignStudents',
            header: 'Assigned Students',
            cell: ({ row }) => (

                <div className="flex items-center justify-center">
                    <Typography variant="label" medium color="text-gray-500">
                        {
                            row?.original?.departmentMember.subadmin
                                .assignStudents
                        }
                    </Typography>
                </div>
            ),
            enableSorting: false,
        },
        {
            accessorKey: 'verified',
            header: 'Verified by HOD',
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <MdVerified
                        className={`text-lg ${
                            row.original?.verified
                                ? 'text-[#096DFF]'
                                : 'text-[#9A9A9A]'
                        }`}
                    />
                </div>
            ),
            enableSorting: false,
        },

        {
            accessorKey: 'id',
            id: 'actions',
            header: '',
            cell: ({ row }) => (
                <div className="border border-[#1436B0] rounded-md">
                    <ActionButton
                        Icon={() => <FiEye className="text-[#1436B0]" />}
                        onClick={() =>
                            router.push(
                                `/portals/admin/kpis-progress/${row?.original?.id}`
                            )
                        }
                    />
                </div>
            ),
            enableSorting: false,
        },
    ]

    const onSearchDebouncedQuery = useCallback(
        debounce((value: string) => setSearchQueryDebounced(value), 700),
        []
    )

    const onSearchQuery = useCallback(
        (value: string) => setSearchQuery(value),
        []
    )

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1)
    }

    return (
        <div>
            {employeeData.isError && <TechnicalError />}
            {employeeData?.isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : (
                employeeData?.isSuccess && (
                    <DataTable
                        data={employeeData?.data?.data}
                        columns={columns}
                    >
                        {({ header, pagination, table }: any) => {
                            return (
                                <Card>
                                    <div>
                                        {header(
                                            'Subadmin',
                                            <PiUsersBold className="text-base text-[#1436B0]" />,
                                            true,
                                            'Search employee',
                                            (value: string) => {
                                                onSearchQuery(value)
                                                onSearchDebouncedQuery(value)
                                            },
                                            searchQuery
                                        )}
                                    </div>
                                    {employeeData?.isFetching ? (
                                        <LoadingAnimation />
                                    ) : employeeData?.data?.data &&
                                      employeeData?.data?.data?.length > 0 ? (
                                        <>
                                            {pagination(
                                                employeeData?.data?.pagination,
                                                setCurrentPage,
                                                handleItemsPerPageChange
                                            )}
                                            {table}
                                        </>
                                    ) : (
                                        employeeData?.isSuccess && (
                                            <EmptyData
                                                title="No Employees"
                                                description="No employees have been approved yet."
                                                height="50vh"
                                            />
                                        )
                                    )}
                                </Card>
                            )
                        }}
                    </DataTable>
                )
            )}
        </div>
    )
}
