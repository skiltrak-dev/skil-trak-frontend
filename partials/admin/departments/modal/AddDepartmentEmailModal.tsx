import { useState } from 'react'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { Modal, ShowErrorNotifications, TextInput } from '@components'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const AddDepartmentEmailModal = ({
    onCancel,
    departmentId,
    deptName,
    deptEmail,
}: {
    deptName: string
    deptEmail: string
    departmentId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        name: Yup.string().required('Name is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: { name: deptName, email: deptEmail },
    })

    const [updateDepartment, updateDepartmentResult] =
        AdminApi.Department.updateDepartment()

    const onConfirm = async (values: any) => {
        const res: any = await updateDepartment({
            ...values,
            departmentId,
        })

        if (res?.data) {
            notification.success({
                title: 'Email Updated',
                description: 'Email Updated Successfully',
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={updateDepartmentResult} />
            <Modal
                title="Update Department"
                subtitle=" "
                onCancelClick={onCancel}
                onConfirmClick={methods.handleSubmit(onConfirm)}
                loading={updateDepartmentResult?.isLoading}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <div className="">
                            <TextInput
                                label={'Name'}
                                name={'name'}
                                placeholder={'Your Name Here...'}
                                validationIcons
                                required
                            />
                            <TextInput
                                label={'Email'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Your Email Here...'}
                                validationIcons
                                required
                            />
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
