import { GoChevronDown } from 'react-icons/go'
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5'
import React from 'react'
import { PageNumbers } from './index'

interface TablePaginationProps {
    currentPage: number
    totalPages: number
    itemsPerPage: number
    itemsPerPageOptions: number[]
    onPageChange: (page: number) => void
    onItemsPerPageChange: (itemsPerPage: number) => void
}

export const TablePagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    itemsPerPageOptions,
    onPageChange,
    onItemsPerPageChange,
}: TablePaginationProps) => {
    return (
        <div className="flex items-center justify-between my-4">
            <ItemsPerPageSelector
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={itemsPerPageOptions}
                onChange={onItemsPerPageChange}
            />

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 text-[#1436B0]"
                >
                    <IoArrowBackOutline />
                </button>

                <PageNumbers
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />

                <button
                    onClick={() =>
                        onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50 text-[#1436B0]"
                >
                    <IoArrowForwardOutline />
                </button>
            </div>
        </div>
    )
}

interface ItemsPerPageSelectorProps {
    itemsPerPage: number
    itemsPerPageOptions: number[]
    onChange: (value: number) => void
}

const ItemsPerPageSelector = ({
    itemsPerPage,
    itemsPerPageOptions,
    onChange,
}: ItemsPerPageSelectorProps) => {
    return (
        <div className="flex items-center gap-2">
            <span className="font-medium font-inter text-sm">Show</span>
            <div className="relative">
                <select
                    className="border border-[#1436b05b] rounded-lg outline-none p-1 text-black appearance-none pl-3 pr-8"
                    value={itemsPerPage}
                    onChange={(e) => onChange(Number(e.target.value))}
                >
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[#1436B0]">
                    <GoChevronDown />
                </div>
            </div>
        </div>
    )
}
