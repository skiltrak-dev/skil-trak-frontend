// hooks
import { Button, Card, InitialAvatar, Table, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { UploadDoc, workflowData } from './componnets'

export const Workflow = ({ workflow }: { workflow: any }) => {
    const data = workflowData?.map((d) => {
        const findData = workflow?.find((f: any) => f?.for === d?.role)
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
            accessorKey: 'industry',
            header: () => <span>Actions</span>,
            cell: ({ row }) => (
                <UploadDoc
                    text={row.original?.docType + row.original?.name}
                    item={row.original}
                />
            ),
        },
    ]

    return (
        <div className="p-4">
            <Card>
                <Typography variant={'h4'}>Work FLow</Typography>
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
