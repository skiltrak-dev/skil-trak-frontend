import { Button, Select, TextInput, Typography } from '@components'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdClose } from 'react-icons/md'
import { ManagementApi } from '@queries'
import { TeamMemberTag } from '../teamMember'
import { useNotification } from '@hooks'

type AddNewTeamMemberModalProps = {
    // createTeamMembersResult: any
    onCancel: any
    // createTeamMember: any
    teamId?: any
    teamLead?: any
}
export const AddNewTeamMemberModal = ({
    onCancel,
    // createTeamMembersResult,
    // createTeamMember,
    teamId,
    teamLead,
}: AddNewTeamMemberModalProps) => {
    const [teamMembers, setTeamMembers] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { notification } = useNotification()
    const [createTeamMember, createTeamMembersResult] =
    ManagementApi.Team.useCreateTeamMembers()
    const { data, isLoading } = ManagementApi.Team.useSubAdminList()
    const subAdminOptions = data?.map((subAdmin: any) => ({
        label: `${subAdmin?.user?.name}`,
        value: subAdmin?.id,
    }))

    useEffect(() => {
        if (createTeamMembersResult.isSuccess) {
            notification.success({
                title: 'Team Member Added',
                description: 'Team Members Added Successfully',
            })
            methods.reset()
            onCancel()
        }
    }, [createTeamMembersResult])
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
        subadmin: yup.string().required('Select Coordinator'),
        isLead: yup.boolean().required('Position is required'),
    })
    const methods = useForm({
        mode: 'all',
        // resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })
    const onSubmit = (data: any) => {
        setTeamMembers([...teamMembers, data])
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
                    className="mt-2 max-w-[480px]"
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
                            options={subAdminOptions?.filter(
                                (m: any) =>
                                    !teamMembers
                                        ?.map((t: any) => +t?.subadmin)
                                        ?.includes(m?.value)
                            )}
                            label={'Name'}
                            shadow="shadow-lg"
                            loading={isLoading}
                            onlyValue
                        />
                        {/* subAdminOptions */}
                        <Select
                            name="isLead"
                            options={
                                teamMembers?.find((t: any) => t?.isLead) ||
                                teamLead
                                    ? teamPositionOptions?.slice(1)
                                    : teamPositionOptions
                            }
                            defaultValue={false}
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
                        // teamMembers={subAdminOptions?.filter((m: any) =>
                        //     teamMembers
                        //         ?.map((t: any) => +t?.subadmin)
                        //         ?.includes(m?.value)
                        // )}
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
