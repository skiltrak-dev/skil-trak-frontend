import { Checkbox, Typography } from '@components'
import React, { useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { TbReload } from 'react-icons/tb'

export const NotificationTopBar = ({
    refetch,
    hasPrev,
    pagination,
    onPageChange,
}: {
    refetch: any
    hasPrev: boolean
    pagination: any
    onPageChange: (type: string) => void
}) => {
    const [showDropdownOptions, setShowDropdownOptions] =
        useState<boolean>(false)

    return (
        <div className="px-6 py-2.5">
            <div className="flex items-center gap-x-12 justify-between bg-white shadow-[inset_0_-1px_0_0_#EDEFF1] px-5 py-3.5">
                <div className="flex items-center gap-x-4">
                    <TbReload
                        className="text-xl cursor-pointer"
                        onClick={() => {
                            refetch()
                        }}
                    />
                </div>

                {/*  */}
                <div className="flex items-center gap-x-4">
                    <Typography color="text-[#0000008A]" variant="label">
                        {(pagination?.currentPage - 1) *
                            pagination?.itemPerPage +
                            1}
                        –{pagination?.currentPage * pagination?.itemPerPage} of{' '}
                        {pagination?.totalPage}
                    </Typography>
                    <div className="flex items-center gap-x-4 ">
                        <MdKeyboardArrowLeft
                            className={`${
                                hasPrev
                                    ? 'text-[#0000008A] cursor-pointer'
                                    : 'text-[#0000005E] cursor-not-allowed'
                            }  text-xl`}
                            onClick={() => {
                                onPageChange('prev')
                            }}
                        />
                        <MdKeyboardArrowRight
                            className={`${
                                pagination?.hasNext
                                    ? 'text-[#0000008A] cursor-pointer'
                                    : 'text-[#0000005E] cursor-not-allowed'
                            } text-xl`}
                            onClick={() => {
                                onPageChange('next')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
