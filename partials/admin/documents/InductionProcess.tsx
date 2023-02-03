// hooks
import { Button, Card, Table, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { inductionProcessData, UploadDoc } from './componnets'

export const InductionProcess = ({
    inductionProcess,
}: {
    inductionProcess: any
}) => {
    console.log('inductionProcess', inductionProcess)
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
            cell: (info) => {
                return 'N/A'
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
