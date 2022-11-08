import { Table } from '@tanstack/react-table'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

export const Pagination = ({ table }: { table: Table<any> }) => {
    const handlePageClick = ({ selected }: any) => {
        table.setPageIndex(selected)
    }
    return (
        <div className="flex items-center gap-x-2">
            <div className='text-sm font-medium'>Page:</div>
            <ReactPaginate
                breakLabel="..."
                pageCount={table.getPageCount()}
                selectedPageRel={null}
                pageRangeDisplayed={3}
                forcePage={table.getState().pagination.pageIndex}
                marginPagesDisplayed={3}
                nextClassName={`${
                    !table.getCanNextPage()
                        ? 'text-gray-400'
                        : 'text-gray-700 hover:text-gray-900 cursor-pointer'
                }  h-4 w-4 flex justify-center items-center`}
                // renderOnZeroPageCount={null}
                prevRel={null}
                nextRel={null}
                previousClassName={`${
                    !table.getCanPreviousPage()
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
