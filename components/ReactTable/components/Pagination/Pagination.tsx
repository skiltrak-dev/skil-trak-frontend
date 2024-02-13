import React from 'react'

// Icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

// components
import { Typography } from '@components/Typography'

interface Props {
    pageCount: number
    setCurrentPage: Function
    currentPage: number
}

export const Pagination = ({
    pageCount,
    setCurrentPage,
    currentPage,
}: Props) => {
    return (
        <div className="flex items-center gap-x-2">
            <Typography>Page:</Typography>

            <IoIosArrowBack
                className={`font-bold ${
                    currentPage > 1 ? 'cursor-pointer' : 'text-gray-light'
                }`}
                onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                }
            />
            {[...Array(pageCount)].map((_, i) => {
                return (
                    <div
                        key={i}
                        className={`${
                            currentPage - 1 === i
                                ? 'text-black'
                                : 'text-gray-light'
                        } cursor-pointer font-bold`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        <Typography variant={'xs'}>{i + 1}</Typography>
                    </div>
                )
            })}

            <IoIosArrowForward
                className={`${
                    currentPage < pageCount
                        ? 'cursor-pointer'
                        : 'text-gray-light'
                }`}
                onClick={() =>
                    currentPage < pageCount && setCurrentPage(currentPage + 1)
                }
            />
        </div>
    )
}
