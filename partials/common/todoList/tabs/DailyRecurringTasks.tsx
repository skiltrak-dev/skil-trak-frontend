import React, { useState } from 'react'
import { TableColumn, TodoTable } from '../components/TodoTable'
import { PaginationData } from '../components/TodoPagination'
import { FaCheck } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

export const DailyRecurringTasks = () => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const [itemsPerPage, setItemsPerPage] = React.useState(10)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])
    // Sample data matching your image
    const studentData = [
        {
            studentId: 'NTCA220223',
            name: 'Kulvinder kaur',
            email: '',
            phone: '451743038',
            date: '1 May 2025',
            status: 'approved',
        },
        {
            studentId: 'NTCA220223',
            name: 'Kulvinder kaur',
            email: 'info@westbourne.vic.edu.au',
            phone: '451743038',
            date: '1 May 2025',
            status: 'approved',
        },
        {
            studentId: 'NTCA220223',
            name: 'Kulvinder kaur',
            email: 'info@westbourne.vic.edu.au',
            phone: '451743038',
            date: '1 May 2025',
            status: 'rejected',
        },
    ]

    // Sample pagination data
    const paginationData: PaginationData = {
        currentPage: currentPage,
        totalResult: 71,
        totalPage: 220,
        itemPerPage: itemsPerPage,
        hasNext: currentPage < 2,
        hasPrevious: currentPage > 1,
    }

    // Handle page change (this is where you'd make API call)
    const handlePageChange = async (page: number) => {
        setLoading(true)
        setCurrentPage(page)

        // Simulate API call
        try {
            // await fetchData({ page, itemsPerPage });
            await fetch(
                `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
                    itemsPerPage * page - itemsPerPage
                }`
            )
                .then((res: any) => res.json())
                .then(console.log)
            console.log(`Fetching page ${page} with ${itemsPerPage} items`)
            // Simulate setting data
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }
    console.log('data', data)
    // Handle items per page change
    const handleItemsPerPageChange = async (newItemsPerPage: number) => {
        setLoading(true)
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1) // Reset to first page

        // Simulate API call
        try {
            // await fetchData({ page: 1, itemsPerPage: newItemsPerPage });
            console.log(`Fetching page 1 with ${newItemsPerPage} items`)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    // Column configuration
    const columns: TableColumn<(typeof studentData)[0]>[] = [
        {
            key: 'studentId',
            header: 'Student ID',
            width: '140px',
            className: 'font-medium',
        },
        {
            key: 'name',
            header: 'Name',
            width: '200px',
        },

        {
            key: 'date',
            header: 'Date',
            width: '120px',
        },
        {
            key: 'status',
            header: 'Action',
            width: '100px',
            render: (value: string) => (
                <div className="">
                    {value === 'approved' ? (
                        <div className="w-6 h-6">
                            <FaCheck className="text-green-600" size={20} />
                        </div>
                    ) : (
                        <div className="w-6 h-6 ">
                            <IoCloseSharp className="text-red-600" size={30} />
                        </div>
                    )}
                </div>
            ),
        },
    ]

    return (
        <div className="p-6 flex flex-col gap-y-6">
            <TodoTable
                data={studentData}
                columns={columns}
                title="High Priority Items:"
                totalCount={148}
                statusCounts={{
                    done: 120,
                    remaining: 28,
                }}
                onClose={() => console.log('Close clicked')}
                pagination={paginationData}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                loading={loading}
            />

            <TodoTable
                data={studentData}
                columns={columns}
                title="Appointments:"
                totalCount={20}
                statusCounts={{
                    done: 120,
                    remaining: 28,
                }}
                onClose={() => console.log('Close clicked')}
                pagination={paginationData}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                loading={loading}
            />
            <TodoTable
                data={studentData}
                columns={columns}
                title="Open Tickets:"
                totalCount={8}
                statusCounts={{
                    done: 120,
                    remaining: 28,
                }}
                onClose={() => console.log('Close clicked')}
                pagination={paginationData}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                loading={loading}
            />

            <TodoTable
                data={studentData}
                columns={columns}
                title="Workplace Requests:"
                totalCount={15}
                statusCounts={{
                    done: 120,
                    remaining: 28,
                }}
                onClose={() => console.log('Close clicked')}
                pagination={paginationData}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                loading={loading}
            />
        </div>
    )
}
