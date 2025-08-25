import { Modal, ShowErrorNotifications, TextArea } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { Industry, UserStatus } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const BlockModal = ({
    industry,
    onCancel,
}: {
    onCancel: () => void
    industry: Industry | undefined | null
}) => {
    const { notification } = useNotification()

    const [block, blockResult] =
        SubAdminApi.Industry.changeIndustryStatusChange()

    const onConfirmUClicked = async (values: any) => {
        const res: any = await block({
            id: Number(industry?.user?.id),
            status: UserStatus.Blocked,
            ...values,
        })
        if (res?.data) {
            notification.warning({
                title: `Request Sent`,
                description: `Industry block request sent for approval.`,
            })
            onCancel()
        }
    }

    const validationSchema = Yup.object({
        comment: Yup.string().required('Comment is required'),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    return (
        <>
            <ShowErrorNotifications result={blockResult} />
            <Modal
                title="Block Industry"
                onCancelClick={onCancel}
                loading={blockResult?.isLoading}
                onConfirmClick={methods.handleSubmit(onConfirmUClicked)}
                subtitle={`You are about to block "${industry?.user?.name}". Do you wish to continue?`}
            >
                <FormProvider {...methods}>
                    <form className="w-full">
                        <TextArea
                            required
                            rows={5}
                            name="comment"
                            label={'Comment'}
                        />
                    </form>
                </FormProvider>
            </Modal>
            {/* <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to block "${industry?.user?.name}". Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.user?.email}
                actionObject={industry}
                loading={blockResult.isLoading}
            /> */}
        </>
    )
}
