import { useState } from 'react'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { Modal, ShowErrorNotifications, TextInput } from '@components'

export const AddDepartmentEmailModal = ({
    onCancel,
    departmentId,
}: {
    departmentId: number
    onCancel: () => void
}) => {
    const [email, setEmail] = useState<string>('')

    const { notification } = useNotification()

    const [updateDepartment, updateDepartmentResult] =
        AdminApi.Department.updateDepartment()

    const onConfirm = async () => {
        if (email) {
            const res: any = await updateDepartment({
                departmentId,
                email,
            })

            if (res?.data) {
                notification.success({
                    title: 'Email Updated',
                    description: 'Email Updated Successfully',
                })
                onCancel()
            }
        } else {
            notification.warning({
                title: 'Email is required!',
                description: ' ',
            })
        }
    }
    return (
        <>
            <ShowErrorNotifications result={updateDepartmentResult} />
            <Modal
                title="Add Workplace Types"
                subtitle=" "
                onCancelClick={onCancel}
                onConfirmClick={onConfirm}
                loading={updateDepartmentResult?.isLoading}
            >
                <TextInput
                    name="email"
                    showError={false}
                    label={'Enter Email'}
                    placeholder="Enter Email"
                    onChange={(e: any) => setEmail(e?.target?.value)}
                />
            </Modal>
        </>
    )
}
