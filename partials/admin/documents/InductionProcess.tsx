// hooks
import { Button, Card, InitialAvatar, Table, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { inductionProcessData, UploadDoc } from './componnets'

export const InductionProcess = ({
    inductionProcess,
}: {
    inductionProcess: any
}) => {
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
                    />
                )
            },
        },
    ]

    return (
        <div className="p-4">
            <Card>
                <Typography variant={'h4'}>Induction Process</Typography>

                <Table columns={columns} data={data}>
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
