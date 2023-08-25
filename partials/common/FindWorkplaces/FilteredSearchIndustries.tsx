import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaHandshake } from 'react-icons/fa'

import { useActionModal, useContextBar } from '@hooks'
import { SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { MdBlock, MdCall } from 'react-icons/md'
// import { RtoCell, SectorCell, SubAdminCell } from './components'
// import { AddSubAdminCB, ViewRtosCB, ViewSectorsCB } from './contextBar'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FcCancel } from 'react-icons/fc'

export const FilteredSearchIndustries = ({
    subAdmin,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    subAdmin: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const router = useRouter()

    const contextBar = useContextBar()

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    // const onEditSubAdmin = (subAdmin: SubAdmin) => {
    //     contextBar.setContent(<AddSubAdminCB edit subAdmin={subAdmin} />)
    //     contextBar.setTitle('Edit SubAdmin')
    //     contextBar.show()
    // }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (industry: any) => {
                router.push(
                    `/portals/admin/industry/${industry.id}?tab=students`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (row: any) => {
                router.push(`/portals/admin/industry/edit-industry/${row.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'View Password',
            onClick: (industry: any) => onViewPassword(industry),
            Icon: RiLockPasswordFill,
        },
        // {
        //     text: 'Block',
        //     onClick: (industry: Industry) => onBlockClicked(industry),
        //     Icon: MdBlock,
        //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        // },
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
            accessorKey: 'businessName',
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
        },
        {
            accessorKey: "phone",
            header: () => <span>Phone</span>
        },
        {
            accessorKey: "address",
            header: () => <span>Address</span>
        },
        // {
        //     accessorKey: 'isContacted',
        //     header: () => <span>Is Contacted</span>,
        //     cell: (info) => {
        //         return (
        //             <div>
        //                 {info.row.original.isContacted === true ? (
        //                     <div className="flex items-center gap-x-2">
        //                         <p>Contacted</p>
        //                         <MdCall className="text-green-500" />
        //                     </div>
        //                 ) : (
        //                     <div className="flex items-center gap-x-2">
        //                         <p>Not Contacted</p>
        //                         <FcCancel />
        //                     </div>
        //                 )}
        //             </div>
        //         )
        //     },
        // },
        // {
        //     accessorKey: 'isPartner',
        //     header: () => <span>Is Partner</span>,
        //     cell: (info) => {
        //         return (
        //             <div>
        //                 {info.row.original.isPartner === true ? (
        //                     <div className="flex items-center gap-x-2">
        //                         <p>Partner</p>
        //                         <FaHandshake className="text-orange-500" />
        //                     </div>
        //                 ) : (
        //                     <p>Not Partner</p>
        //                 )}
        //                 {/* <p className="text-xs text-gray-500">
        //                     {info.row.original.contactPersonNumber}
        //                 </p> */}
        //             </div>
        //         )
        //     },
        // },
        // {
        //     accessorKey: 'sectors',
        //     header: () => <span>Sectors</span>,
        //     cell: (info) => {
        //         return <SectorCell industry={info.row.original} />
        //     },
        // },
       

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
        individual: (id: SubAdmin) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdBlock} variant="error">
                    Block
                </ActionButton>
            </div>
        ),
        common: (ids: SubAdmin[]) => (
            <ActionButton Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered Industries'}
                    subtitle={'List of Filtered Industries'}
                />

                <Card noPadding>
                    {subAdmin?.isLoading || subAdmin?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : subAdmin?.data && subAdmin?.data?.data.length ? (
                        <Table
                            columns={columns as any}
                            data={subAdmin?.data.data}
                            quickActions={quickActionsElements}
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
                                                setItemPerPage
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    subAdmin?.data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-6">{table}</div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        <>
                            {/* <div className="flex justify-center mt-4 mb-24">
                                <Button
                                    text="Click here to add industry"
                                    variant="primary"
                                    onClick={() =>
                                        router.push(
                                            '/portals/admin/add-industry'
                                        )
                                    }
                                />
                            </div> */}
                            <EmptyData
                                title={'No Industry in your Search!'}
                                description={'No Industry in your Search yet'}
                                height={'50vh'}
                            />
                        </>
                    )}
                </Card>
            </div>
        </>
    )
}
