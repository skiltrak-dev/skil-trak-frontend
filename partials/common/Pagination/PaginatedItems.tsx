import React, { useState, useEffect, useMemo } from 'react'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

export const PaginatedItems = ({
    itemsPerPage,
    setCurrentItems,
    data,
}: any) => {
    const [pageCount, setPageCount] = useState(0)
    const router = useRouter()
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0)
    const [initialPage, setInitialPage] = useState(0)

    useEffect(() => {
        setInitialPage(0)
        setItemOffset(0)
    }, [data, itemsPerPage])
    const currentPage = parseInt(router.query.page as string) || 1

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(data.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(data.length / itemsPerPage))
        // searchParams()
        setItemOffset((currentPage - 1) * itemsPerPage)
        setInitialPage(currentPage - 1)
    }, [itemOffset, itemsPerPage, data, currentPage])

    const onPaginationClick = (event: any) => {
        const newPage = event.selected + 1
        const newOffset = (event.selected * itemsPerPage) % data.length
        setItemOffset(newOffset)
        setInitialPage(0)

        // router.push(`/blogs?page=${newPage}`)
        router.push({
            pathname: '/blogs',
            query: `page=${newPage}`,
        })
    }
    return (
        <ReactPaginate
            containerClassName={`${
                pageCount < 2 && 'hidden'
            }  text-sm text-gray-500 flex justify-end items-center gap-x-4`}
            activeClassName={'activePage'}
            pageClassName={'pageNumber'}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            onPageChange={onPaginationClick}
            disabledClassName={
                'text-gray-400 bg-gray-200 px-3 py-2 rounded-md cursor-no-drop'
            }
            breakLabel="..."
            previousLabel="Prev"
            nextLabel="Next"
            forcePage={initialPage}
        />
    )
}
