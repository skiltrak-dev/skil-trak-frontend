import {
    ActionButton,
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
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaHandshake } from 'react-icons/fa'

import { AdminApi, commonApi } from '@queries'
import { Industry, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { MdBlock, MdCall } from 'react-icons/md'
// import { IndustryCell, SectorCell } from './components'
// import { BlockModal } from './modals'

// hooks
import { useActionModal } from '@hooks'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FcCancel } from 'react-icons/fc'
import { DoNotDisturbModal } from '../DoNotDisturbModal'
import { IsContactedModal } from '../IsContactedModal'
import { IsPartnerModal } from '../IsPartnerModal'

export const IsContactedIndustries = () => {
    const selectInputRef = useRef()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError } = commonApi.useGetAllFindWorkplacesQuery(
        {
            search: `status:isContacted`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        }
    )

    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onDoNotDisturbClicked = (industry: Industry) => {
        setModal(
            <DoNotDisturbModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onIsContactedClicked = (industry: Industry) => {
        setModal(
            <IsContactedModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onIsPartnerClicked = (industry: Industry) => {
        setModal(
            <IsPartnerModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        // {
        //     text: 'View',
        //     onClick: (industry: any) => {
        //         router.push(
        //             `/portals/admin/industry/${industry.id}?tab=students`
        //         )
        //     },
        //     Icon: FaEye,
        // },
        // {
        //     text: 'Edit',
        //     onClick: (row: any) => {
        //         router.push(`/portals/admin/industry/edit-industry/${row.id}`)
        //     },
        //     Icon: FaEdit,
        // },
        // {
        //     text: 'View Password',
        //     onClick: (industry: Industry) => onViewPassword(industry),
        //     Icon: RiLockPasswordFill,
        // },
        {
            text: 'Is Contacted',
            onClick: (industry: Industry) => onIsContactedClicked(industry),
            Icon: MdCall,
            color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
        },
        {
            text: 'Is Partner',
            onClick: (industry: Industry) => onIsPartnerClicked(industry),
            Icon: FaHandshake,
            color: 'text-orange-500 hover:bg-orange-100 hover:border-orange-200',
        },
        {
            text: 'Do Not Disturb',
            onClick: (industry: Industry) => onDoNotDisturbClicked(industry),
            Icon: MdBlock,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        // {
        //     accessorKey: 'user.name',
        //     cell: (info) => {
        //         return <IndustryCell industry={info.row.original} />
        //     },
        //     header: () => <span>Industry</span>,
        // },
        {
            accessorKey: 'user.name',
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'isContacted',
            header: () => <span>Is Contacted</span>,
            cell: (info) => {
                return (
                    <div>
                        {info.row.original.isContacted === true ? (
                            <div className="flex items-center gap-x-2">
                                <p>Contacted</p>
                                <MdCall className="text-green-500" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-2">
                                <p>Not Contacted</p>
                                <FcCancel />
                            </div>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: 'isPartner',
            header: () => <span>Is Partner</span>,
            cell: (info) => {
                return (
                    <div>
                        {info.row.original.isPartner === true ? (
                            <div className="flex items-center gap-x-2">
                                <p>Partner</p>
                                <FaHandshake className="text-orange-500" />
                            </div>
                        ) : (
                            <p>Not Partner</p>
                        )}
                        {/* <p className="text-xs text-gray-500">
                            {info.row.original.contactPersonNumber}
                        </p> */}
                    </div>
                )
            },
        },
        // {
        //     accessorKey: 'sectors',
        //     header: () => <span>Sectors</span>,
        //     cell: (info) => {
        //         return <SectorCell industry={info.row.original} />
        //     },
        // },
        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info) => (
                <div>
                    <Typography variant={'label'}>
                        {info.row.original?.addressLine1},{' '}
                        {info.row.original?.suburb}
                    </Typography>
                </div>
            ),
        },

        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: Industry) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: Industry[]) => (
            <ActionButton
                onClick={() => {
                    const arrayOfIds = ids.map((id: any) => id?.user.id)
                    bulkAction({ ids: arrayOfIds, status: 'blocked' })
                }}
                Icon={MdBlock}
                variant="error"
            >
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Contacted Industries'}
                    subtitle={'List of Contacted Industries'}
                >
                    {data && data?.data?.length ? (
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    ) : null}
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
                        <Table
                            columns={columns as any}
                            data={data.data}
                            quickActions={quickActionsElements}
                            enableRowSelection
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: any) => (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-6">{table}</div>
                                    {data?.data?.length > 10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Contacted Industry!'}
                                description={
                                    'You have not contacted any Industry request yet'
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
