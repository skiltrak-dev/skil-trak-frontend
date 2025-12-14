import { Button, ShowErrorNotifications } from '@components'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { useNotification } from '@hooks'
import { RtoV2Api } from '@queries'
import { AlertCircle } from 'lucide-react'

interface IndustryUnsnoozedModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    industryId: number
}

export function IndustryUnsnoozedModal({
    open,
    industryId,
    onOpenChange,
}: IndustryUnsnoozedModalProps) {
    const [snooze, snoozeResult] = RtoV2Api.Industries.snoozeIndustry()
    const { notification } = useNotification()

    const handleUnsnooze = () => {
        snooze({
            id: industryId,
        }).then((res: any) => {
            if (res.data) {
                notification.success({
                    title: 'Industry Unsnoozed',
                    description: 'Industry Unsnoozed Successfully',
                })
                onOpenChange(false)
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={snoozeResult} />
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-0 [&>button]:text-white">
                    <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-white font-bold">
                                    Unsnooze Industry
                                </DialogTitle>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-6">
                        <DialogDescription className="text-[#1A2332] text-sm mb-6">
                            Are you sure you want to unsnooze this industry?
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
                                onClick={handleUnsnooze}
                                loading={snoozeResult.isLoading}
                                className="flex-1 bg-gradient-to-br from-[#10B981] to-[#059669] hover:shadow-lg text-white border-0"
                            >
                                Confirm
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
