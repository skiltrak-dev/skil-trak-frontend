import {
    ActionButton,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
} from '@components'
import { RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { ReportOptionsEnum } from '@types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FilterReport } from '../../FilterReport'
type Props = {
    startDate: any
    endDate: any
    setStartDate: any
    setEndDate: any
    user?: number
}

export const NonContactableReport = ({
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    user,
}: Props) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const router = useRouter()

    const { data, isLoading, isError } =
        RtoApi.Students.useGetNotContactableStudents({
            user,
            startDate: startDate.toISOString().slice(0, 10),
            endDate: endDate.toISOString().slice(0, 10),
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Name</span>,
            accessorKey: 'user',
            cell: (info: any) => (
                <a className="flex items-center gap-x-2">
                    <InitialAvatar
                        name={info?.row?.original?.user?.name}
                        imageUrl={info?.row?.original?.user?.avatar}
                    />
                    <div className="flex flex-col">
                        <span>{info?.row?.original?.id}</span>
                        <span>{info?.row?.original?.user?.name}</span>
                    </div>
                </a>
            ),
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            cell: (info) => <span>{info?.row?.original?.user?.email}</span>,
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
        },
        {
            accessorKey: 'courses',
            header: () => <span>Courses</span>,
            cell: (info) => {
                // return info?.row?.original?.courses?.map((c: Course) => (
                //     <CourseDot key={c?.id} course={c} />
                // ))
                return (
                    <span>
                        {info?.row?.original?.courses[0]?.title || 'N/A'}
                    </span>
                )
            },
        },
    ]
    const count = data?.data?.length
    return (
        <>
            <div className="flex justify-between items-start">
                <div className="">
                    <Typography variant="title" color="text-gray-400">
                        Non Contactable Students
                    </Typography>
                    <Typography variant="h3">{count || 0}</Typography>
                </div>
                {/* <ViewFullListReport data={data} columns={columns} /> */}
                <div className="flex items-center gap-x-4">
                    <FilterReport
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                    <ActionButton
                        onClick={() => {
                            router.push(
                                `/portals/rto/report/${ReportOptionsEnum.NON_CONTACTABLE}`
                            )
                        }}
                    >
                        View Full List
                    </ActionButton>
                </div>
            </div>

            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data?.data && data?.data?.length ? (
                <Table columns={columns} data={data?.data}>
                    {({ table, pagination, pageSize, quickActions }: any) => {
                        return (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize(itemPerPage, setItemPerPage)}
                                    <div className="flex gap-x-2">
                                        {/* {quickActions} */}
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
                        title={'No Not Contactable Students Found'}
                        description={
                            'There is no any Not Contactable Students yet'
                        }
                        height={'50vh'}
                    />
                )
            )}
        </>
    )
}
