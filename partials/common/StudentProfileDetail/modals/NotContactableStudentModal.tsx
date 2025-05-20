import { Modal, ShowErrorNotifications, TextArea } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import { MdSnooze } from 'react-icons/md'
import * as Yup from 'yup'

export const NotContactableStudentModal = ({
    onCancel,
    studentId,
}: {
    studentId: number
    onCancel: () => void
}) => {
    const [notContactable, notContactableResult] =
        SubAdminApi.Student.useNotContactable()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        comment: Yup.string().required('Please provide the note'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        notContactable({
            id: studentId,
            ...values,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Student Snoozed',
                    description: 'Student Snoozed Successfully',
                })
                onCancel()
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={notContactableResult} />
            <Modal
                titleIcon={MdSnooze}
                title="Snooze Student"
                onCancelClick={onCancel}
                subtitle="Snooze Student"
                loading={notContactableResult.isLoading}
                onConfirmClick={methods.handleSubmit(onSubmit)}
            >
                <FormProvider {...methods}>
                    <form className="w-full">
                        <TextArea
                            label={'Provide Note Please'}
                            required
                            name={'comment'}
                            placeholder={'reason...'}
                            rows={5}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
