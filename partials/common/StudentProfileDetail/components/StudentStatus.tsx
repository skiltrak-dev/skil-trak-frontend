import { Typography } from '@components'
import { StudentStatusEnum } from '@types'
import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

export const StudentStatus = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const studentStatusOptions = [
        {
            label: 'Completed',
            value: StudentStatusEnum.COMPLETED,
        },
        {
            label: 'Active',
            value: StudentStatusEnum.ACTIVE,
        },
        {
            label: 'Terminated',
            value: StudentStatusEnum.TERMINATED,
        },
        {
            label: 'Cancelled',
            value: StudentStatusEnum.CANCELLED,
        },
    ]
    return (
        <div className="border-y border-[#E6E6E6] py-3 mt-3.5">
            <Typography variant="small" medium>
                Student Status
            </Typography>

            <div className="w-fit mt-2 relative">
                <div
                    onClick={() => {
                        setIsOpened(!isOpened)
                    }}
                    className="cursor-pointer px-4 py-2.5 w-fit flex justify-evenly gap-x-2 rounded-md border border-[#128C7E]"
                >
                    <Typography variant="small" color="text-[#128C7E]" semibold>
                        ACTIVE
                    </Typography>
                    <IoIosArrowDown />
                </div>
                <div
                    className={`w-auto px-2 bg-white shadow-md rounded-md absolute top-full left-0 overflow-hidden transition-all duration-500 ${
                        isOpened ? 'max-h-40' : 'max-h-0'
                    }`}
                >
                    {studentStatusOptions.map((status, index) => (
                        <div
                            className="border-b border-gray-100 py-1"
                            key={index}
                        >
                            <Typography variant="small" medium>
                                {status.label}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
