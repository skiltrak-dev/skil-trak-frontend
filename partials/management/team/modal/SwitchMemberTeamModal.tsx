import React, { useEffect, useState } from 'react'
import { Button, Select, Typography } from '@components'
import { ManagementApi } from '@queries'
import { useRouter } from 'next/router'
import { useNotification } from '@hooks'

export const SwitchMemberTeamModal = ({ onCancel, member }: any) => {
    const router = useRouter()
    const { notification } = useNotification()
    const teamId = router?.query?.id
    const [subAdminId, setSubAdminId] = useState<any>(null)
    const [changeTeamLead, changeTeamLeadResult] =
        ManagementApi.Team.useUpdateMemberTeam()
    const { data, isLoading, isError } = ManagementApi.Team.useTeamList()
    const teamOptions = data?.map((team: any) => ({
        label: `${team?.name}`,
        value: team?.id,
    }))

    // filter over team to make sure not same team of current user
    const currentTeamId = member?.team?.id
    const filteredTeamOptions = teamOptions?.filter(
        (team: any) => team?.value !== currentTeamId
    )

    useEffect(() => {
        if (changeTeamLeadResult.isSuccess) {
            notification.success({
                title: 'Member Team switched',
                description: 'Member Team switched Successfully',
            })
            onCancel()
        }
    }, [changeTeamLeadResult])

    return (
        <div className="pb-9 pt-5 px-5">
            <div className="mb-12 flex justify-center">
                <Typography
                    variant="label"
                    color="text-primaryNew"
                    uppercase
                    bold
                >
                    Switch Team
                </Typography>
            </div>

            <div className="min-w-[447px]">
                <Select
                    name="team"
                    options={filteredTeamOptions}
                    label={'TEAMS'}
                    shadow="shadow-md"
                    loading={isLoading}
                    onChange={(e: any) => {
                        setSubAdminId(e?.value)
                    }}
                />
            </div>
            <div className="flex justify-center items-center gap-x-2">
                <Button
                    variant="primaryNew"
                    text="switch"
                    onClick={() => {
                        changeTeamLead({
                            id: router?.query?.memberId,
                            body: { team: subAdminId },
                        })
                    }}
                    loading={changeTeamLeadResult.isLoading}
                    disabled={changeTeamLeadResult.isLoading}
                />
                <Button variant={'error'} text="Close" onClick={onCancel} />
            </div>
        </div>
    )
}
