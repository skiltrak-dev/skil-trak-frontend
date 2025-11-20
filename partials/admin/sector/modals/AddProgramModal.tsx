import { Modal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Course, Sector } from '@types'
import { AddProgramForm } from '../form'

export const AddProgramModal = ({
    course,
    onCancel,
}: {
    course: Course
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [addProgram, addProgramResult] = AdminApi.Courses.addCourseProgram()

    const onSubmit = async (values: any) => {
        const res: any = await addProgram({ ...values, course: course?.id })

        if (res?.data) {
            notification.success({
                title: 'Keywords Added',
                description: 'Keywords Added Successfully',
            })
            onCancel()
            return
        }
        return
    }

    return (
        <div>
            <ShowErrorNotifications result={addProgramResult} />
            <Modal
                title={'Add Course Program'}
                subtitle={''}
                showActions={false}
                onCancelClick={onCancel}
            >
                <AddProgramForm onSubmit={onSubmit} />
            </Modal>
        </div>
    )
}
