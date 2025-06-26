import {
    Button,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    Table,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'

import {
    IndustryCell,
    SectorCell,
    StudentCellInfo,
} from '@partials/rto/student/components'
import { RtoApi, useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { getUserCredentials, studentsListWorkplace } from '@utils'
import { saveAs } from 'file-saver'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const RtoDashboardStudents = () => {
    const router = useRouter()
    const [isExcelDownload, setIsExcelDownload] = useState<boolean>(false)
    const userId = getUserCredentials()?.id

    const exportList = RtoApi.Students.useExportStudentList(
        {
            status: `active`,
            userId,
        },
        { skip: !isExcelDownload }
    )

    const { isLoading, data, isError } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Approved}`,
        skip: 0,
        limit: 5,
    })

    // Download excel
    useEffect(() => {
        if (exportList?.data?.file?.data && exportList?.isSuccess) {
            const buffer = Buffer.from(exportList.data.file.data)
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            })
            saveAs(blob)
            setIsExcelDownload(false)
        }
    }, [exportList?.data, exportList?.isSuccess])

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <StudentCellInfo student={info.row.original} call />
            ),
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info: any) => {
                const industry = info.row.original?.industries

                const appliedIndustry = studentsListWorkplace(
                    info.row.original?.workplace
                )

                return industry && industry?.length > 0 ? (
                    <IndustryCell industry={industry[0]} />
                ) : info.row.original?.workplace &&
                  info.row.original?.workplace?.length > 0 &&
                  appliedIndustry ? (
                    <IndustryCell industry={appliedIndustry} />
                ) : (
                    <Typography center>N/A</Typography>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return <SectorCell student={info.row.original} />
            },
        },
        {
            accessorKey: 'expiry',
            header: () => <span>Expiry Countdown</span>,
            cell: (info) => (
                <StudentExpiryDaysLeft
                    expiryDate={info.row.original?.expiryDate}
                />
            ),
        },
        {
            accessorKey: 'progress',
            header: () => <span>Progress</span>,
            cell: ({ row }) => (
                <CaseOfficerAssignedStudent student={row.original} />
            ),
        },
        {
            accessorKey: 'assigned',
            header: () => <span>Assigned Coordinator</span>,
            cell: ({ row }: any) =>
                row.original?.rtoCoordinator ? (
                    <div>
                        <Typography variant="label">
                            {row.original?.rtoCoordinator?.user?.name}
                        </Typography>
                        <Typography variant="small" color={'text-gray-400'}>
                            {row.original?.rtoCoordinator?.user?.email}
                        </Typography>
                        <Typography variant="small" color={'text-gray-400'}>
                            {row.original?.rtoCoordinator?.phone}
                        </Typography>
                    </div>
                ) : (
                    '----'
                ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }: any) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
    ]

    return (
        <>
            <Card fullHeight shadowType="profile" noPadding>
                <div className="px-4 py-3 flex justify-between items-center border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Active Students</span>
                    </Typography>
                </div>
                <div className="relative">
                    <div
                        className={
                            'group flex justify-center absolute top-0 left-0 w-full h-full z-20 bg-gradient-black-to-white'
                        }
                    >
                        <div
                            className={
                                'transition-all mt-9 hidden group-hover:block'
                            }
                        >
                            <Button
                                text={'View All Students'}
                                onClick={() => {
                                    router.push(
                                        `/portals/rto/students?tab=active`
                                    )
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div>
                            {isError && <TechnicalError />}
                            {isLoading ? (
                                <LoadingAnimation height="h-[60vh]" />
                            ) : data && data?.data.length ? (
                                <Table columns={columns} data={data.data}>
                                    {({ table, pagination, pageSize }: any) => {
                                        return (
                                            <div className="px-6 overflow-auto custom-scrollbar">
                                                {table}
                                            </div>
                                        )
                                    }}
                                </Table>
                            ) : (
                                !isError && (
                                    <EmptyData
                                        title={'No Approved Student!'}
                                        description={
                                            'You have not approved any Student request yet'
                                        }
                                        height={'50vh'}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
