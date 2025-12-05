import { Select, ShowErrorNotifications } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import { Button, TextInput, Typography } from '@components'

// query
import { useNotification } from '@hooks'
import { IndustryApi } from '@queries'
import { OptionType } from '@types'
import { SupervisorQualification } from '../data'

export const AddSupervisor = ({
    industry,
    initialValues,
    edit,
    sector,
    onCloseModal,
}: any) => {
    const { notification } = useNotification()

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
            onCloseModal && onCloseModal()
        }
    }, [addSupervisorResult])

    useEffect(() => {
        if (editSupervisorResult.isSuccess) {
            notification.success({
                title: 'Supervisor Updated',
                description: 'Supervisor Updated Successfully',
            })
            onCloseModal && onCloseModal()
        }
    }, [editSupervisorResult])

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
        // email: Yup.string().required('Email is required!'),
        level: Yup.number().required('Qualification is required!'),
        title: Yup.string().required('Course Title is required!'),
        experience: Yup.string().required('Experience is required!'),
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
        <div className="w-full md:w-[600px]">
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
                        <TextInput
                            label={'Experience'}
                            name={'experience'}
                            placeholder={'Your Experience Here...'}
                            validationIcons
                            required
                        />
                        <TextInput
                            label={'Phone'}
                            name={'phone'}
                            placeholder={'Your Phone Here...'}
                            validationIcons
                            required
                        />
                        <TextInput
                            label={'Email'}
                            name={'email'}
                            placeholder={'Your Email Here...'}
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
