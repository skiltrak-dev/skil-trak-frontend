import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextInput, Typography } from '@components'
import { ManagementApi } from '@queries'
import { useNotification } from '@hooks'
export const EditLimitModal = ({ onCancel, targetId }: any) => {
    const [updateKpiTarget, updateKpiTargetResult] =
        ManagementApi.CheckKpi.useUpdateKpiTargetLimit()
        const {notification} = useNotification()
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
        // setTeamMembers([...teamMembers, data])
        const values = {
            body: data,
            id: targetId
        }
        updateKpiTarget(values)
        if(updateKpiTargetResult.isSuccess){
            onCancel()
            methods.reset()
        }
    }
    useEffect(() => {
        if (updateKpiTargetResult.isSuccess) {
            notification.success({
                title: 'Team Member Added',
                description: 'Team Members Added Successfully',
            })
            onCancel()
        } 
    }, [updateKpiTargetResult])
    return (
        <div className="pb-9 pt-10 px-5">
            <div className="mb-8 flex justify-center">
                <Typography
                    variant="title"
                    color="text-primaryNew"
                    uppercase
                    bold
                >
                    EDIT TARGET KPIs
                </Typography>
            </div>{' '}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <TextInput
                        name="target"
                        label={'Total KPIs'}
                        shadow="shadow-lg"
                        type="number"
                    />
                    <div className="flex items-center justify-center gap-x-2">
                        <Button variant="primaryNew" text="update" loading={updateKpiTargetResult.isLoading} disabled={updateKpiTargetResult.isLoading} submit />
                        <Button
                            variant="error"
                            text="cancel"
                            onClick={onCancel}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
