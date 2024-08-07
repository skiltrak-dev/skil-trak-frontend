import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Icons

// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
} from '@components'

import { SubAdminApi } from '@queries'
import { SubAdmin, UserStatus } from '@types'
import { getUserCredentials } from '@utils'
import { IndustryCellInfo } from './components'
import { BranchCell } from './components/BranchCell'

export const RtoCoordinatorsIndustries = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError } =
        SubAdminApi.Industry.useRtoCoordinatorsIndustries(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const id = getUserCredentials()?.id

    const onCancelClicked = () => {
        setModal(null)
    }

    const isFavorite = (subAdmin: SubAdmin[] | undefined) => {
        return subAdmin?.find((subadmin: any) => subadmin?.user?.id === id)
    }

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => (
                <IndustryCellInfo
                    industry={row.original}
                    isFavorite={isFavorite}
                    call
                />
            ),
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        {
            header: () => 'Suburb',
            accessorKey: 'suburb',
            cell: ({ row }: any) => {
                const { suburb } = row.original
                return (
                    <Typography variant={'label'} color={'black'}>
                        {suburb}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }: any) => {
                const { addressLine1 } = row.original
                return (
                    <Typography variant={'label'} color={'black'}>
                        {addressLine1}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Contact Person',
            accessorKey: 'contactPersonNumber',
            cell: ({ row }: any) => {
                const { contactPersonNumber, contactPerson } = row.original
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {contactPersonNumber} {contactPerson}
                    </Typography>
                )
            },
        },
    ]

    return (
        <>
            {modal}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length > 0 ? (
                    <Table
                        columns={Columns?.filter((c: any) => c?.header) as any}
                        data={data?.data}
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
                                            setItemPerPage,
                                            data?.data?.length
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
                            title={'No Industry!'}
                            description={'You have not any Industries yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
