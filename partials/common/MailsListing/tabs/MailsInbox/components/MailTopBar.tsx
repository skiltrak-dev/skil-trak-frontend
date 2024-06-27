import { Checkbox, Tooltip, Typography } from '@components'
import React, { ReactElement, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import {
    MdDelete,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from 'react-icons/md'
import { TbMailOpened, TbReload } from 'react-icons/tb'
import { DeleteMultiMailsModal } from '../modals'
import { CommonApi } from '@queries'

export const MailTopBar = ({
    refetch,
    hasNext,
    hasPrev,
    onSelectMails,
    pagination,
    isSelectedMails,
    selectedMails,
    onPageChange,
}: {
    selectedMails: number[]
    refetch: any
    hasNext: boolean
    hasPrev: boolean
    pagination: any
    onSelectMails: any
    isSelectedMails: boolean
    onPageChange: (type: string) => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [showDropdownOptions, setShowDropdownOptions] =
        useState<boolean>(false)

    const [multipleMailsSeen, multipleMailsSeenResult] =
        CommonApi.Messages.multiplesMailsSeen()

    const onCancelClicked = () => setModal(null)

    const onDeleteMultiMailsClicked = () => {
        setModal(
            <DeleteMultiMailsModal
                onCancel={onCancelClicked}
                ids={selectedMails}
            />
        )
    }

    const onMultipleMailsSeen = () => {
        multipleMailsSeen({ ids: selectedMails })
    }

    return (
        <>
            {modal}
            <div className="px-6 py-2.5">
                <div className="flex items-center gap-x-12 justify-between bg-white shadow-[inset_0_-1px_0_0_#EDEFF1] px-5 py-3.5">
                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center relative">
                            <Checkbox
                                name="selectAll"
                                showError={false}
                                value={isSelectedMails}
                                defaultChecked={isSelectedMails}
                                onChange={() => {
                                    onSelectMails('all')
                                }}
                            />
                            <IoMdArrowDropdown
                                className="hover:bg-secondary-dark px-0.5 text-xl cursor-pointer"
                                onClick={() => {
                                    setShowDropdownOptions(!showDropdownOptions)
                                }}
                            />

                            {/*  */}
                            <div
                                className={`${
                                    showDropdownOptions
                                        ? 'max-h-40 shadow-[0px_0px_7px_1px_rgba(0,0,0,0.20)]'
                                        : 'max-h-0'
                                } overflow-hidden transition-all duration-300 absolute top-full left-2 bg-white  w-32 mt-1 rounded`}
                            >
                                <div className="w-full flex flex-col">
                                    {['All', 'Read', 'Un Read']?.map((text) => (
                                        <div className="hover:bg-secondary-dark py-1.5">
                                            <Typography
                                                center
                                                variant="small"
                                                semibold
                                                color="text-gray-500"
                                            >
                                                {text}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <TbReload
                            className="text-xl cursor-pointer"
                            onClick={() => {
                                refetch()
                            }}
                        />
                        {selectedMails && selectedMails?.length > 0 ? (
                            <>
                                <div className="relative group">
                                    <TbMailOpened
                                        onClick={() => {
                                            onMultipleMailsSeen()
                                        }}
                                        className="cursor-pointer text-xl"
                                    />
                                    <Tooltip>Real All Selected Mails</Tooltip>
                                </div>
                                <div className="relative group">
                                    <MdDelete
                                        onClick={() => {
                                            onDeleteMultiMailsClicked()
                                        }}
                                        className="cursor-pointer text-xl"
                                    />
                                    <Tooltip>Delete All Selected Mails</Tooltip>
                                </div>
                            </>
                        ) : null}
                    </div>

                    {/*  */}
                    <div className="flex items-center gap-x-4">
                        <Typography color="text-[#0000008A]" variant="label">
                            {(pagination?.currentPage - 1) *
                                pagination?.itemPerPage +
                                1}
                            –{pagination?.currentPage * pagination?.itemPerPage}{' '}
                            of {pagination?.totalPage}
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
                                    hasNext
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
        </>
    )
}
