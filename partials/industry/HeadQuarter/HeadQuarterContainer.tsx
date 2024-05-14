import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye } from 'react-icons/fa'

import { IndustryApi } from '@queries'
import { Course, Student } from '@types'
import { checkListLength, setLink } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'

// hooks
import { useActionModal } from '@hooks'
import { CourseDot } from '@partials/admin/industry/components'
import { IndustryCell } from '../components'

export const HeadQuarterContainer = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks

    const { isLoading, isFetching, data, isError, refetch } =
        IndustryApi.HeadQuarter.useHeadQuarterList(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    const onModalCancelClicked = useCallback(() => {
        setModal(null)
    }, [])

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: any) => {
                router.push(`/portals/admin/student/${student?.id}/detail`)
                setLink('student', router)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (student: Student) => {
                router.push(
                    `/portals/admin/student/edit-student/${student?.id}`
                )
            },
            Icon: FaEdit,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <IndustryCell industry={info.row.original} />
            },
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info) => {
                return (
                    <div>
                        <p>{info.row.original.contactPerson}</p>
                        <p className="text-xs text-gray-500">
                            {info.row.original.contactPersonNumber}
                        </p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'sectors',
            header: () => <span>Sectors</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-1">
                        {info.row.original?.courses?.map((c: Course) => (
                            <CourseDot key={c?.id} course={c} />
                        ))}
                    </div>
                )
            },
        },
        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info) => (
                <div>
                    <Typography variant={'label'}>
                        {info.row.original?.addressLine1},{' '}
                        {info.row.original?.suburb}
                    </Typography>
                </div>
            ),
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
                                `/portals/admin/student/${student?.id}/detail`
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
            <div className="flex flex-col gap-y-4">
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data ? (
                        <Table
                            columns={columns as any}
                            data={[data]}
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
                                        <div className=" overflow-x-scroll remove-scrollbar">
                                            <div className="px-6 w-full">
                                                {table}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Branches!'}
                                description={
                                    'You have not added any Branch yet'
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
