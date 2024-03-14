import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableChildrenProps,
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaPhone } from 'react-icons/fa'

import { CommonApi } from '@queries'
import { isBrowser, setLink } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { MdEmail } from 'react-icons/md'

// hooks
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary'
import { useActionModal } from '@hooks'
import { AdminLayout } from '@layouts'

export const WorkBasedQuery = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [refetchStudents, setRefetchStudents] = useState(false)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const listingRef = useRef<any>(null)

    const savedScrollPosition =
        isBrowser() && localStorage.getItem('lastScroll')
    useEffect(() => {
        if (listingRef.current && savedScrollPosition) {
            listingRef.current.scrollTop = parseInt(savedScrollPosition, 10)
        }
    }, [savedScrollPosition, listingRef])

    // Function to handle scrolling
    const handleScroll = () => {
        if (listingRef.current) {
            isBrowser() &&
                localStorage.setItem('lastScroll', listingRef.current.scrollTop)
        }
    }

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, isFetching, data, isError, refetch } =
        CommonApi.Traineeship.useGetList(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: any) => {
                    router.push(
                        `/portals/admin/student/${student?.id}?tab=overview`
                    )
                    setLink('student', router)
                },
                Icon: FaEye,
            },
        ]
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                const userDetail = info.row?.original
                return (
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        <div className="">
                            <ErrorBoundary>
                                {userDetail?.fullName && (
                                    <InitialAvatar
                                        name={userDetail?.fullName}
                                    />
                                )}
                            </ErrorBoundary>
                        </div>
                        <div>
                            <p className="font-semibold">
                                {userDetail?.fullName}
                            </p>
                            <div className="flex items-center gap-x-2 text-sm">
                                <FaPhone className="text-xs text-gray-500" />
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-500'}
                                >
                                    {userDetail?.phone}
                                </Typography>
                            </div>
                            <div className="font-medium text-xs text-gray-500">
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdEmail />
                                    </span>
                                    {userDetail?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            },
            header: () => <span>User</span>,
        },
        {
            accessorKey: 'country',
            header: () => <span>Country</span>,
        },
        {
            accessorKey: 'age',
            header: () => <span>Age</span>,
        },
        {
            accessorKey: 'qualification',
            header: () => <span>Qualification</span>,
        },
        {
            accessorKey: 'experience',
            header: () => <span>Experience</span>,
            cell: (info) => {
                const userDetail = info.row?.original
                return (
                    <TruncatedTextWithTooltip
                        text={info.row?.original?.experience}
                        maxLength={20}
                    />
                )
            },
        },
    ]

    return (
        <>
            <div className="flex flex-col gap-y-4 px-4">
                <div className="flex">
                    <PageHeading
                        title={'Work Based Program'}
                        subtitle={'List of Work Based Program'}
                    />
                </div>
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data && data?.data?.length ? (
                        <Table columns={columns} data={data?.data}>
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div
                                            ref={listingRef}
                                            onScroll={handleScroll}
                                            className="p-6 mb-2 flex justify-between"
                                        >
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto remove-scrollbar">
                                            <div
                                                className="px-6 w-full"
                                                id={'studentScrollId'}
                                            >
                                                {table}
                                            </div>
                                        </div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          data?.data?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              data?.pagination,
                                                              setPage
                                                          )
                                                        : null}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Traineeship Program!'}
                                description={
                                    'There is no Traineeship Program yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
