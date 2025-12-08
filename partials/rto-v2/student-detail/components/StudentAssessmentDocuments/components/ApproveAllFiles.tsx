import { Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoV2Api } from '@queries'
import { StudentResponseType } from '@types'
import { ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { ApproveFileModal } from '../modal'

export const ApproveAllFiles = ({
    folder,
}: {
    folder: StudentResponseType
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const [fileStatusChange, fileStatusChangeResult] =
        RtoV2Api.StudentDocuments.allFilesStatusChange()

    const { notification } = useNotification()

    const handleApprove = async (comment: string) => {
        if (!comment.trim()) {
            notification.error({
                title: 'Please enter a reason',
                description: 'Please enter a reason to approve the file',
            })
            return
        }
        const res: any = await fileStatusChange({
            folderId: folder?.id,
            status: 'approved',
            comment,
        })
        if (res?.data) {
            notification.success({
                title: 'File Approved',
                description: 'File Approved Successfully',
            })
            setIsOpen(false)
        }
    }

    return (
        <div>
            <ShowErrorNotifications result={fileStatusChangeResult} />
            <Button
                Icon={ThumbsUp}
                variant="success"
                className="!py-1"
                onClick={() => setIsOpen(true)}
                text="Approve All"
            />

            <ApproveFileModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedItem={{ ...folder, type: 'folder' }}
                handleApprove={handleApprove}
                result={fileStatusChangeResult}
            />
        </div>
    )
}
