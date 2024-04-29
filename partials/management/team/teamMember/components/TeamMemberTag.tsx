import { Typography } from '@components'
import React from 'react'
import { MdClose } from 'react-icons/md'

export const TeamMemberTag = ({ teamMembers, removeTeamMember }: any) => {
    return (
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mb-4">
            {teamMembers?.map((member: any, index: number) => (
                <div key={index} className="">
                    <div className="bg-[#F5F4FF] border-2 border-dashed py-2 px-3 rounded-md flex justify-between w-full gap-x-4 items-center">
                        <div className="flex flex-col gap-1">
                            <Typography
                                variant="label"
                                color="text-primaryNew"
                                medium
                            >
                                {member?.subadmin || 'N/A'}
                            </Typography>
                            <Typography variant="small" uppercase>
                                {member?.isLead ? 'Team Lead' : 'Coordinator'}
                            </Typography>
                        </div>
                        <div
                            onClick={() => {
                                removeTeamMember(index)
                            }}
                            className="cursor-pointer"
                        >
                            <MdClose
                                className="font-bold text-primaryNew"
                                size={20}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
