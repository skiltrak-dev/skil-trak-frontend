import {
    ActionButton,
    Badge,
    Card,
    EmptyData,
    LoadingAnimation,
    StudentSubAdmin,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye } from 'react-icons/fa'

import { RtoCellInfo } from '@partials/admin/rto/components'
import { Rto, Student, UserStatus } from '@types'
import { checkListLength, isBrowser, setLink } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { MdBlock } from 'react-icons/md'

// hooks
import { useActionModal } from '@hooks'
import { ApproveModal, ArchiveModal } from './modal'
import Link from 'next/link'

export const FilteredEsigns = ({
    filter,
    setPage,
    itemPerPage,
    eSign,
    setItemPerPage,
}: {
    filter: any
    setPage: any
    itemPerPage: any
    eSign: any
    setItemPerPage: any
}) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

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

    // Attach the scroll event listener when the component mounts
    // useEffect(() => {
    //     if (listingRef.current) {
    //         listingRef.current.addEventListener('scroll', handleScroll)
    //     }

    //     // Remove the event listener when the component unmounts
    //     return () => {
    //         if (listingRef.current) {
    //             listingRef.current.removeEventListener('scroll', handleScroll)
    //         }
    //     }
    // }, [listingRef])

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const onModalCancelClicked = useCallback(() => {
        setModal(null)
    }, [])

    const onArchiveClicked = (eSign: any) => {
        setModal(<ArchiveModal eSign={eSign} onCancel={onModalCancelClicked} />)
    }

    const onApproveClicked = (eSign: any) => {
        setModal(<ApproveModal eSign={eSign} onCancel={onModalCancelClicked} />)
    }

    const numberOfWeeks = 20
    const endDate = new Date() // Starting from the current date

    const dateObjects = []

    for (let i = numberOfWeeks - 1; i >= 0; i--) {
        const currentDate = new Date(endDate)
        currentDate.setDate(currentDate.getDate() - i * 7) // Decrement by a week

        const lastWeekDate = new Date(currentDate)
        lastWeekDate.setDate(lastWeekDate.getDate() + 6) // End of the week

        const dateObject = {
            startDate: currentDate.toISOString().slice(0, 10), // Format as YYYY-MM-DD
            endDate: lastWeekDate.toISOString().slice(0, 10),
        }

        dateObjects.push(dateObject)
    }

    const tableActionOptions = (eSign: any): TableActionOption[] => [
        {
            text: 'View',
            onClick: (eSign: any) => {
                // router.push(
                //     `/portals/admin/student/${eSign?.id}?tab=overview`
                // )
                // setLink('student', router)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (student: Student) => {
                // router.push(
                //     `/portals/admin/student/edit-student/${student?.id}`
                // )
            },
            Icon: FaEdit,
        },
        {
            text: eSign?.status === UserStatus.Approved ? 'Archive' : 'Approve',
            onClick: (eSign: any) => {
                eSign?.status === UserStatus.Approved
                    ? onArchiveClicked(eSign)
                    : onApproveClicked(eSign)
            },
            Icon: MdBlock,
            color: 'text-red-400 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return (
                    <Link
                        href={`/portals/admin/e-sign/${info.row.original?.id}/document-template`}
                    >
                        <Typography variant="label" semibold>
                            <span className="cursor-pointer">
                                {info.row.original?.name}
                            </span>
                        </Typography>
                    </Link>
                )
            },
            header: () => <span>Title</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => {
                return (
                    <RtoCellInfo
                        rto={{ user: info?.row?.original?.user } as Rto}
                        short
                    />
                )
            },
        },

        {
            accessorKey: 'Course',
            header: () => <span>Course</span>,
            cell: (info) => (
                <Typography variant="label" color="text-info">
                    {info.row.original?.course?.title}
                </Typography>
            ),
        },
        {
            accessorKey: 'folder',
            header: () => <span>Folder</span>,
            cell: (info) => (
                <Typography variant="label" color="text-info">
                    {info.row.original?.folder?.name}
                </Typography>
            ),
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => (
                <Badge
                    text={info.row.original?.status}
                    variant={
                        info.row.original?.status === UserStatus.Approved
                            ? 'success'
                            : 'primary'
                    }
                />
            ),
        },
        {
            accessorKey: 'file',
            header: () => <span>File</span>,
            cell: (info) => (
                <Badge
                    text="Download"
                    variant="info"
                    onClick={() => {
                        router.push(info.row.original?.file)
                    }}
                />
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const length = checkListLength<StudentSubAdmin>(
                    eSign?.data?.data as StudentSubAdmin[]
                )

                const actionOptions = tableActionOptions(info.row.original)

                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={actionOptions}
                            rowItem={info.row.original}
                            lastIndex={length.includes(info.row?.index)}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (student: Student) => {
            return (
                <div className="flex gap-x-2">
                    <ActionButton
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/${student?.id}?tab=overview`
                            )
                        }}
                    >
                        View
                    </ActionButton>
                    <ActionButton
                        Icon={FaEdit}
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/edit-student/${student?.id}`
                            )
                        }}
                    >
                        Edit
                    </ActionButton>
                    <ActionButton
                        Icon={MdBlock}
                        variant="error"
                        onClick={() => {}}
                    >
                        Block
                    </ActionButton>
                </div>
            )
        },
        common: (student: Student[]) => (
            <ActionButton onClick={() => {}} Icon={MdBlock} variant="error">
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 p-4">
                <div className="flex">
                    <PageHeading
                        title={'Filtered E-Sign'}
                        subtitle={'List of Filtered E-Sign'}
                    />
                </div>
                <Card noPadding>
                    {eSign.isError && <TechnicalError />}
                    {eSign.isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : eSign.data?.data && eSign.data?.data.length ? (
                        <Table
                            columns={columns as any}
                            data={eSign.data.data}
                            quickActions={quickActionsElements}
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
                                        <div
                                            ref={listingRef}
                                            onScroll={handleScroll}
                                            className="p-6 mb-2 flex justify-between"
                                        >
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      eSign.data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          eSign.data
                                                              ?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className=" overflow-x-scroll remove-scrollbar">
                                            <div className="px-6 w-full">
                                                {table}
                                            </div>
                                        </div>
                                        {eSign.data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          eSign.data?.data
                                                              ?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              eSign.data
                                                                  ?.pagination,
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
                        !eSign.isError && (
                            <EmptyData
                                title={'No Approved Student!'}
                                description={
                                    'You have not approved any Student request yet'
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
