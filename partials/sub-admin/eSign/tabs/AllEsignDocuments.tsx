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
import { CoordinatorCellInfo } from '../components'
import { IndustryCellInfo } from '@partials/sub-admin/Industries'
import { RTOCellInfo } from '@partials/sub-admin/rto/components'
import Link from 'next/link'

export const AllEsignDocuments = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const allDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `role:${ListingEnum.All}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

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
                <div className="flex flex-col gap-y-0.5">
                    <Typography variant="small" semibold>
                        {info.row.original?.template?.name}
                    </Typography>

                    <div>
                        <Typography
                            variant="badge"
                            color={'text-gray-500'}
                            semibold
                        >
                            Course
                        </Typography>
                        <Typography variant="xs" semibold>
                            {info.row.original?.template?.course?.title}
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            variant="badge"
                            color={'text-gray-500'}
                            semibold
                        >
                            Folder
                        </Typography>
                        <Link
                            href={`/portals/sub-admin/students/223?tab=submissions&course=${info.row.original?.template?.course?.id}&folder=${info.row.original?.template?.folder?.id}`}
                        >
                            <Typography variant="xs" color="text-info" semibold>
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
                return (
                    <div className="flex items-center gap-x-4 gap-y-3">
                        {info.row?.original?.signers?.map((signer: any) => {
                            switch (signer?.user?.role) {
                                case UserRoles.STUDENT:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <StudentCellInfo student={signer} />
                                        </div>
                                    )
                                case UserRoles.RTO:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <RTOCellInfo rto={signer} />
                                        </div>
                                    )
                                case UserRoles.INDUSTRY:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <IndustryCellInfo
                                                industry={signer}
                                            />
                                        </div>
                                    )
                                case UserRoles.SUBADMIN:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <CoordinatorCellInfo
                                                subAdmin={signer}
                                            />
                                        </div>
                                    )
                                default:
                                    return
                            }
                        })}
                    </div>
                )
            },
            header: () => <span>Signers</span>,
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => <Badge text={info.row.original?.status} />,
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
                                    allDocuments?.data?.data as any
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
                    title={'All documents'}
                    subtitle={'List of All Esign Documents'}
                />

                {/* RTO:Documents that needs to be signed by {user}s */}
                {/* Document name, Course, Folder */}

                <Card noPadding>
                    {allDocuments?.isError && <TechnicalError />}
                    {allDocuments?.isLoading || allDocuments?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : allDocuments?.data?.data &&
                      allDocuments?.data?.data.length ? (
                        <Table<any>
                            columns={columns}
                            data={allDocuments?.data?.data}
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
                                                allDocuments?.data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    allDocuments?.data
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
                        allDocuments?.isSuccess && (
                            <EmptyData
                                title={'No All Documents!'}
                                description={'You have not any document yet!'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
