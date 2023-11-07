// hooks
import { Button, Card, InitialAvatar, Table, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { UploadDoc, workflowData } from './componnets'
import { UserRoles } from '@constants'

export const Workflow = ({
    loading,
    workflow,
    onAddDocument,
    rtoDoc,
}: {
    workflow: any
    onAddDocument: (val: any) => void
    loading: boolean
    rtoDoc?: any
}) => {
    const [type, setType] = useState<any>({})
    console.log({ workflow })

    useEffect(() => {
        if (!loading) {
            setType({})
        }
    }, [loading])
    const data = workflowData?.map((d) => {
        const findData = workflow?.find((f: any) => f?.for === d?.role)
        return findData ? { ...d, file: findData?.file } : d
    })

    console.log({ type })

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
            header: () => <span>Uploaded File</span>,
            cell: ({ row }) => {
                return row.original?.file ? (
                    <div className="flex">
                        <InitialAvatar
                            name={row.original?.docType}
                            imageUrl={row.original?.file}
                            large
                        />
                    </div>
                ) : (
                    'N/A'
                )
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Actions</span>,
            cell: ({ row }) => (
                <UploadDoc
                    item={row.original}
                    onAddDocument={(val: any) => {
                        onAddDocument(val)
                        setType({
                            docType: row.original?.docType,
                            role: row.original?.role,
                        })
                        console.log('ROW', row.original)
                    }}
                    text={row.original?.docType + row.original?.name}
                    loading={
                        loading &&
                        type?.docType === row.original?.docType &&
                        type?.role === row.original?.role
                    }
                />
            ),
        },
    ]

    return (
        <div className="p-4">
            <Card>
                <Typography variant={'h4'}>Work FLow</Typography>
                <Table columns={columns} data={rtoDoc ? rtoDoc(data) : data}>
                    {({ table }: any) => {
                        return (
                            <div>
                                <div className=" overflow-x-scroll remove-scrollbar">
                                    <div className="px-6 w-full">{table}</div>
                                </div>
                            </div>
                        )
                    }}
                </Table>
            </Card>
        </div>
    )
}
