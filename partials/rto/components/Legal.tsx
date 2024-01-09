// hooks
import { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useEditor } from '@partials/admin/documents/hooks'
import { UploadDoc, legalData } from '@partials/admin/documents/componnets'
import {
    ActionButton,
    Button,
    Card,
    InitialAvatar,
    Table,
    Typography,
} from '@components'
import { EditorModal, RequirementModal } from '@partials/admin/documents/modal'

export const Legal = ({
    loading,
    legal,
    rtoDoc,
    onAddDocument,
}: {
    loading: boolean
    legal: any
    rtoDoc?: any
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
                loading={loading}
                onCancel={onCancelClicked}
                onAddDocument={(val: any) => {
                    onAddDocument(val)
                }}
                item={item}
            />
        )
    }

    const data = legalData?.map((d) => {
        const findData = legal?.find((f: any) => f?.for === d?.role)
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
            cell: ({ row }) => {
                return row.original?.content ? (
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
                )
            },
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
                    <Typography variant={'h4'}>Legal</Typography>
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
