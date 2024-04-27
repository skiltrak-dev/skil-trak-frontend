import {
    Button,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthApi, ManagementApi } from '@queries'
import { useNotification } from '@hooks'
type CreateNewTeamModalProps = {
    onCancel: any
    onAddNewMember?: any
    createTeam: any
    createTeamResult: any
}
export const CreateNewTeamModal = ({
    onCancel,
    onAddNewMember,
    createTeam,
    createTeamResult,
}: CreateNewTeamModalProps) => {
    const { notification } = useNotification()
    const getSectors = AuthApi.useSectors({})
    // useCreateTeam
    const sectorOptions = getSectors.data?.map((sector: any) => ({
        label: `${sector?.code} - ${sector?.name}`,
        value: sector.id,
    }))
    useEffect(() => {
        if (createTeamResult.isSuccess) {
            notification.success({
                title: 'Team Added',
                description: 'Team Added Successfully',
            })
            onCancel()
            // router.push('/portals/management/dashboard')
        } else {
            notification.error({
                title: 'Error While Creating Team',
                description: 'Error while creating team try again later',
            })
        }
    }, [createTeamResult])

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        sector: yup.number().required('Sector is required'),
    })
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })

    const onSubmit = (data: any) => {
        createTeam({ name: data.name, sector: data.sector })
        methods.reset()
    }

    return (
        <>
            <ShowErrorNotifications result={createTeamResult} />
            <div className="pb-9 pt-10 px-5">
                <div className="mb-12 flex justify-center">
                    <Typography
                        variant="title"
                        color="text-primaryNew"
                        uppercase
                        bold
                    >
                        Create New Team
                    </Typography>
                </div>
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="min-w-[495px]">
                            <TextInput
                                name="name"
                                label={'Enter Team Name'}
                                shadow="shadow-lg"
                            />
                            <Select
                                name="sector"
                                options={sectorOptions}
                                label={'Sector'}
                                shadow="shadow-lg"
                                onlyValue
                            />
                        </div>

                        <div className="flex justify-center gap-x-2">
                            <Button
                                variant="primaryNew"
                                text="Create Team"
                                disabled={createTeamResult.isLoading}
                                loading={createTeamResult.isLoading}
                                submit
                            />
                            <Button
                                variant="error"
                                text="Cancel"
                                onClick={onCancel}
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}
