import React, { useState } from 'react'
import { Button, Select, Typography } from '@components'
import { ManagementApi } from '@queries'
import { useRouter } from 'next/router'

export const ChangeTeamLeadModal = ({ onCancel, member }: any) => {
    const router = useRouter()
    const teamId = router?.query?.id
    const [subAdminId, setSubAdminId] = useState<any>(null)
    const [changeTeamLead, changeTeamLeadResult] =
        ManagementApi.Team.useChangeTeamLead()
    const { data, isLoading, isError } = ManagementApi.Team.useTeamMembersList(
        teamId,
        {
            skip: !teamId,
        }
    )
    const subAdminOptions = data
        ?.filter((member: any) => !member?.isLead)
        ?.map((member: any) => ({
            label: `${member?.subadmin?.user?.name}`,
            value: member?.id,
        }))

    return (
        <div className="pb-9 pt-5 px-5">
            <div className="mb-12 flex justify-center">
                <Typography
                    variant="label"
                    color="text-primaryNew"
                    uppercase
                    bold
                >
                    Change Team Lead
                </Typography>
            </div>

            <div className="min-w-[447px]">
                <Select
                    name="subadmin"
                    options={subAdminOptions}
                    label={'TEAM LEAD'}
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
                    text="change"
                    onClick={() => {
                        changeTeamLead(subAdminId)
                        if (changeTeamLeadResult.isSuccess) {
                            onCancel()
                        }
                    }}
                    loading={changeTeamLeadResult.isLoading}
                    disabled={changeTeamLeadResult.isLoading}
                />
                <Button variant={'error'} text="Close" onClick={onCancel} />
            </div>
        </div>
    )
}
