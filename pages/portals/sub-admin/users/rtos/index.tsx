import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Link
import Link from 'next/link'
// image
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout, Rto } from '@types'

import { FaEye } from 'react-icons/fa'

//components
import {
    Button,
    Card,
    EmptyData,
    Filter,
    InitialAvatar,
    LoadingAnimation,
    PageTitle,
    RtoContextBarData,
    SidebarCalendar,
    SubAdminRtoFilter,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
// queries
import { useGetSubAdminRtosQuery } from '@queries'
// icons
import { useActionModal, useContextBar } from '@hooks'

import { SectorCell } from '@partials/admin/sub-admin'
import { checkFilteredDataLength, getFilterQuery, setLink } from '@utils'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

const RTOs: NextPageWithLayout = () => {
    const { setContent } = useContextBar()
    const router = useRouter()

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    //filters
    const filterKeys = ['name', 'email', 'phone', 'code', 'courseId']
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    const filteredDataLength = checkFilteredDataLength(filter)
    //filters

    useEffect(() => {
        const query = getFilterQuery({ router, filterKeys: [] })
        setFilter(query)
    }, [router])

    const { isLoading, data, isError, isFetching } = useGetSubAdminRtosQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    // useEffect(() => {
    //     setContent(
    //         <>
    //             <Button variant={'dark'} text={'My Schedule'} />
    //             <SidebarCalendar />
    //             <RtoContextBarData />
    //         </>
    //     )
    // }, [setContent])

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (rto: any) => {
                router.push(
                    `/portals/sub-admin/users/rtos/${rto.original.id}?tab=overview`
                )
                setLink('subadmin-rtos', router)
            },
            Icon: FaEye,
        },
        {
            text: 'View Password',
            onClick: (rto: Rto) => onViewPassword(rto),
            Icon: RiLockPasswordFill,
        },
    ]

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => {
                const {
                    phone,
                    user: { avatar, name, email },
                } = row.original

                return (
                    <Link
                        legacyBehavior
                        href={`/portals/sub-admin/users/rtos/${row.original.id}?tab=overview`}
                    >
                        <a
                            className="flex items-center gap-x-2"
                            onClick={() => {
                                setLink('subadmin-rtos', router)
                            }}
                        >
                            <div className="shadow-inner-image rounded-full">
                                {name && (
                                    <InitialAvatar
                                        name={name}
                                        imageUrl={avatar}
                                    />
                                )}
                            </div>
                            <div>
                                <p className={'font-semibold'}>{name}</p>
                                <div className="font-medium text-xs text-gray-500">
                                    <p className="flex items-center gap-x-1">
                                        <span>
                                            <MdEmail />
                                        </span>
                                        {email}
                                    </p>
                                    <p className="flex items-center gap-x-1">
                                        <span>
                                            <MdPhoneIphone />
                                        </span>
                                        {phone}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </Link>
                )
            },
        },
        {
            header: () => 'Package',
            accessorKey: 'package',
            cell: ({ row }: any) => {
                // const {package}:any = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {row?.original?.package?.name}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Code',
            accessorKey: 'code',
            cell: ({ row }: any) => {
                const { rtoCode } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {rtoCode}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Students',
            accessorKey: 'students',
            cell: ({ row }: any) => (
                <Typography variant={'muted'} color={'gray'}>
                    {row.original?.students?.length || 0}
                </Typography>
            ),
        },
        {
            header: () => 'Courses',
            accessorKey: 'courses',
            cell: (info: any) => {
                return <SectorCell subAdmin={info.row.original} />
            },
            // cell: ({ row }: any) => {
            //     return (
            //         <div className="flex justify-center">
            //             <Typography variant={'muted'} color="text-blue-400">
            //                 View
            //             </Typography>
            //         </div>
            //     )
            // },
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }: any) => {
                const { address, city, state, zipCode } = row.original
                return (
                    <div>
                        <Typography color={'black'}>{address}</Typography>
                        <Typography color={'black'}>{state}</Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    return (
        <>
            {passwordModal}
            <div className="mb-6">
                <div className="px-4 mb-12">
                    <div className="flex justify-between items-center">
                        <PageTitle title={'RTOs'} backTitle={'Users'} />
                        <div className="flex justify-end mb-2">
                            {filterAction}
                        </div>
                    </div>
                    <Filter
                        component={SubAdminRtoFilter}
                        initialValues={filter}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                        filterKeys={filterKeys}
                    />
                </div>
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table
                            columns={Columns}
                            data={data.data}
                            // quickActions={quickActionsElements}
                            enableRowSelection
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: any) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
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
                                title={'No RTO were found!'}
                                description={'You have not any rto yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
RTOs.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default RTOs
