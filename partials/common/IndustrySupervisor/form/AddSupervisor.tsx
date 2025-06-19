import React, { useContext, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Select, ShowErrorNotifications } from '@components'

// components
import { Typography, Button, TextInput } from '@components'

// query
import { IndustryApi, RtoApi } from '@queries'
import { useContextBar, useNotification } from '@hooks'
import { SupervisorQualification } from '../data'
import { OptionType } from '@types'

export const AddSupervisor = ({
    industry,
    initialValues,
    edit,
    sector,
}: any) => {
    const { notification } = useNotification()
    const { hide, setContent, setTitle } = useContextBar()

    const [selectedQualification, setSelectedQualification] = useState<
        number | null
    >(null)

    useEffect(() => {
        if (initialValues?.level) {
            setSelectedQualification(initialValues?.level)
        }
    }, [initialValues])

    const [addSupervisor, addSupervisorResult] =
        IndustryApi.Supervisor.addSupervisor()
    const [editSupervisor, editSupervisorResult] =
        IndustryApi.Supervisor.editSupervisor()

    useEffect(() => {
        if (addSupervisorResult.isSuccess) {
            notification.success({
                title: 'Supervisor Added',
                description: 'Supervisor Added Successfully',
            })
            hide()
            setContent(null)
            setTitle('')
        }
    }, [addSupervisorResult])

    useEffect(() => {
        if (editSupervisorResult.isSuccess) {
            notification.success({
                title: 'Supervisor Updated',
                description: 'Supervisor Updated Successfully',
            })
            hide()
        }
    }, [editSupervisorResult])

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
        // email: Yup.string().required('Email is required!'),
        level: Yup.number().required('Qualification is required!'),
        title: Yup.string().required('Course Title is required!'),
    })

    const methods = useForm({
        mode: 'all',
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (values: any) => {
        edit
            ? editSupervisor({
                  ...values,
                  industry: industry?.id,
              })
            : addSupervisor({
                  ...values,
                  industry: industry?.id,
                  sector: sector?.id,
              })
    }

    const isLoading = edit
        ? editSupervisorResult.isLoading
        : addSupervisorResult.isLoading

    return (
        <div>
            <ShowErrorNotifications result={addSupervisorResult} />
            <ShowErrorNotifications result={editSupervisorResult} />
            <Typography variant={'small'} color={'text-gray-500'}>
                {edit ? 'Edit' : 'Add'} Supervisor:
            </Typography>

            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Your Name Here...'}
                            validationIcons
                            required
                        />

                        <div className="relative z-30">
                            <Select
                                name="level"
                                label={'Qualification'}
                                options={SupervisorQualification}
                                onlyValue
                                onChange={(e: number) => {
                                    setSelectedQualification(e)
                                }}
                                value={SupervisorQualification?.find(
                                    (l: OptionType) =>
                                        l.value === selectedQualification
                                )}
                                // menuPlacement="top"
                            />
                        </div>

                        <TextInput
                            label={'Course Title'}
                            name={'title'}
                            placeholder={'Your Course Title Here...'}
                            validationIcons
                            required
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            submit
                            loading={isLoading}
                            disabled={isLoading}
                            variant={edit ? 'secondary' : 'primary'}
                        >
                            {edit ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
