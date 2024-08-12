import * as Yup from 'yup'
import { useEffect } from 'react'
import { Modal } from '@components/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ShowErrorNotifications, TextArea } from '@components'

// queries
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { FcCancel } from 'react-icons/fc'

interface onSubmitType {
    note: string
}

export const CancelWorkplaceRequestModal = ({
    onCancel,
    workplaceId,
}: {
    workplaceId: number
    onCancel: Function
}) => {
    const { notification } = useNotification()

    const [cancelWorkplace, cancelWorkplaceResult] =
        SubAdminApi.Workplace.useCancelRequestWP()

    useEffect(() => {
        if (cancelWorkplaceResult.isSuccess) {
            notification.success({
                title: 'Workplace Cancelled Request Sent',
                description:
                    'Your request has been submitted to the SkilTrak Admin Once approved, the workplace request will be canceled.',
            })
            onCancel()
        }
    }, [cancelWorkplaceResult])

    const validationSchema = Yup.object({
        note: Yup.string().required(
            'Please provide the reason for canceling the workplace request'
        ),
    })

    const methods = useForm<onSubmitType>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: onSubmitType) => {
        cancelWorkplace({
            id: Number(workplaceId),
            comment: values?.note,
        })
    }

    return (
        <div>
            <ShowErrorNotifications result={cancelWorkplaceResult} />
            <Modal
                title={'Request for Workplace Cancellation'}
                subtitle={''}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={cancelWorkplaceResult.isLoading}
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
                                    Please provide the reason for canceling the
                                    workplace request
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
    )
}
