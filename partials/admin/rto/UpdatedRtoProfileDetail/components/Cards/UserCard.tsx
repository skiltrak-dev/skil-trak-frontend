import { Typography } from '@components'
import React from 'react'
import { FaRegEye } from 'react-icons/fa'
import { RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri'

export const UserCard = ({ user, actions }: { actions: any; user: any }) => {
    return (
        <div className="bg-[#F8F8FF] p-2.5 rounded-lg flex flex-col gap-y-1.5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-y-0.5">
                    <Typography variant="badge">Contact Person</Typography>
                    <Typography>
                        <span className="text-[15px]">{user?.name}</span>
                    </Typography>
                </div>

                {/* actions */}
                <div className="flex items-center gap-x-[5px]">
                    {actions?.map((act: any) => (
                        <div
                            onClick={() => {
                                act?.onClick(user)
                            }}
                            className="cursor-pointer bg-primary min-w-6 min-h-6 rounded-[5px] flex justify-center items-center"
                        >
                            <act.Icon className="text-white text-sm" />
                        </div>
                    ))}

                    {/* <div className="bg-primary min-w-6 min-h-6 rounded-[5px] flex justify-center items-center">
                        <RiDeleteBin6Line className="text-white text-sm" />
                    </div>
                    <div className="bg-primary min-w-6 min-h-6 rounded-[5px] flex justify-center items-center">
                        <RiEdit2Fill className="text-white text-sm" />
                    </div> */}
                </div>
            </div>

            {/*  */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col ">
                    <Typography variant="badge">Phone</Typography>
                    <Typography variant="xs">{user?.phone}</Typography>
                </div>
                <div className="flex flex-col ">
                    <Typography variant="badge">Email</Typography>
                    <Typography variant="xs">{user?.email}</Typography>
                </div>
            </div>
        </div>
    )
}
