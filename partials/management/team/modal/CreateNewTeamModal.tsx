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
}
export const CreateNewTeamModal = ({
    onCancel,
    onAddNewMember,
}: CreateNewTeamModalProps) => {
    const { notification } = useNotification()
    const [loading, setLoading] = useState<boolean>(false)
    const [createTeam, createTeamResult] = ManagementApi.Team.useCreateTeam()
    const getSectors = ManagementApi.Team.useSectorsList()
    // useCreateTeam
    const sectorOptions = getSectors?.data?.map((sector: any) => ({
        label: `${sector?.code} - ${sector?.name}`,
        value: sector?.id,
    }))
    useEffect(() => {
        if (createTeamResult.isSuccess) {
            notification.success({
                title: 'Team Added',
                description: 'Team Added Successfully',
            })
            onCancel()
            // router.push('/portals/management/dashboard')
        }
    }, [createTeamResult])

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        // sector: yup.number().required('Sector is required'),
        sectors: yup.array().min(1, 'Must select at least 1 sector'),
    })
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })

    const onSubmit = (data: any) => {
        createTeam({ name: data?.name, sectors: data?.sectors })
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
                                name="sectors"
                                options={sectorOptions}
                                label={'Sector'}
                                shadow="shadow-lg"
                                loading={getSectors.isLoading}
                                onlyValue
                                multi
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
