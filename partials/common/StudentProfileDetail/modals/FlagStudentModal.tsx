import * as Yup from 'yup'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { MdSnooze } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Modal, ShowErrorNotifications, TextArea, TextInput } from '@components'

export const FlagStudentModal = ({
    onCancel,
    studentId,
}: {
    studentId: number
    onCancel: () => void
}) => {
    const [problamaticStudent, problamaticStudentResult] =
        SubAdminApi.Student.useProblamaticStudent()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        comment: Yup.string().required('Please provide the note'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        problamaticStudent({ studentId, ...values }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Mark As Flaged',
                    description: `Marked As Flaged`,
                })
                onCancel()
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={problamaticStudentResult} />
            <Modal
                titleIcon={MdSnooze}
                title="Flagged Student"
                onCancelClick={onCancel}
                subtitle="Flagged Student"
                loading={problamaticStudentResult.isLoading}
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
