import {
    Button,
    Card,
    InputContentEditor,
    Select,
    TextInput,
    inputEditorErrorMessage,
} from '@components'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi, SubAdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { OptionType } from '@types'

enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export const AddTicketForm = ({
    result,
    onSubmit,
    students,
    subadmins,
}: {
    result: any
    onSubmit: (values: any) => void
    students: any
    subadmins: any
}) => {
    const validationSchema = yup.object({
        assignedTo: yup.number().required('Must provide Assign To'),
        subject: yup.string().required('Must provide Subject'),
        // message: yup.string().,
        message: yup
            .mixed()
            .test('Message', 'Must Provide Message', (value) =>
                inputEditorErrorMessage(value)
            ),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const priorityOptions = [
        ...Object.entries(Priority).map(([label, value]) => ({
            label,
            value,
        })),
    ]

    const studentsOptions = students?.data?.length
        ? students?.data?.map((student: any) => ({
              label: student?.user?.name,
              value: student?.id,
          }))
        : []

    const subAdminOptions = subadmins?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.user?.id,
    }))
    return (
        <div>
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
                            <Select
                                label={'Assign TO'}
                                name={'assignedTo'}
                                placeholder={'Assign TO...'}
                                options={subAdminOptions}
                                loading={subadmins?.isLoading}
                                disabled={subadmins?.isLoading}
                                onlyValue
                            />
                            <Select
                                label={'Link Student (Optional)'}
                                name={'student'}
                                placeholder={'Link Student (Optional)'}
                                options={studentsOptions}
                                onlyValue
                                loading={students.isLoading}
                                disabled={students?.isLoading}
                            />
                            <Select
                                label={'Priority'}
                                name={'priority'}
                                placeholder={'Priority...'}
                                options={priorityOptions}
                                onlyValue
                            />
                        </div>
                        <TextInput
                            label={'Subject'}
                            name={'subject'}
                            placeholder={'Subject...'}
                            validationIcons
                            required
                        />

                        <InputContentEditor
                            name={'message'}
                            label={'Message'}
                        />

                        <Button
                            submit
                            text={'Open Ticket'}
                            variant={'dark'}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
