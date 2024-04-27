import { Button, Select, TextInput, Typography } from '@components'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdClose } from 'react-icons/md'
import { ManagementApi } from '@queries'
import { TeamMemberTag } from '../teamMember'

type AddNewTeamMemberModalProps = {
    createTeamMembersResult: any
    onCancel: any
    createTeamMember: any
    teamId?: any
}
export const AddNewTeamMemberModal = ({
    onCancel,
    createTeamMembersResult,
    createTeamMember,
    teamId,
}: AddNewTeamMemberModalProps) => {
    const [teamMembers, setTeamMembers] = useState<any>([])
    const { data, isLoading } = ManagementApi.Team.useSubAdminList()
    const subAdminOptions = data?.map((subAdmin: any) => ({
        label: `${subAdmin?.user?.name}`,
        value: subAdmin?.id,
    }))
    const teamPositionOptions = [
        {
            label: 'Team Lead',
            value: true,
        },
        {
            label: 'Coordinator',
            value: false,
        },
    ]

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        isLead: yup.boolean().required('Position is required'),
    })
    const methods = useForm({
        mode: 'all',
        // resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })
    const onSubmit = (data: any) => {
        setTeamMembers([...teamMembers, data])
        methods.reset()
    }

    const removeTeamMember = (indexToRemove: any) => {
        setTeamMembers((prevMembers: any) =>
            prevMembers.filter((_: any, index: any) => index !== indexToRemove)
        )
    }
    return (
        <div className="pb-9 pt-10 px-5">
            <div className="mb-12 flex justify-center">
                <Typography
                    variant="label"
                    color="text-primaryNew"
                    uppercase
                    bold
                >
                    ADD TEAM MEMBER
                </Typography>
            </div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="min-w-[447px]">
                        {/* <TextInput
                            name="name"
                            label={'Name'}
                            shadow="shadow-lg"
                        /> */}
                        <Select
                            name="subadmin"
                            options={subAdminOptions}
                            label={'Name'}
                            shadow="shadow-lg"
                            onlyValue
                        />
                        {/* subAdminOptions */}
                        <Select
                            name="isLead"
                            options={teamPositionOptions}
                            label={'POSITION'}
                            shadow="shadow-lg"
                            onlyValue
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="text-blue-500 font-medium text-sm uppercase underline py-6"
                        >
                            + ADD NEW TEAM MEMBER
                        </button>
                    </div>
                    <TeamMemberTag
                        teamMembers={teamMembers}
                        removeTeamMember={removeTeamMember}
                    />
                    <div className="flex justify-center items-center gap-x-2">
                        <Button
                            variant="primaryNew"
                            text="save"
                            disabled={
                                teamMembers?.length === 0 ||
                                createTeamMembersResult.isLoading
                            }
                            loading={createTeamMembersResult.isLoading}
                            onClick={() => {
                                createTeamMember({
                                    id: teamId,
                                    body: { members: teamMembers },
                                })
                                if (createTeamMembersResult.isSuccess) {
                                    onCancel()
                                }
                            }}
                        />
                        <Button
                            variant={'error'}
                            text="Close"
                            onClick={onCancel}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
