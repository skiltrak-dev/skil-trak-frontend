import {
    Modal,
    ShowErrorNotifications,
    TextArea,
    useAuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification, useSubadminProfile } from '@hooks'
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

    const subadmin = useSubadminProfile()

    const hasPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
    })

    const validationSchema = Yup.object({
        comment: Yup.string().required('Please provide the note'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const res: any = await notContactable({
            id: studentId,
            ...values,
        })

        if (res?.data) {
            notification?.[hasPermission ? 'success' : 'warning']({
                title: `Student Snoozed ${
                    !hasPermission ? 'Request Sent' : ''
                }!`,
                description: `Student Snoozed ${
                    !hasPermission ? 'Request Sent to Manager' : ''
                } Successfully!`,
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={notContactableResult} />
            <Modal
                titleIcon={MdSnooze}
                title="Not Contactble Student"
                onCancelClick={onCancel}
                subtitle="Not Contactble Student"
                loading={notContactableResult.isLoading}
                onConfirmClick={methods.handleSubmit(onSubmit)}
            >
                <FormProvider {...methods}>
                    <form className="w-full">
                        <TextArea
                            rows={5}
                            required
                            name={'comment'}
                            placeholder={'reason...'}
                            label={'Provide Note Please'}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
