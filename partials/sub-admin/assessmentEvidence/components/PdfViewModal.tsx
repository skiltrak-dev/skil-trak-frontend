// Icons
import { MdCancel } from 'react-icons/md'

// components
import { useState } from 'react'

import { Document, Page } from 'react-pdf'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface PdfViewModalProps {
    url: string
    onCancelButtonClick?: () => void
}

export const PdfViewModal = ({
    url,
    onCancelButtonClick,
}: PdfViewModalProps) => {
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className="bg-[#00000050] w-full h-screen flex items-start justify-center fixed top-0 left-0 z-40 overflow-scroll py-16">
            <div className="bg-white rounded-2xl flex flex-col justify-between shadow-md min-w-[450px] overflow-hidden">
                <div className="px-2 py-1 flex justify-end items-center">
                    {/* <div>
                        <Typography variant={'title'}>{title}</Typography>
                        <Typography variant={'subtitle'} color={'text-muted'}>
                            {subtitle}
                        </Typography>
                    </div> */}
                    <MdCancel
                        onClick={onCancelButtonClick}
                        className="transition-all duration-300 text-gray-400 hover:text-black text-2xl cursor-pointer"
                    />
                </div>

                <div className="min-w-[595px] min-h-[842px] relative">
                    <div>
                        <div className="px-4 flex justify-between">
                            <p className="text-sm">
                                <span className="text-gray-500">Page</span>{' '}
                                <span className="font-semibold">
                                    {currentPage}/{totalPages}
                                </span>
                            </p>

                            <div className="flex items-center gap-x-8 text-xs font-semibold">
                                <button
                                    className={`flex items-center gap-x-1 text-gray-500 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
                                    onClick={() => previousPage()}
                                    disabled={currentPage - 1 <= 0}
                                >
                                    <FaChevronLeft />
                                    Previous
                                </button>
                                <button
                                    onClick={() => nextPage()}
                                    className={`flex items-center gap-x-1 text-gray-500 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                        <Document
                            file={url}
                            onLoadSuccess={({ numPages }) => {
                                setTotalPages(numPages)
                            }}
                            loading={<div className='min-w-[595px] min-h-[842px]'>
                                <p className='text-center font-semibold text-gray-500 mt-16'>Loading PDF...</p>
                            </div>}
                        >
                            <Page pageNumber={currentPage} />
                        </Document>
                    </div>
                </div>

                {/* <div className="flex justify-end items-end gap-x-4 px-4 py-2">
                    <Button variant={'secondary'} onClick={onCancelButtonClick}>
                        {'Cancel'}
                    </Button>
                </div> */}
            </div>
        </div>
    )
}
