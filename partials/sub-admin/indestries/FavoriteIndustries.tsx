import { useState, ReactElement } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// Icons
import { FaEye, FaPhoneSquareAlt, FaEnvelope } from 'react-icons/fa'

// components
import {
    Card,
    TableActionOption,
    Typography,
    TableAction,
    LoadingAnimation,
    Table,
    EmptyData,
    TechnicalError,
} from '@components'

import { Industry } from '@types'
import { useGetFavouriteIndustriesQuery } from '@queries'

export const FavoriteIndustries = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, data, isError } = useGetFavouriteIndustriesQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (industry: Industry) => {
                router.push(
                    `/portals/sub-admin/users/industries/${industry.id}`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Un-Favourite',
            onClick: (industry: Industry) => {
                // router.push(
                //     `/portals/sub-admin/users/industries/${industry.id}`
                // )
            },
            Icon: FaEye,
        },
    ]

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => {
                const {
                    phoneNumber,
                    user: { name, email, image },
                } = row.original

                return (
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <Image
                                className="rounded-full w-7 h-7"
                                src={
                                    'https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' ||
                                    ' '
                                }
                                alt={''}
                                width={50}
                                height={50}
                            />
                            <Link
                                legacyBehavior
                                href={`/portals/sub-admin/users/industries/${row.original.id}?tab=overview`}
                            >
                                <a>
                                    <Typography color={'black'}>
                                        {' '}
                                        {name}{' '}
                                    </Typography>
                                    <div className="flex items-center gap-x-2">
                                        <FaPhoneSquareAlt className="text-gray" />
                                        <Typography variant={'muted'}>
                                            {phoneNumber}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <FaEnvelope />
                                        <Typography
                                            variant={'muted'}
                                            color={'gray'}
                                        >
                                            {email}
                                        </Typography>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                )
            },
        },
        // {
        //     header:()=> 'Type',
        //     accessorKey: 'employmentType',
        //     cell: ({ row }) => {
        //         const { employmentType } = row.original
        //         switch (employmentType) {
        //             case 'fullTime':
        //                 return 'Full Time'

        //             case 'partTime':
        //                 return 'Part Time'

        //             default:
        //                 return 'Temporary'
        //         }
        //     },
        //     disableFilters: true,
        // },
        {
            header: () => 'Phone',
            accessorKey: 'phoneNumber',
            cell: ({ row }: any) => {
                const { phoneNumber } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {phoneNumber}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }: any) => {
                const { addressLine1, addressLine2, city, state, zipCode } =
                    row.original
                return (
                    <div className="flex justify-center gap-x-2">
                        <Typography color={'black'}>{addressLine1}</Typography>
                        <Typography color={'black'}>{addressLine2}</Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Student Capacity',
            accessorKey: 'studentCapacity',
            cell: ({ row }: any) => {
                const { studentCapacity } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {studentCapacity}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Contact Person',
            accessorKey: 'contactPersonNumber',
            cell: ({ row }: any) => {
                const { contactPersonNumber } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {contactPersonNumber}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction options={tableActionOptions} rowItem={row} />
                )
            },
        },
    ]

    return (
        <Card noPadding>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data && data?.data.length ? (
                <Table
                    columns={Columns}
                    data={data.data}
                    // quickActions={quickActionsElements}
                    enableRowSelection
                >
                    {({ table, pagination, pageSize, quickActions }: any) => {
                        return (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize(itemPerPage, setItemPerPage)}
                                    <div className="flex gap-x-2">
                                        {quickActions}
                                        {pagination(data?.pagination, setPage)}
                                    </div>
                                </div>
                                <div className="px-6">{table}</div>
                            </div>
                        )
                    }}
                </Table>
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Favorite Industries!'}
                        description={
                            'You have not added a Favorite Industries yet'
                        }
                        height={'50vh'}
                    />
                )
            )}
        </Card>
    )
}
