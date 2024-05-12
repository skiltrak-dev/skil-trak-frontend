import { Card, Typography } from '@components'
import React, { ReactNode, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'

export const ContextBarDropdown = ({
    title,
    children,
    onAddData,
    onSetDropdown,
}: {
    title: string
    children: ReactNode
    onAddData?: () => void
    onSetDropdown?: (isDropdown: boolean) => void
}) => {
    const [isDropdown, setIsDropdown] = useState<boolean>(false)

    useEffect(() => {
        if (onSetDropdown) {
            onSetDropdown(isDropdown)
        }
    }, [isDropdown])

    return (
        <Card shadowType="profile" noPadding>
            <div className="border border-[#6B728050] rounded-[5px]">
                <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                    <div>
                        <Typography semibold>
                            <span className="text-[15px]">{title}</span>
                        </Typography>
                    </div>
                    <div className="flex items-center gap-x-1.5">
                        {onAddData ? (
                            <div
                                onClick={onAddData}
                                className="cursor-pointer border border-[#6B7280] w-6 h-6 rounded-[5px] shadow-profiles2 flex justify-center items-center"
                            >
                                <AiOutlinePlus />
                            </div>
                        ) : null}
                        <div
                            onClick={() => {
                                setIsDropdown(!isDropdown)
                            }}
                            className="cursor-pointer border border-[#6B7280] w-6 h-6 rounded-[5px] shadow-profiles2 flex justify-center items-center"
                        >
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>
                <div
                    className={` ${
                        isDropdown ? 'max-h-[450px] p-2.5' : 'max-h-0 '
                    } transition-all duration-500 overflow-hidden`}
                >
                    {children}
                </div>
            </div>
        </Card>
    )
}
