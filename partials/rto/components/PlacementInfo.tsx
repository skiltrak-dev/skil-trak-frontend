// hooks
import { useEffect, useState } from 'react'
import { ActionButton, Button, Card, InitialAvatar, Table, Typography } from '@components'
import {
    UploadDoc,
    placementInfoData,
} from '@partials/admin/documents/componnets'
import { useEditor } from '@partials/admin/documents/hooks'
import { EditorModal, RequirementModal } from '@partials/admin/documents/modal'
import { ColumnDef } from '@tanstack/react-table'

export const PlacementInfo = ({
    placementInfo,
    onAddDocument,
    loading,
    rtoDoc,
}: {
    rtoDoc?: any
    loading: boolean
    placementInfo: any
    onAddDocument: (val: any) => void
}) => {
    const [type, setType] = useState<any>({})
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
        return findData
            ? { ...d, content: findData?.content, file: findData?.file }
            : d
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
                    <div className="flex">
                        <InitialAvatar
                            name={row.original?.docType}
                            imageUrl={row.original?.file}
                            large
                        />
                    </div>
                ),
        },
        {
            accessorKey: 'industry',
            header: () => <span>Actions</span>,
            cell: ({ row }) => {
                return (
                    <UploadDoc
                        text={row.original?.docType + row.original?.name}
                        item={row.original}
                        onAddDocument={(val: any) => {
                            onAddDocument(val)
                            setType({
                                docType: row.original?.docType,
                                role: row.original?.role,
                            })
                        }}
                        loading={
                            loading &&
                            type?.docType === row.original?.docType &&
                            type?.role === row.original?.role
                        }
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
