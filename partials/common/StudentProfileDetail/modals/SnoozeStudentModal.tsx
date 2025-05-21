import { Modal, ShowErrorNotifications, TextArea, TextInput } from '@components'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { Student } from '@types'
import { getDate, getUserCredentials } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import { MdSnooze } from 'react-icons/md'
import * as Yup from 'yup'

export const SnoozeStudentModal = ({
    onCancel,
    student,
}: {
    student: Student
    onCancel: () => void
}) => {
    const role = getUserCredentials()?.role

    const [snoozeStudent, snoozeStudentResult] =
        SubAdminApi.Student.useSnoozeStudent()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        date: Yup.string().required('Date is required!'),
        comment: Yup.string().required('Please provide the note'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        snoozeStudent({
            id: student?.id,
            ...values,
        }).then((res: any) => {
            if (res?.data) {
                notification?.[
                    role === UserRoles.ADMIN ? 'success' : 'warning'
                ]({
                    title: `Student Snoozed ${
                        role !== UserRoles.ADMIN ? 'Request Sent' : ''
                    } `,
                    description: `Student Snoozed ${
                        role !== UserRoles.ADMIN
                            ? 'Request sent to manager'
                            : ''
                    }  Successfully`,
                })
                onCancel()
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={snoozeStudentResult} />
            <Modal
                titleIcon={MdSnooze}
                title="Snooze Student"
                onCancelClick={onCancel}
                subtitle="Snooze Student"
                loading={snoozeStudentResult.isLoading}
                onConfirmClick={methods.handleSubmit(onSubmit)}
            >
                <FormProvider {...methods}>
                    <form className="w-full">
                        <TextInput
                            label={'Enter Snoozing Date'}
                            name={'date'}
                            placeholder="Enter Snoozing End Date"
                            type={'date'}
                            min={getDate()}
                        />
                        <TextArea
                            label={'Provide Note Please'}
                            required
                            name={'comment'}
                            placeholder={'reason...'}
                            rows={5}
                        />
                        {/* <Button
                            // Icon={AiFillCheckCircle}
                            text={'Snooze'}
                            onClick={() => {
                                onSubmit()
                            }}
                            variant="info"
                            loading={snoozeStudentResult.isLoading}
                            disabled={
                                snoozeStudentResult.isLoading || !selectedDate
                            }
                        /> */}
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
