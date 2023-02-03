// hooks
import { ActionButton, Button, Card, Table, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { placementInfoData } from './componnets'
import { useEditor } from './hooks'
import { EditorModal, RequirementModal } from './modal'

export const PlacementInfo = ({ placementInfo }: { placementInfo: any }) => {
    const { modal, setModal, onCancelClicked } = useEditor()

    const onAddContentClicked = (item: any) => {
        setModal(<EditorModal onCancel={onCancelClicked} item={item} />)
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
                    <Table columns={columns} data={data}>
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
