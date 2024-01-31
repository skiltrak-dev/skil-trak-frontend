import {
    Badge,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { useContextBar } from '@hooks'
import { CancelInitiateSign } from '@partials/sub-admin/assessmentEvidence/modal'
import { CommonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { EsignDocumentStatus } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { ListingDocumentsTab, SignersView } from '../components'

export const CancelEsignDocuments = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const allDocuments = CommonApi.ESign.useSubadminEsignList(
        {
            search: `status:${EsignDocumentStatus.CANCELLED}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const contextBar = useContextBar()

    const onModalCancel = () => setModal(null)

    const onCancelInitiateSignClicked = (eSign: any) => {
        setModal(<CancelInitiateSign onCancel={onModalCancel} eSign={eSign} />)
    }

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
    ]

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'All Cancel documents'}
                    subtitle={'List of All Canceled Esign Documents'}
                />

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
                                title={'No Cancelled Documents!'}
                                description={
                                    'You have not any cancel document yet!'
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
