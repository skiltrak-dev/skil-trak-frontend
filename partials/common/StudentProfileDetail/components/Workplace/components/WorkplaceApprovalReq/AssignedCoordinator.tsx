import { Typography } from '@components'
import { SubAdmin } from '@types'
import React from 'react'

export const AssignedCoordinator = ({
    assignedTo,
}: {
    assignedTo: SubAdmin
}) => {
    return (
        <>
            <Typography variant="small" medium>
                Assigned Coordinator
            </Typography>
            <div className="p-3 flex flex-col bg-[#E6F2FE] border border-[#D5D5D5] rounded-md">
                {/* <div className="flex justify-between w-full"> */}
                <Typography variant="small" medium color="text-[#333333]">
                    {assignedTo?.user?.name}
                </Typography>
                <Typography variant="xxs" medium color="text-[#24556D]">
                    {assignedTo?.user?.email}
                </Typography>
                <Typography variant="xxs" medium color="text-[#24556D]">
                    {assignedTo?.phone}
                </Typography>
                {/* </div> */}
            </div>
        </>
    )
}
