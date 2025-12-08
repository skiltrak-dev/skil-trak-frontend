import { Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoV2Api } from '@queries'
import { FileType } from '@types'
import { ThumbsDown } from 'lucide-react'
import { useState } from 'react'
import { RejectFileModal } from '../modal'

export const    RejectFile = ({
    file,
    studentId,
}: {
    file: FileType
    studentId: number
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const [fileStatusChange, fileStatusChangeResult] =
        RtoV2Api.StudentDocuments.fileStatusChange()

    const { notification } = useNotification()

    const handleReject = async (comment: string) => {
        if (!comment.trim()) {
            notification.error({
                title: 'Please enter a reason',
                description: 'Please enter a reason to approve the file',
            })
            return
        }
        const res: any = await fileStatusChange({
            stdId: studentId,
            responseId: file?.id,
            status: 'rejected',
            comment,
        })
        if (res?.data) {
            notification.error({
                title: 'File Rejected',
                description: 'File Rejected Successfully',
            })
            setIsOpen(false)
        }
    }

    return (
        <div>
            <ShowErrorNotifications result={fileStatusChangeResult} />
            <Button
                mini
                outline
                variant="error"
                Icon={ThumbsDown}
                onClick={() => setIsOpen(true)}
            />
            <RejectFileModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={file}
                handleReject={handleReject}
                result={fileStatusChangeResult}
            />
        </div>
    )
}
