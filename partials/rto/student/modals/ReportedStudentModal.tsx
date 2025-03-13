import * as Yup from 'yup'
import { RtoApi, SubAdminApi } from '@queries'
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

export const ReportedStudentModal = ({
    onCancel,
    student,
}: {
    student: any
    onCancel: () => void
}) => {
    const [problamaticStudent, problamaticStudentResult] =
        RtoApi.Students.useUpdateReportedStudentComment()
    const id = student?.id
    const { notification } = useNotification()

    const validationSchema = Yup.object({
        comment: Yup.string().required('Please provide the note'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
            comment:
                student?.statusHistory?.[student?.statusHistory?.length - 1]
                    ?.response ?? '',
        },
    })

    const onSubmit = (values: any) => {
        const comment = values?.comment
        const commentId =
            student?.statusHistory?.[student?.statusHistory?.length - 1]?.id

        problamaticStudent({ id, commentId, body: { comment: comment } }).then(
            (res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Reported Comment',
                        description: `Reported comment`,
                    })
                    onCancel()
                }
            }
        )
    }

    return (
        <>
            <ShowErrorNotifications result={problamaticStudentResult} />
            <Modal
                // titleIcon={MdSnooze}
                title="Reported Student"
                onCancelClick={onCancel}
                subtitle="Reported Student"
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
                        {/* <Typography variant="small" italic semibold>
                            Do you want to report this to the Training
                            Organization?
                        </Typography>
                        <div className="flex items-center gap-x-4 mt-4">
                            <RadioButton
                                name="isReported"
                                group
                                label={'Yes'}
                                value={true}
                            />
                            <RadioButton
                                name="isReported"
                                group
                                label={'No'}
                                value={false}
                            />
                        </div> */}
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
