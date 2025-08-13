import { Button, ShowErrorNotifications, TextArea } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const DeclineStudentFromInd = ({
    workplaceId,
    redirect,
    onCancel,
}: {
    redirect?: boolean
    workplaceId: number
    onCancel?: () => void
}) => {
    const router = useRouter()

    const { notification } = useNotification()

    const [updateStatus, updateStatusResult] =
        SubAdminApi.Workplace.updateWpIndustryStatus()

    const validationSchema = Yup.object({
        comment: Yup.string().required('Message is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const res: any = await updateStatus({
            id: Number(workplaceId),
            status: 'decline',
            ...values,
        })

        if (res?.data) {
            notification.success({
                title: 'Comment Added',
                description: 'Comment Added Successfully',
            })
            if (redirect) {
                router.push('/')
            }
            if (onCancel) {
                onCancel()
            }
        }
    }
    return (
        <div>
            <ShowErrorNotifications result={updateStatusResult} />
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextArea
                            label={
                                'Please provide a message why rejecting the student'
                            }
                            name={'comment'}
                            placeholder={
                                'Please provide a message why rejecting the student...'
                            }
                            validationIcons
                            required
                            rows={7}
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            submit
                            loading={updateStatusResult.isLoading}
                            disabled={updateStatusResult.isLoading}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
