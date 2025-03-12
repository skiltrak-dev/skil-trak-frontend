import * as Yup from 'yup'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { MdSnooze } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import {
    Modal,
    RadioButton,
    RadioGroup,
    ShowErrorNotifications,
    TextArea,
    TextInput,
    Typography,
} from '@components'

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
        isReported: Yup.string().required('Please select the option'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        const isReported = values?.isReported === 'yes' ? true : false
        const body = {
            isReported: isReported,
            comment: values?.comment,
        }
        problamaticStudent({ studentId, body }).then((res: any) => {
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
                        <Typography variant="small" italic semibold>
                            Do you want to report this to the Training
                            Organization?
                        </Typography>
                        <div className="flex items-center gap-x-4 mt-4">
                            <RadioGroup
                                // label={'aaaa'}
                                name="isReported"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                                required
                            />
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
