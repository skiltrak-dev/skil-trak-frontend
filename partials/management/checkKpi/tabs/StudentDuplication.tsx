import { Card, Table, TableChildrenProps, Typography } from '@components'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { useState } from 'react'

const data = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: {
                lat: '-37.3159',
                lng: '81.1496',
            },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
        },
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
            street: 'Victor Plains',
            suite: 'Suite 879',
            city: 'Wisokyburgh',
            zipcode: '90566-7771',
            geo: {
                lat: '-43.9509',
                lng: '-34.4618',
            },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic contingency',
            bs: 'synergize scalable supply-chains',
        },
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        address: {
            street: 'Douglas Extension',
            suite: 'Suite 847',
            city: 'McKenziehaven',
            zipcode: '59590-4157',
            geo: {
                lat: '-68.6102',
                lng: '-47.0653',
            },
        },
        phone: '1-463-123-4447',
        website: 'ramiro.info',
        company: {
            name: 'Romaguera-Jacobson',
            catchPhrase: 'Face to face bifurcated interface',
            bs: 'e-enable strategic applications',
        },
    },
    {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        address: {
            street: 'Hoeger Mall',
            suite: 'Apt. 692',
            city: 'South Elvis',
            zipcode: '53919-4257',
            geo: {
                lat: '29.4572',
                lng: '-164.2990',
            },
        },
        phone: '493-170-9623 x156',
        website: 'kale.biz',
        company: {
            name: 'Robel-Corkery',
            catchPhrase: 'Multi-tiered zero tolerance productivity',
            bs: 'transition cutting-edge web services',
        },
    },
    {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        address: {
            street: 'Skiles Walks',
            suite: 'Suite 351',
            city: 'Roscoeview',
            zipcode: '33263',
            geo: {
                lat: '-31.8129',
                lng: '62.5342',
            },
        },
        phone: '(254)954-1289',
        website: 'demarco.info',
        company: {
            name: 'Keebler LLC',
            catchPhrase: 'User-centric fault-tolerant solution',
            bs: 'revolutionize end-to-end systems',
        },
    },
]
export const StudentDuplication = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'id',
            cell: (info) => {
                return <div>{info?.row?.original?.id}</div>
            },
            header: () => <span>ID</span>,
        },
        {
            accessorKey: 'name',
            cell: (info) => {
                return <div>{info?.row?.original?.name}</div>
            },
            header: () => <span>Student Name</span>,
        },
        {
            accessorKey: 'address',
            cell: (info) => {
                return <div>{info?.row?.original?.address.city}</div>
            },
            header: () => <span>Address</span>,
        },
        {
            accessorKey: 'phone',
            cell: (info) => {
                return <div>{info?.row?.original?.phone}</div>
            },
            header: () => <span>Phone</span>,
        },
        // {
        //     accessorKey: 'createdAt',
        //     header: () => <span>Created At</span>,
        //     cell: (info) => {
        //         return (
        //             <>
        //                 <Typography variant={'small'} color={'text-gray-600'}>
        //                     <span className="font-semibold whitespace-pre">
        //                         {moment(info?.row?.original?.createdAt).format(
        //                             'Do MMM YYYY'
        //                         )}
        //                     </span>
        //                 </Typography>
        //                 <Typography variant={'small'} color={'text-gray-600'}>
        //                     <span className="font-semibold whitespace-pre">
        //                         {moment(info?.row?.original?.createdAt).format(
        //                             'hh:mm:ss a'
        //                         )}
        //                     </span>
        //                 </Typography>
        //             </>
        //         )
        //     },
        // },
    ]
    return (
        <div className="">
            <div className="bg-white/80 rounded-lg">
                {/* {isError && <TechnicalError />}
    {isLoading || isFetching ? (
        <LoadingAnimation height="h-[60vh]" />
    ) : data && data?.data.length ? ( */}

                <Table
                    columns={columns}
                    data={data}
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
                                              data?.length
                                          )
                                        : null}
                                    {/* <div className="flex gap-x-2">
                            {quickActions}
                            {pagination
                                ? pagination(
                                      data?.pagination,
                                      setPage
                                  )
                                : null}
                        </div> */}
                                </div>
                                <div className="overflow-x-auto remove-scrollbar">
                                    <div
                                        className="px-6 w-full"
                                        id={'studentScrollId'}
                                    >
                                        {table}
                                    </div>
                                </div>
                                {data?.length > 10 && (
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize
                                            ? pageSize(
                                                  itemPerPage,
                                                  setItemPerPage,
                                                  data?.length
                                              )
                                            : null}
                                        {/* <div className="flex gap-x-2">
                                {quickActions}
                                {pagination
                                    ? pagination(
                                          data?.pagination,
                                          setPage
                                      )
                                    : null}
                            </div> */}
                                    </div>
                                )}
                            </div>
                        )
                    }}
                </Table>
                {/* ) : (
        !isError && (
            <EmptyData
                title={'No Approved Student!'}
                description={
                    'You have not approved any Student request yet'
                }
                height={'50vh'}
            />
        )
    )} */}
            </div>
        </div>
    )
}
