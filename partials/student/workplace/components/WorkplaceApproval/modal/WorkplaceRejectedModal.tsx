import { Modal, ShowErrorNotifications, TextArea } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { useState } from 'react'
import { WPApprovalStatus } from '../enum'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { FcCancel } from 'react-icons/fc'
import * as Yup from 'yup'

interface onSubmitType {
    note: string
}

export const WorkplaceRejectedModal = ({
    onCancel,
    wpApprovalId,
}: {
    wpApprovalId: number
    onCancel: (val?: boolean) => void
}) => {
    const [changeStatus, changeStatusResult] =
        SubAdminApi.Workplace.changeWpReqStatus()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        note: Yup.string().required(
            'Please provide the comment for canceling the workplace request'
        ),
    })

    const methods = useForm<onSubmitType>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const res: any = await changeStatus({
            id: wpApprovalId,
            comment: values?.note,
            status: WPApprovalStatus.Rejected,
        })

        if (res?.data) {
            notification.success({
                title: 'Status Changed',
                description: 'Status Changed Successfully',
            })
            onCancel(true)
        }
    }

    return (
        <>
            <div>
                <ShowErrorNotifications result={changeStatusResult} />
                <Modal
                    title={'Comment'}
                    subtitle={''}
                    onConfirmClick={methods.handleSubmit(onSubmit)}
                    onCancelClick={onCancel}
                    loading={changeStatusResult.isLoading}
                    titleIcon={FcCancel}

                    // disabled={
                    //     !password.password ||
                    //     !password.confirmPassword ||
                    //     password.password !== password.confirmPassword
                    // }
                >
                    <FormProvider {...methods}>
                        <form className="w-full">
                            <TextArea
                                label={
                                    <span className={'text-xs'}>
                                        Please provide the comment for canceling
                                        the request
                                    </span>
                                }
                                required
                                name={'note'}
                                placeholder={'reason...'}
                                rows={5}
                            />
                        </form>
                    </FormProvider>
                </Modal>
            </div>
        </>
    )
}
