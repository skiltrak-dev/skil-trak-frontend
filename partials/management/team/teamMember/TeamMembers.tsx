import React, { ReactElement, useState } from 'react'
import {
    Button,
    GlobalModal,
    LoadingAnimation,
    NoData,
    Select,
    TechnicalError,
    Typography,
} from '@components'
import { TeamMemberCard } from './components/TeamMemberCard'
import { AddNewTeamMemberModal } from '../modal'
import { ManagementApi } from '@queries'
import { useRouter } from 'next/router'

export const TeamMembers = ({ data }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [createTeamMember, createTeamMembersResult] =
        ManagementApi.Team.useCreateTeamMembers()

    // useTeamMembersList
    

    const onCancel = () => {
        setModal(null)
    }
    // const onChangeTeamLead = () => {
    //     // if (applyForTalentPoolResult.isSuccess) {
    //     setModal(
    //         <GlobalModal>
    //             <ChangeTeamLeadModal onCancel={onCancel} />
    //         </GlobalModal>
    //     )
    //     // }
    // }
    const onAddNewMember = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <AddNewTeamMemberModal
                    onCancel={onCancel}
                    // createTeamMember={createTeamMember}
                    // createTeamMembersResult={createTeamMembersResult}
                    teamId={router?.query?.id}
                    teamLead={data?.data?.members?.find((m: any) => m?.isLead)}
                />
            </GlobalModal>
        )
        // }
    }
    return (
        <>
            {modal && modal}
            <div className="bg-white/80 p-6 rounded-lg w-full">
                <div className="mb-5 flex items-center justify-between w-full border-b pb-2">
                    <Typography variant="subtitle" color="text-primaryNew" bold>
                        Team Members
                    </Typography>
                    <div className="flex items-center gap-x-4">
                        {/* <button
                            onClick={onChangeTeamLead}
                            className="text-blue-500 font-medium text-sm uppercase underline"
                        >
                            change team lead
                        </button>
                        <div className="h-5 w-[1px] border-r-2 border-dashed border-gray-400"></div> */}
                        <button
                            onClick={onAddNewMember}
                            className="text-blue-500 font-medium text-sm uppercase underline"
                        >
                            + ADD NEW TEAM MEMBER
                        </button>
                    </div>
                </div>
                <div className="h-screen overflow-auto custom-scrollbar">
                    {data?.isError && <TechnicalError />}
                    {data?.isLoading ? (
                        <>
                            <LoadingAnimation />
                        </>
                    ) : data?.data?.members &&
                      data?.data?.members?.length > 0 ? (
                        <div className="grid md:grid-cols-4 grid-cols-1 gap-2.5 overflow-auto remove-scrollbar !h-[calc(100%-200px)]">
                            {data?.data?.members?.map((member: any) => (
                                <div key={member?.id}>
                                    <TeamMemberCard member={member} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        !data?.isError && (
                            <NoData text={'No Team Member Found'} />
                        )
                    )}
                </div>
            </div>
        </>
    )
}
