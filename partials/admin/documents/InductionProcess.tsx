// hooks
import { Button, Card, InitialAvatar, Table, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { inductionProcessData, UploadDoc } from './componnets'
import { useEffect, useState } from 'react'

export const InductionProcess = ({
    inductionProcess,
    onAddDocument,
    loading,
    rtoDoc,
}: {
    rtoDoc?: any
    inductionProcess: any
    loading: boolean
    onAddDocument: (val: any) => void
}) => {
    const [type, setType] = useState<any>({})

    useEffect(() => {
        if (!loading) {
            setType({})
        }
    }, [loading])

    const data = inductionProcessData?.map((d) => {
        const findData = inductionProcess?.find((f: any) => f?.for === d?.role)
        return findData ? { ...d, file: findData?.file } : d
    })
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
            accessorKey: 'action',
            header: () => <span>Actions</span>,
            cell: ({ row }) => {
                return (
                    <UploadDoc
                        text={row.original?.docType + row.original?.name}
                        item={row.original}
                        onAddDocument={(val: any) => {
                            onAddDocument(val)
                            console.log('row.original', row.original)
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
        <div className="p-4">
            <Card>
                <Typography variant={'h4'}>Induction Process</Typography>

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
