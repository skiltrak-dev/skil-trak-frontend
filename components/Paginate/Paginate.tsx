import React, { useState, useEffect, useMemo } from 'react'
import ReactPaginate from 'react-paginate'

export const Paginate = ({ itemsPerPage, setCurrentItems, data }: any) => {
    const [pageCount, setPageCount] = useState(0)
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0)
    const [initialPage, setInitialPage] = useState(0)

    useEffect(() => {
        setInitialPage(0)
        setItemOffset(0)
    }, [data, itemsPerPage])

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(data.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(data.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, data])

    const onPaginationClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % data.length
        setItemOffset(newOffset)
        setInitialPage(0)
    }
    return (
        <ReactPaginate
            containerClassName={`${
                pageCount < 2 && 'hidden'
            }  text-base text-black flex justify-end items-center gap-x-4`}
            activeClassName="hidden"
            pageClassName="hidden"
            marginPagesDisplayed={2}
            pageCount={pageCount}
            onPageChange={onPaginationClick}
            disabledClassName="text-gray-300"
            previousLabel="<"
            nextLabel=">"
            forcePage={initialPage}
        />
    )
}
