import { Modal, ShowErrorNotifications, TextArea } from '@components'
import React from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAssignToSubAdminMutation } from '@queries'
import { useNotification } from '@hooks'

interface onSubmitType {
    note: string
}

export const CoordinatorChangeModal = ({
    appliedIndustryId,
    workplaceId,
    subadminId,
    onCancel,
}: {
    appliedIndustryId: number
    workplaceId: number
    subadminId?: number
    onCancel: () => void
}) => {
    const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        note: Yup.string().required('Note is required'),
    })
    const methods = useForm<onSubmitType>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    const onSubmit = (values: any) => {
        assignToMe({
            industry: appliedIndustryId,
            id: workplaceId,
            subAdmin: Number(subadminId),
            comment: values?.note,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Coordinator Changed',
                    description: 'Coordinator Changed Successfully',
                })
                onCancel()
            }
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={assignToMeResult} />
            <Modal
                title={'Change Workplace Coordinator'}
                subtitle={'Change Workplace Coordinator'}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={assignToMeResult.isLoading}
                // disabled={
                //     !password.password ||
                //     !password.confirmPassword ||
                //     password.password !== password.confirmPassword
                // }
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <TextArea
                            label={'Add Note'}
                            name={'note'}
                            placeholder={'Add Note'}
                            showError={false}
                            rows={7}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
