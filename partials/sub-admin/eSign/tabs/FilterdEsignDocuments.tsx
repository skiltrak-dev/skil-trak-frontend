import {
    Badge,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    SessionExpireModal,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { EsignDocumentStatus, checkListLength } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaEdit, FaEye } from 'react-icons/fa'
import { EsignAction, ListingDocumentsTab, SignersView } from '../components'
import { CancelInitiateSign } from '@partials/sub-admin/assessmentEvidence/modal'
import { ReactElement, useState } from 'react'

export const FilterdEsignDocuments = ({
    setPage,
    itemPerPage,
    eSign,
    setItemPerPage,
}: {
    setPage: any
    itemPerPage: any
    eSign: any
    setItemPerPage: any
}) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onModalCancel = () => setModal(null)

    const onCancelInitiateSignClicked = (eSign: any) => {
        setModal(<CancelInitiateSign onCancel={onModalCancel} eSign={eSign} />)
    }

    const tableActionOptions = (rowData: any) => [
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
            ...([
                EsignDocumentStatus.ReSign,
                EsignDocumentStatus.PENDING,
            ].includes(rowData?.status)
                ? {
                      text: 'Cancel',
                      onClick: (eSign: any) => {
                          onCancelInitiateSignClicked(eSign)
                      },
                      Icon: FaEdit,
                  }
                : null),
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'template.name',
            header: () => <span>Document</span>,
            cell: (info) => (
                <ListingDocumentsTab
                    template={info.row.original?.template?.name}
                    course={info.row.original?.template?.course}
                    folder={info.row.original?.template?.folder}
                />
            ),
        },
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <SignersView signers={info.row.original?.signers} />
            ),
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
                const actionsData = tableActionOptions(row?.original)
                return (
                    <EsignAction
                        index={row?.index}
                        rowData={row?.original}
                        data={eSign?.data?.data}
                        tableActionOptions={actionsData}
                    />
                )
            },
        },
    ]

    return (
        <div className="flex flex-col gap-y-4 p-4">
            {modal}
            <PageHeading
                title={'Filtered Esign Documents'}
                subtitle={'List of Filtered ESign Documents'}
            />

            <Card noPadding>
                {eSign?.isLoading || eSign?.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : eSign?.data?.data && eSign?.data?.data?.length ? (
                    <Table
                        columns={columns}
                        data={eSign?.data?.data}
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
                                            eSign?.data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                eSign?.data?.pagination,
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
                    eSign.isSuccess && (
                        <EmptyData
                            title={'No Filtered Documents!'}
                            description={'No Filtered Documents yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
