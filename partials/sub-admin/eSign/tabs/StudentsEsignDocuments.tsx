import {
    ActionButton,
    Badge,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { CommonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import React, { ReactElement, useState } from 'react'
import { ViewSignersCB } from '../contextBar'
import { checkListLength } from '@utils'
import { useRouter } from 'next/router'
import { FaEdit, FaEye } from 'react-icons/fa'
import { CancelInitiateSign } from '@partials/sub-admin/assessmentEvidence/modal'
import { ListingEnum } from '../enums'
import Link from 'next/link'

export const StudentsEsignDocuments = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const studentDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `role:${ListingEnum.STUDENT}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const contextBar = useContextBar()

    const onViewSigners = (signers: any) => {
        contextBar.show()
        contextBar.setTitle('View Signers')
        contextBar.setContent(<ViewSignersCB signers={signers} />)
    }

    const onModalCancel = () => setModal(null)

    const onCancelInitiateSignClicked = (eSign: any) => {
        setModal(<CancelInitiateSign onCancel={onModalCancel} eSign={eSign} />)
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (eSign: any) => {
                router.push(`/portals/sub-admin/e-sign/${eSign?.id}`)
            },
            Icon: FaEye,
        },
        // {
        //     text: 'Edit',
        //     onClick: (eSign: any) => {
        //         // router.push(`/portals/admin/rto/${rto.id}/edit-profile`)
        //     },
        //     Icon: FaEdit,
        // },
        {
            text: 'Cancel',
            onClick: (eSign: any) => {
                onCancelInitiateSignClicked(eSign)
            },
            Icon: FaEdit,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'template.name',
            header: () => <span>Document</span>,
            cell: (info) => (
                <div className="flex flex-col gap-y-1.5">
                    <Typography variant="small" semibold>
                        {info.row.original?.template?.name}
                    </Typography>

                    <div>
                        <Typography
                            variant="xs"
                            color={'text-gray-500'}
                            semibold
                        >
                            Course
                        </Typography>
                        <Typography variant="small" semibold>
                            {info.row.original?.template?.course?.title}
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            variant="xs"
                            color={'text-gray-500'}
                            semibold
                        >
                            Folder
                        </Typography>
                        <Link
                            href={`/portals/sub-admin/students/223?tab=submissions&course=${info.row.original?.template?.course?.id}&folder=${info.row.original?.template?.folder?.id}`}
                        >
                            <Typography
                                variant="small"
                                color="text-info"
                                semibold
                            >
                                {info.row.original?.template?.folder?.name}
                            </Typography>
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'user.name',
            cell: (info) => {
                const student = info.row?.original?.signers?.find(
                    (s: any) => s?.user?.role === UserRoles.STUDENT
                )
                return (
                    <StudentCellInfo
                        student={{
                            ...student?.user?.student,
                            user: student?.user,
                        }}
                    />
                )
            },
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => <Badge text={info.row.original?.status} />,
        },
        {
            accessorKey: 'signers',
            header: () => <span>Signer</span>,
            cell: (info) => (
                <ActionButton
                    onClick={() => {
                        onViewSigners(info.row.original?.signers)
                    }}
                    variant="info"
                >
                    View
                </ActionButton>
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => {
                const signersRoles = row?.original?.signers?.map(
                    (signer: any) => signer?.user?.role
                )
                return (
                    <div className="flex items-center gap-x-2">
                        {signersRoles.includes(UserRoles.SUBADMIN) && (
                            <Button
                                text={
                                    row.original?.status === 'signed'
                                        ? 'View Document'
                                        : 'Sign Document'
                                }
                                onClick={() => {
                                    router.push(
                                        `/portals/sub-admin/e-sign/${row?.original?.id}`
                                    )
                                }}
                            />
                        )}
                        <div className="flex gap-x-1 items-center">
                            <TableAction
                                options={tableActionOptions}
                                rowItem={row.original}
                                lastIndex={checkListLength<any>(
                                    studentDocuments?.data?.data as any
                                )?.includes(row?.index)}
                            />
                        </div>
                    </div>
                )
            },
        },
    ]

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Documents that needs to be signed by Students'}
                    subtitle={'List of All Esign Documents'}
                />

                <Card noPadding>
                    {studentDocuments?.isError && <TechnicalError />}
                    {studentDocuments?.isLoading ||
                    studentDocuments?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : studentDocuments?.data?.data &&
                      studentDocuments?.data?.data.length ? (
                        <Table<any>
                            columns={columns}
                            data={studentDocuments?.data?.data}
                            // quickActions={quickActionsElements}
                            enableRowSelection
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: any) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                studentDocuments?.data?.data
                                                    .length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    studentDocuments?.data
                                                        ?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-6 w-full overflow-x-scroll remove-scrollbar">
                                            {table}
                                        </div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        studentDocuments?.isSuccess && (
                            <EmptyData
                                title={'No Approved RTO!'}
                                description={
                                    'You have not approved any RTO request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
