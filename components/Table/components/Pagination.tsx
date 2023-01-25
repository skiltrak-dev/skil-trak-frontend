import { Table } from '@tanstack/react-table'
import { Paginate } from '@types'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

interface PaginationProps {
    table?: Table<any>
    pagination?: Paginate
    setPage?: Function
}
export const Pagination = ({ table, pagination, setPage }: PaginationProps) => {
    console.log('pagination', pagination)
    const handlePageClick = ({ selected }: any) => {
        if (!pagination) table?.setPageIndex(selected)
        else if (setPage) setPage(selected + 1)
    }

    const hasNextPage = () => {
        return pagination ? pagination.hasNext : table?.getCanNextPage()
    }

    const hasPreviousPage = () => {
        return pagination ? pagination.hasPrevious : table?.getCanPreviousPage()
    }

    return (
        <div className="flex items-center gap-x-2">
            <div className="text-sm font-medium">Page:</div>
            <ReactPaginate
                breakLabel="..."
                pageCount={
                    pagination
                        ? pagination.totalPage
                        : Number(table?.getPageCount())
                }
                selectedPageRel={null}
                pageRangeDisplayed={3}
                forcePage={
                    pagination ? 0 : table?.getState().pagination.pageIndex
                }
                marginPagesDisplayed={3}
                nextClassName={`${
                    !hasNextPage()
                        ? 'text-gray-400'
                        : 'text-gray-700 hover:text-gray-900 cursor-pointer'
                }  h-4 w-4 flex justify-center items-center`}
                // renderOnZeroPageCount={null}
                prevRel={null}
                nextRel={null}
                previousClassName={`${
                    !hasPreviousPage()
                        ? 'text-gray-400'
                        : 'text-gray-700 hover:text-gray-900 cursor-pointer'
                }  h-4 w-4 flex justify-center items-center`}
                onPageChange={handlePageClick}
                nextLabel={<FaChevronRight />}
                previousLabel={<FaChevronLeft />}
                pageClassName="text-gray-400"
                activeClassName="text-gray-700 text-center rounded-full  "
                containerClassName={` h-8 text-xs text-gray-light flex justify-end items-center gap-x-2 font-semibold`}
            />
        </div>
    )
}
