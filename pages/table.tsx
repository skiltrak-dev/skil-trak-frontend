import type { NextPage } from 'next'
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { Button, Card, Navbar, Table } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'

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
    const obtainedSeconds = 165
    const totalSeconds = 199

    const width = `${(obtainedSeconds / totalSeconds) * 100}%`

    const percentage = 75
    const strokeWidth = 10
    const circleRadius = 50

    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const progress = percentage / 100
        const circumference = 2 * Math.PI * circleRadius
        const progressOffset = circumference * (1 - progress)
        setOffset(progressOffset)
    }, [percentage, circleRadius])

    const [timer, settimer] = useState(null)
    const [abcde, setabcde] = useState(2000)

    useEffect(() => {
        let time: any = null
        time = setTimeout(() => {
            console.log('Saad Khan')
        }, abcde)
        console.log('abcde', abcde)

        return () => {
            clearTimeout(time)
        }
    }, [abcde])

    console.log({ abcde })

    return (
        <div>
            <div
                onClick={() => {
                    setabcde((preVal) =>
                        preVal <= 2000 ? 2000 : preVal + 0.001
                    )
                }}
            >
                Saad
            </div>
            <Navbar />
            <div style={{ width: '200px' }}>
                <CircularProgressbarWithChildren
                    value={percentage}
                    strokeWidth={5}
                    styles={buildStyles({
                        pathColor: 'blue',
                        trailColor: 'orange',
                        // strokeLinecap: 'butt',
                    })}
                    // text={`${percentage}%`}
                >
                    <div className="w-3/4">
                        <CircularProgressbarWithChildren
                            value={percentage}
                            strokeWidth={7}
                            // text={`${percentage}%`}
                        >
                            <div className="w-[70%]">
                                <CircularProgressbarWithChildren
                                    value={percentage}
                                    strokeWidth={8.5}
                                    // text={`${percentage}%`}
                                >
                                    <div className="w-3/5">
                                        <CircularProgressbarWithChildren
                                            value={percentage}
                                            strokeWidth={10}

                                            // text={`${percentage}%`}
                                        ></CircularProgressbarWithChildren>
                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
            <div className="flex flex-col gap-y-6 pb-8 px-6 pt-6 ">
                <div className="w-full">
                    <div className="border rounded w-full h-8">
                        <div
                            className={`${width} h-full bg-gray-600 flex items-center`}
                            style={{
                                width,
                            }}
                        >
                            <div className="w-full h-1.5 bg-gray-800"></div>
                        </div>
                    </div>
                    <div className="flex justify-between w-full mt-3">
                        {[...Array(totalSeconds)]?.map(
                            (num, i, originalArray) => (
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
                            )
                        )}
                        <div className="flex flex-col items-center relative">
                            <span className="h-4 w-[0.5PX] bg-gray-600"></span>
                            <span className="text-[9px] absolute top-full">
                                {totalSeconds}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
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
