import { useState } from 'react'
import { FileType, StudentResponseType } from '@types'
import { RtoV2Api } from '@queries'
import { useNotification } from '@hooks'
import { ThumbsDown } from 'lucide-react'
import { RejectFileModal } from '../modal'
import { Button, ShowErrorNotifications } from '@components'

export const RejectAllFile = ({ folder }: { folder: StudentResponseType }) => {
    const [isOpen, setIsOpen] = useState(false)

    const [fileStatusChange, fileStatusChangeResult] =
        RtoV2Api.StudentDocuments.allFilesStatusChange()

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
            folderId: folder?.id,
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
                variant="error"
                text="Reject All"
                Icon={ThumbsDown}
                className="!py-1"
                onClick={() => setIsOpen(true)}
            />
            <RejectFileModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={{ ...folder, type: 'folder' }}
                handleReject={handleReject}
                result={fileStatusChangeResult}
            />
        </div>
    )
}
