// Icons
import { MdCancel } from 'react-icons/md'

// components
import { useEffect, useState } from 'react'

import { Document, Page } from 'react-pdf'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Typography } from '@components/Typography'
import { Button } from '@components'
import { isBrowser } from '@utils'

interface PdfViewModalProps {
    url: string
    onCancelButtonClick?: (value?: boolean) => void
    downloadUrl: string
    extension?: string
    filename: string
}

export const PdfDocumentView = ({
    filename,
    url,
    onCancelButtonClick,
    downloadUrl,
    extension,
}: PdfViewModalProps) => {
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const previousPage = () => {
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className="bg-[#00000050] w-full h-screen flex items-start justify-center fixed top-0 left-0 z-40 overflow-scroll py-16">
            <div className="bg-white rounded-2xl flex flex-col justify-between shadow-md min-w-full lg:min-w-[600px] xl:min-w-[844px] overflow-hidden">
                <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                    <Typography semibold>
                        <span className="text-[15px]">{filename}</span>
                    </Typography>
                    <div className="flex items-center gap-x-2.5">
                        {/* <Button
                            text="Edit Document"
                            variant="info"
                            onClick={() => {
                                if (onCancelButtonClick) {
                                    onCancelButtonClick(true)
                                }
                            }}
                        /> */}
                        <Button
                            text="Download Document"
                            onClick={() => {
                                if (isBrowser()) {
                                    window.open(downloadUrl)
                                }
                            }}
                        />
                        <MdCancel
                            onClick={() => {
                                if (onCancelButtonClick) {
                                    onCancelButtonClick()
                                }
                            }}
                            className="transition-all duration-300 text-gray-400 hover:text-black text-2xl cursor-pointer"
                        />
                    </div>
                </div>

                <div className="min-w-[100%] bg-[#F0F0F0] relative">
                    <div className="min-w-[100%] flex flex-col items-center">
                        <div className="w-full px-4 flex justify-between">
                            <div>
                                <div>
                                    <a
                                        href={downloadUrl}
                                        target="_blank"
                                        rel={'noreferrer'}
                                        className="text-sm font-semibold text-info"
                                    >
                                        Download
                                    </a>
                                </div>
                                <p className="text-sm">
                                    <span className="text-gray-500">Page</span>{' '}
                                    <span className="font-semibold">
                                        {currentPage}/{totalPages}
                                    </span>
                                </p>
                            </div>

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
                        {mounted && extension === 'pdf' ? (
                            <div className="shadow rounded-lg overflow-hidden">
                                <Document
                                    file={url}
                                    onLoadSuccess={({ numPages }) => {
                                        setTotalPages(numPages)
                                    }}
                                    loading={
                                        <div className="min-w-[100%] min-h-[842px]">
                                            <p className="text-center font-semibold text-gray-500 mt-16">
                                                Loading PDF...
                                            </p>
                                        </div>
                                    }
                                >
                                    <Page pageNumber={currentPage} />
                                </Document>
                            </div>
                        ) : (
                            <div className="p-2">
                                <Typography>
                                    The document you provided is not in PDF
                                    format. Please download the file and view it
                                    in the appropriate application.
                                    <br /> If you need any help please contact
                                    us at:{' '}
                                    <span className="font-bold text-red-500 underline">
                                        tech@skiltrak.com.au
                                    </span>
                                </Typography>
                            </div>
                        )}
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
