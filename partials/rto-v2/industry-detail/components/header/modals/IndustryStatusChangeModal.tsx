import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { RtoV2Api } from '@queries'
import { useNotification } from '@hooks'
import { UserCog } from 'lucide-react'
import { Button, ShowErrorNotifications } from '@components'
import { UserStatus } from '@types'

interface IndustryStatusChangeModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    industryId: number
    isBlocked?: boolean
}

export function IndustryStatusChangeModal({
    open,
    industryId,
    onOpenChange,
    isBlocked = false,
}: IndustryStatusChangeModalProps) {
    const [changeStatus, changeStatusResult] =
        RtoV2Api.Industries.industryUserStatusChange()
    const { notification } = useNotification()

    const onSubmit = async () => {
        const result: any = await changeStatus({
            id: industryId,
            status: isBlocked ? UserStatus.Approved : UserStatus.Blocked,
        })

        if (result?.data) {
            notification.success({
                title: isBlocked ? 'Industry Unblocked' : 'Industry Blocked',
                description: isBlocked
                    ? 'Industry unblocked successfully'
                    : 'Industry blocked successfully',
            })
            onOpenChange(false)
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-0 [&>button]:text-white">
                    <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <UserCog className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-white font-bold">
                                    {isBlocked ? 'Unblock Industry' : 'Block Industry'}
                                </DialogTitle>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-6">
                        <DialogDescription className="text-[#1A2332] text-sm mb-6">
                            Are you sure you want to {isBlocked ? 'unblock' : 'block'} this
                            industry?
                        </DialogDescription>

                        <DialogFooter className="flex gap-3 sm:justify-end">
                            <Button
                                variant="secondary"
                                onClick={() => onOpenChange(false)}
                                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={onSubmit}
                                loading={changeStatusResult.isLoading}
                                disabled={changeStatusResult.isLoading}
                                variant={isBlocked ? 'primary' : 'error'}
                                className="flex-1"
                            >
                                {isBlocked ? 'Confirm Unblock' : 'Confirm Block'}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
