import { GlobalModal, Typography } from '@components'
import Image from 'next/image'
import React, { ReactElement, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { BsPatchCheckFill } from 'react-icons/bs'
import { RiExchangeLine } from "react-icons/ri";

type TeamMemberAvatarProps = {
    avatarUrl?: string
    isLead?: boolean
    onChangeTeamLead?: any
    onSwitchMemberTeam?: any
    name: string
}
export const TeamMemberAvatar = ({
    avatarUrl,
    onChangeTeamLead,
    onSwitchMemberTeam,
    isLead,
    name,
}: TeamMemberAvatarProps) => {
    // const [modal, setModal] = useState<ReactElement | null>(null)
    // const onCancel = () => {
    //     setModal(null)
    // }
    // const onChangeTeamLead = () => {
    //     // if (applyForTalentPoolResult.isSuccess) {
    //     setModal(
    //         <GlobalModal>
    //             <ChangeTeamLeadModal onCancel={onCancel} />
    //         </GlobalModal>
    //     )
    //     // }
    // }
    return (
        <>
            {/* {modal && modal} */}
            <div>
                <div className="flex flex-col justify-center items-center gap-y-5 w-full">
                    <div className="relative">
                        <Image
                            src={`${
                                avatarUrl ||
                                '/images/management-portal/empty-avatar.jpg'
                            } `}
                            height={100}
                            width={100}
                            alt="avatar image"
                            className="rounded-lg h-20"
                        />
                        {isLead ? (
                            <div
                                onClick={onChangeTeamLead}
                                className="cursor-pointer absolute -bottom-1 -right-2"
                            >
                                <FaEdit className="text-blue-600" size={16} />
                            </div>
                        ) : (
                            onSwitchMemberTeam && (
                                <div
                                    onClick={onSwitchMemberTeam}
                                    className="cursor-pointer absolute -bottom-1 -right-2"
                                >
                                    <RiExchangeLine
                                        className="text-blue-600"
                                        size={25}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2 justify-center whitespace-nowrap">
                            <Typography variant="title" bold center uppercase>
                                {name || 'N/A'}
                            </Typography>
                            {isLead && (
                                <BsPatchCheckFill
                                    className="text-blue-500"
                                    size={18}
                                />
                            )}
                        </div>
                        <Typography
                            variant="subtitle"
                            color="text-primaryNew"
                            medium
                            uppercase
                            center
                        >
                            {isLead ? 'Team Lead' : 'Coordinator' || 'N/A'}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
