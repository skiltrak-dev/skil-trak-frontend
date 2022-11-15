import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Icons
import { AiFillEye } from 'react-icons/ai'

// components
import {
    GoBackButton,
    Card,
    ReactTable,
    Typography,
    ActionDropDown,
} from 'components'
import { StudentsFilter } from './components'
import { RightSidebarData } from '../../components'

// query
import { useGetStudentsQuery } from 'redux/query'

// Context
import { useContextBar } from 'hooks'

// functions
import { getAge } from 'utills'

// Colors
import { Colors } from 'utills/colors/Colors'
import { Filter } from 'HigherOrderComponents'
import { Button } from 'components'

export const StudentList = () => {
    const navigate = useNavigate()
    const { setContent } = useContextBar()
    const [queryFilters, setQueryFilters] = useState({})
    const [filterActionButton, setFilterActionButton] = useState(null)

    useEffect(() => {
        setContent(
            <>
                <RightSidebarData />
            </>
        )
    }, [setContent])
    //

    const TableActionOption = (id) => {
        const actions = [
            {
                text: 'View',
                Icon: AiFillEye,
                action: () => {
                    navigate(`/students/${id}`)
                },
                color: Colors.secondaryText,
            },
        ]
        return actions
    }

    const Columns = [
        {
            Header: 'Student Name',
            accessor: 'name',
            Cell: ({ row }) => {
                const { name, email, image } = row.original.user
                return (
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <img
                                className="rounded-full w-7 h-7"
                                src={image || 'https://picsum.photos/400/400'}
                                alt={name}
                            />
                            <div>
                                <Typography color={'black'}>
                                    {' '}
                                    {name}{' '}
                                </Typography>
                                <Typography variant={'muted'} color={'gray'}>
                                    {email}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            Header: 'Age',
            accessor: 'age',
            Cell: ({ row }) => {
                return getAge(row.original.dob)
            },
        },
        {
            Header: 'Phone',
            accessor: 'phone',
        },
        {
            Header: 'Location',
            accessor: 'location',
        },
        {
            Header: 'Action',
            accessor: 'Action',
            Cell: ({ row }) => {
                const action = TableActionOption(row.original.id)
                return <ActionDropDown title={'More'} dropDown={action} />
            },
        },
    ]

    const filterInitialValues = {
        name: '',
        email: '',
    }
    return (
        <div>
            <GoBackButton>Back To Students</GoBackButton>
            <div className="flex justify-between items-center py-4">
                <div>
                    <Typography variant={'title'}>All Students</Typography>
                    <Typography variant={'muted'} color={'gray'}>
                        You can find all Students here as well as requests
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    {filterActionButton}
                    <Button variant={'dark'}>Archived</Button>
                </div>
            </div>
            {/*  filters */}
            <Filter
                component={StudentsFilter}
                setQueryFilters={setQueryFilters}
                setFilterAction={setFilterActionButton}
                filterInitialValues={filterInitialValues}
            />
            <Card mt={6}>
                <ReactTable
                    Columns={Columns}
                    pagesize
                    pagination
                    action={useGetStudentsQuery}
                    queryFilters={queryFilters}
                    defaultTableRows={4}
                    borderBottom={1}
                />
            </Card>
        </div>
    )
}
