import {
    ActionButton,
    Badge,
    Button,
    Card,
    Select,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TextInput,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { Student } from '@types'
import { checkListLength } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { FaEdit, FaEye } from 'react-icons/fa'
import { MdBlock, MdOutlineDateRange } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'

export const IndustryEsignTemp = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const templatesData = [
        {
            id: '1',
            name: 'Technology Assessment Checklist',
            sector: 'Technology & Innovation',
            deadline: '7 days',
            lastModified: '2024-01-15',
        },
        {
            id: '2',
            name: 'Healthcare Compliance Form',
            sector: 'Healthcare & Life Sciences',
            deadline: '14 days',
            lastModified: '2024-01-12',
        },
        {
            id: '3',
            name: 'Financial Analysis Report',
            sector: 'Financial Services',
            deadline: '10 days',
            lastModified: '2024-01-08',
        },
        // extra dummy records
        {
            id: '4',
            name: 'Cybersecurity Risk Assessment',
            sector: 'Technology & Innovation',
            deadline: '5 days',
            lastModified: '2024-01-05',
        },
        {
            id: '5',
            name: 'Pharmaceutical Trial Consent Form',
            sector: 'Healthcare & Life Sciences',
            deadline: '20 days',
            lastModified: '2024-01-02',
        },
        {
            id: '6',
            name: 'Quarterly Investment Review',
            sector: 'Financial Services',
            deadline: '12 days',
            lastModified: '2023-12-29',
        },
    ]

    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'View',
            onClick: (eSign: any) => {
                console.log('View', eSign)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (eSign: any) => {
                router.push(`/portals/admin/e-sign/${eSign?.id}/edit`)
            },
            color: 'text-link',
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (eSign: any) => {
                router.push(`/portals/admin/e-sign/${eSign?.id}/edit`)
            },
            color: 'text-red-500',
            Icon: RiDeleteBinLine,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            cell: (info) => {
                return (
                    <Link
                        href={`/portals/admin/e-sign/${info.row.original?.id}/edit`}
                    >
                        <Typography variant="small">
                            {info.row.original.name}
                        </Typography>
                    </Link>
                )
            },
            header: () => <span>Template Name</span>,
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sector</span>,
            cell: (info) => {
                return (
                    <Typography variant="small">
                        {info.row.original.sector}
                    </Typography>
                )
            },
        },
        {
            accessorKey: 'deadline',
            header: () => <span>Deadline</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-2 items-center">
                        <div>
                            <MdOutlineDateRange />
                        </div>
                        <Typography variant="small">
                            {info.row.original.deadline}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'lastModified',
            header: () => <span>Last Modified</span>,
            cell: (info) => {
                return (
                    <Typography variant="small">
                        {info.row.original.lastModified}
                    </Typography>
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const length = checkListLength(templatesData)

                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                            lastIndex={length.includes(info.row?.index)}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center w-full">
                <PageHeading
                    title={'E-Sign Templates'}
                    subtitle={'Manage your industry document templates'}
                />
                <Link
                    href={'/portals/admin/e-sign/create-industry-temp'}
                    className="whitespace-nowrap"
                >
                    <Button text="Create Template" variant="dark" />
                </Link>
            </div>
            <Card>
                <div className="flex items-center gap-x-4">
                    <div className="w-2/3">
                        <TextInput
                            name="search"
                            placeholder="search"
                            showError={false}
                        />
                    </div>
                    <div className="w-1/3">
                        <Select
                            options={[
                                {
                                    label: 'Select Industry',
                                    value: 'Select Industry',
                                },
                                { label: 'Industry 1', value: 'Industry 1' },
                                { label: 'Industry 2', value: 'Industry 2' },
                                { label: 'Industry 3', value: 'Industry 3' },
                            ]}
                            name="sectors"
                            showError={false}
                        />
                    </div>
                </div>
            </Card>
            <Card>
                <Table
                    columns={columns as any}
                    data={templatesData}
                    // quickActions={quickActionsElements}
                    enableRowSelection
                >
                    {({
                        table,
                        pagination,
                        pageSize,
                        quickActions,
                    }: TableChildrenProps) => {
                        return (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize
                                        ? pageSize(
                                              itemPerPage,
                                              setItemPerPage,
                                              templatesData?.length
                                          )
                                        : null}
                                    {/* <div className="flex gap-x-2">
                                    {quickActions}
                                    {pagination
                                        ? pagination(
                                              templatesData?.pagination,
                                              setPage
                                          )
                                        : null}
                                </div> */}
                                </div>
                                <div className=" overflow-x-scroll remove-scrollbar">
                                    <div className="px-6 w-full">{table}</div>
                                </div>
                                {/* {templatesData > 10 && (
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize
                                        ? pageSize(
                                              itemPerPage,
                                              setItemPerPage,
                                              getEsign.data?.data?.length
                                          )
                                        : null}
                                    <div className="flex gap-x-2">
                                        {quickActions}
                                        {pagination
                                            ? pagination(
                                                  getEsign.data?.pagination,
                                                  setPage
                                              )
                                            : null}
                                    </div>
                                </div>
                            )} */}
                            </div>
                        )
                    }}
                </Table>
            </Card>
        </div>
    )
}
