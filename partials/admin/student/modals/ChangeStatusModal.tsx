import React, { useEffect } from 'react'
import * as Yup from 'yup'

import { Student, StudentStatusEnum } from '@types'
import { Modal, Select, TextInput } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// @queries
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'

export const ChangeStatusModal = ({
    student,
    onCancel,
    setStatusSuccessResult,
}: {
    student: Student
    onCancel: Function
    setStatusSuccessResult: any
}) => {
    const [changeCurrentStatus, changeCurrentStatusResult] =
        SubAdminApi.Student.changeCurrentStatus()

    const { notification } = useNotification()

    useEffect(() => {
        if (changeCurrentStatusResult.isSuccess) {
            notification.success({
                title: 'Status Changes',
                description: 'Status Changed Successfully',
            })
            onCancel()
            setStatusSuccessResult(changeCurrentStatusResult.isSuccess)
        }
    }, [changeCurrentStatusResult])

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

    const studentStatusOptions = [
        {
            label: 'Completed',
            value: StudentStatusEnum.COMPLETED,
        },
        {
            label: 'Active',
            value: StudentStatusEnum.ACTIVE,
        },
        {
            label: 'Terminated',
            value: StudentStatusEnum.TERMINATED,
        },
        {
            label: 'Cancelled',
            value: StudentStatusEnum.CANCELLED,
        },
    ]

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
                                options={studentStatusOptions}
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
