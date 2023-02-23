import React from 'react'
import * as Yup from 'yup'

import { Student } from '@types'
import { Modal, Select, TextInput } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// @queries
import { SubAdminApi } from '@queries'

export const ChangeStatusModal = ({
    student,
    onCancel,
}: {
    student: Student
    onCancel: Function
}) => {
    const [changeCurrentStatus, changeCurrentStatusResult] =
        SubAdminApi.Student.changeCurrentStatus()

    const validationSchema = Yup.object({
        status: Yup.string().required('Status is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onStatusChange = (values: any) => {
        changeCurrentStatus({ ...values, id: student?.user?.id })
    }
    return (
        <div>
            <Modal
                title={'Status'}
                subtitle={`Change Status for ${student?.user?.name}`}
                onConfirmClick={methods.handleSubmit(onStatusChange)}
                onCancelClick={onCancel}
                loading={changeCurrentStatusResult.isLoading}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <div className="flex-grow w-full mb-3">
                            <Select
                                name="status"
                                options={[
                                    {
                                        label: 'Completed',
                                        value: 'completed',
                                    },
                                    {
                                        label: 'Terminated',
                                        value: 'terminated',
                                    },
                                    {
                                        label: 'Cancelled',
                                        value: 'cancelled',
                                    },
                                ]}
                                onlyValue
                                disabled={changeCurrentStatusResult.isLoading}
                            />
                        </div>
                        <TextInput
                            name={'comment'}
                            placeholder={'Add Comment'}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
