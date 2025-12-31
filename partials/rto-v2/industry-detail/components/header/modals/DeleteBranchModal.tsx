import { Button, ShowErrorNotifications } from '@components'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { AlertCircle, Trash2 } from 'lucide-react'

interface DeleteBranchModalProps {
    open: boolean
    branchId: number | null
    onClose: () => void
    onSuccess?: () => void
}

export function DeleteBranchModal({
    open,
    branchId,
    onClose,
    onSuccess,
}: DeleteBranchModalProps) {
    const { notification } = useNotification()

    const [deleteBranch, { isLoading, ...deleteResult }] =
        CommonApi.Industries.useRemoveIndustryBranch()

    const handleDelete = () => {
        if (!branchId) return

        deleteBranch(branchId)?.then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Branch Deleted',
                    description: 'Branch location removed successfully',
                })
                onSuccess?.()
                onClose()
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl p-0 overflow-hidden">
                <div className="bg-red-50 p-6 flex flex-col items-center justify-center text-center border-b border-red-100">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-900 text-center">
                            Delete Branch Location?
                        </DialogTitle>
                        <DialogDescription className="text-red-700 text-center mt-2">
                            This action cannot be undone. This will permanently
                            remove this branch location from the industry
                            profile.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-4">
                    <ShowErrorNotifications result={deleteResult} />
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Branch
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
