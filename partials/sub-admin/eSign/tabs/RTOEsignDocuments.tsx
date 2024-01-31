import {
    ActionButton,
    Badge,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError
} from '@components'
import { PageHeading } from '@components/headings'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { CancelInitiateSign } from '@partials/sub-admin/assessmentEvidence/modal'
import { RTOCellInfo } from '@partials/sub-admin/rto/components'
import { CommonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { EsignDocumentStatus } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { FaEdit, FaEye } from 'react-icons/fa'
import { EsignAction, ListingDocumentsTab } from '../components'
import { ViewSignersCB } from '../contextBar'
import { ListingEnum } from '../enums'

export const RTOEsignDocuments = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const rtoDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `role:${ListingEnum.RTO}`,
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
                : {}),
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
            cell: (info) => {
                const rto = info.row?.original?.signers?.find(
                    (s: any) => s?.user?.role === UserRoles.RTO
                )
                return (
                    <RTOCellInfo rto={{ ...rto?.user?.rto, user: rto?.user }} />
                )
            },
            header: () => <span>RTO</span>,
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
                const actionsData = tableActionOptions(row?.original)
                return (
                    <EsignAction
                        index={row?.index}
                        rowData={row?.original}
                        data={rtoDocuments?.data?.data}
                        tableActionOptions={actionsData}
                    />
                )
            },
        },
    ]

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Documents that needs to be signed by RTOs'}
                    subtitle={'List of All Esign Documents'}
                />

                {/* RTO:Documents that needs to be signed by {user}s */}
                {/* Document name, Course, Folder */}

                <Card noPadding>
                    {rtoDocuments?.isError && <TechnicalError />}
                    {rtoDocuments?.isLoading || rtoDocuments?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : rtoDocuments?.data?.data &&
                      rtoDocuments?.data?.data.length ? (
                        <Table<any>
                            columns={columns}
                            data={rtoDocuments?.data?.data}
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
                                                rtoDocuments?.data?.data.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    rtoDocuments?.data
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
                        rtoDocuments?.isSuccess && (
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
