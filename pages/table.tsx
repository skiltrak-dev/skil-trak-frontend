import type { NextPage } from 'next'

import { Button, Card, Checkbox, Navbar, Table } from '@components'
import {
    createColumnHelper,
    flexRender,
    useReactTable,
    getCoreRowModel,
    ColumnDef,
} from '@tanstack/react-table'
import {
    HTMLProps,
    ReactElement,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

// Define your row shape
type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'Tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe1',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe2',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe3',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe4',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe5',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe6',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe7',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe8',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe9',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe10',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
    {
        firstName: 'joe11',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const TablePage: NextPage = () => {
    const QuickActionsElements = {
        id: 'age',
        individual: (id: Person) => (
            <div className="flex gap-x-2">
                <Button variant="secondary">Edit</Button>
                <Button>Delete</Button>
            </div>
        ),
        common: (ids: Person[]) => <Button>Delete</Button>,
    }

    const onlyColumns: ColumnDef<Person>[] = [
        {
            accessorKey: 'firstName',
            cell: (info) => info.getValue(),
        },
        {
            accessorFn: (row) => row.lastName,
            id: 'lastName',
            cell: (info) => info.getValue(),
            header: () => <span>Last Name</span>,
        },
    ]
    const obtainedSeconds = 106
    const totalSeconds = 199
    const [progress, setProgress] = useState('')

    useEffect(() => {
        const progressPercentage = (obtainedSeconds / totalSeconds) * 100
        setProgress(`${progressPercentage}%`)
    }, [obtainedSeconds, totalSeconds])

    console.log({ progress })

    return (
        <div>
            <Navbar />
            <div className="w-[90vw] h-7">
                <div className="bg-gray-300 w-full h-full">
                    <div
                        className=" bg-gray-600 h-full"
                        style={{ width: progress }}
                    />
                </div>

                <div className="flex justify-between w-full mt-3">
                    {[...Array(totalSeconds)]?.map((num, i, originalArray) => (
                        <div
                            key={i}
                            className="flex flex-col items-center relative"
                        >
                            {i % 10 === 0 && (
                                <span className="h-4 w-[0.5px] bg-gray-600"></span>
                            )}
                            {i % 5 === 0 && i % 10 !== 0 && (
                                <span className="h-4 w-[0.5px] bg-gray-400"></span>
                            )}
                            <span className="text-[9px] absolute top-full">
                                {i % 10 === 0 ? i : null}
                            </span>
                        </div>
                    ))}
                    <div className="flex flex-col items-center relative">
                        <span className="h-4 w-[0.5PX] bg-gray-600"></span>
                        <span className="text-[9px] absolute top-full">
                            {totalSeconds}
                        </span>
                    </div>
                </div>
                {/* <div className="flex justify-between w-full">
                    {[...Array(totalSeconds)]?.map((num, i, originalArray) => (
                        <span className="flex justify-between items-center">
                            <p className="text-[2px] m-0 p-0">
                                {i % 10 === 0 ? i : null}
                            </p>
                        </span>
                    ))}
                </div> */}
            </div>
            {/*  */}
            {/* <div className="flex flex-col items-center">
                    <div className="h-6 w-0.5 bg-gray-700"></div>
                    <p>{totalSeconds}</p>
                </div> */}
            <div className="w-4/5 p-8">
                <Card>
                    <Table
                        columns={onlyColumns}
                        data={defaultData}
                        enableRowSelection
                        quickActions={QuickActionsElements}
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: any) => {
                            return (
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex justify-between h-10">
                                        <div>{pageSize}</div>
                                        <div className="flex gap-x-2 items-center">
                                            <div>{quickActions}</div>
                                            <div>{pagination}</div>
                                        </div>
                                    </div>
                                    <div>{table}</div>
                                </div>
                            )
                        }}
                    </Table>
                </Card>
            </div>
        </div>
    )
}

export default TablePage
