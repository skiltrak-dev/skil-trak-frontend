import { GlobalModal, Typography } from '@components'
import { StudentInfoMessageForm } from '../components'
import { Student } from '@types'

export const StudentInfoMessageModal = ({
    onCancel,
    student,
}: {
    student: Student
    onCancel: () => void
}) => {
    return (
        <GlobalModal onCancel={onCancel} className="!p-4">
            <Typography variant="title">Send Info Message</Typography>
            <div className="py-4 max-h-[75vh] overflow-auto custom-scrollbar">
                <StudentInfoMessageForm onCancel={onCancel} student={student} />
            </div>
        </GlobalModal>
    )
}
