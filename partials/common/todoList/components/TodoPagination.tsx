import React from 'react'

// Pagination interface
export interface PaginationData {
    currentPage: number
    totalResult: number
    totalPage: number
    itemPerPage: number
    hasNext: boolean
    hasPrevious: boolean
}

// Pagination component props
export interface TodoPaginationProps {
    pagination: PaginationData
    onPageChange: (page: number) => void
    onItemsPerPageChange?: (itemsPerPage: number) => void
    className?: string
}

// Pagination component
export const TodoPagination = ({
    pagination,
    onPageChange,
    onItemsPerPageChange,
    className = '',
}: TodoPaginationProps) => {
    const {
        currentPage,
        totalResult,
        totalPage,
        itemPerPage,
        hasNext,
        hasPrevious,
    } = pagination

    // Calculate the range of items being displayed
    const startItem = (currentPage - 1) * itemPerPage + 1
    const endItem = Math.min(currentPage * itemPerPage, totalResult)

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPage <= maxVisiblePages) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            // Calculate start and end of visible range
            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPage - 1, currentPage + 1)

            // Adjust range if we're near the beginning or end
            if (currentPage <= 3) {
                end = Math.min(4, totalPage - 1)
            }
            if (currentPage >= totalPage - 2) {
                start = Math.max(totalPage - 3, 2)
            }

            // Add ellipsis if needed
            if (start > 2) {
                pages.push('...')
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            // Add ellipsis if needed
            if (end < totalPage - 1) {
                pages.push('...')
            }

            // Always show last page if it's not already included
            if (totalPage > 1) {
                pages.push(totalPage)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div
            className={`mt-5 flex items-center justify-between px-6 pt-4 bg-white border-t border-gray-200 ${className}`}
        >
            {/* Left side - Results info and items per page */}
            <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startItem}</span> to{' '}
                    <span className="font-medium">{endItem}</span> of{' '}
                    <span className="font-medium">{totalResult}</span> results
                </div>

                {onItemsPerPageChange && (
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700">Show:</label>
                        <select
                            value={itemPerPage}
                            onChange={(e) =>
                                onItemsPerPageChange(Number(e.target.value))
                            }
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Right side - Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        hasPrevious
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
                    }`}
                >
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                typeof page === 'number'
                                    ? onPageChange(page)
                                    : undefined
                            }
                            disabled={typeof page === 'string'}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                page === currentPage
                                    ? 'text-white bg-blue-600 border border-blue-600'
                                    : typeof page === 'string'
                                    ? 'text-gray-400 cursor-default'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!hasNext}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        hasNext
                            ? 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
