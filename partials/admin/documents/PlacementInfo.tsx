// hooks
import { ActionButton, Button, Card, Table, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { placementInfoData } from './componnets'
import { useEditor } from './hooks'
import { EditorModal, RequirementModal } from './modal'
import { useEffect } from 'react'

export const PlacementInfo = ({
    placementInfo,
    onAddDocument,
    loading,
    rtoDoc,
}: {
    loading: boolean
    placementInfo: any
    rtoDoc?: any
    onAddDocument: (val: any) => void
}) => {
    const { modal, setModal, onCancelClicked } = useEditor()

    useEffect(() => {
        if (!loading) {
            onCancelClicked()
        }
    }, [loading])

    const onAddContentClicked = (item: any) => {
        setModal(
            <EditorModal
                onCancel={onCancelClicked}
                item={item}
                onAddDocument={(val: any) => {
                    onAddDocument(val)
                }}
                loading={loading}
            />
        )
    }

    const data = placementInfoData?.map((d) => {
        const findData = placementInfo?.find((f: any) => f?.for === d?.role)
        return findData ? { ...d, content: findData?.content } : d
    })

    const onViewContentClicked = (document: any) => {
        setModal(
            <RequirementModal document={document} onCancel={onCancelClicked} />
        )
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            // cell: (info) => {
            //     return 'Saad'
            // },
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>Content</span>,
            cell: ({ row }) =>
                row.original?.content ? (
                    <ActionButton
                        variant="link"
                        simple
                        onClick={() => {
                            onViewContentClicked(row.original)
                        }}
                    >
                        View
                    </ActionButton>
                ) : (
                    'N/A'
                ),
        },
        {
            accessorKey: 'industry',
            header: () => <span>Actions</span>,
            cell: ({ row }) => {
                return (
                    <Button
                        text={row.original?.content ? 'Update' : 'Add'}
                        outline
                        onClick={() => {
                            onAddContentClicked(row.original)
                        }}
                    />
                )
            },
        },
    ]

    return (
        <>
            {modal && modal}
            <div className="p-4">
                <Card>
                    <Typography variant={'h4'}>Placement Info</Typography>
                    <Table
                        columns={columns}
                        data={rtoDoc ? rtoDoc(data) : data}
                    >
                        {({ table }: any) => {
                            return (
                                <div>
                                    <div className=" overflow-x-scroll remove-scrollbar">
                                        <div className="px-6 w-full">
                                            {table}
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    </Table>
                </Card>
            </div>
        </>
    )
}
