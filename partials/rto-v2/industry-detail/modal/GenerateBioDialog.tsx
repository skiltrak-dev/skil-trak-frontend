import { Sparkles, Wand2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { Button, ShowErrorNotifications } from '@components'
import { RtoV2Api } from '@queries'
import { useNotification } from '@hooks'
import { Industry } from '@types'

interface GenerateBioDialogProps {
    open: boolean
    industry: Industry
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function GenerateBioDialog({
    open,
    industry,
    onOpenChange,
    onSuccess,
}: GenerateBioDialogProps) {
    const { notification } = useNotification()

    const [generateBio, generateBioResult] =
        RtoV2Api.Industries.updateIndustryBio()

    const handleGenerateBio = async () => {
        try {
            // TODO: Add AI generation API endpoint
            // For now, we'll use a placeholder
            await generateBio({
                id: industry.id,
                bio: 'AI-generated biography placeholder. This will be replaced with actual AI-generated content.',
            }).unwrap()

            notification.success({
                title: 'Biography Generated',
                description:
                    'AI has successfully generated a biography for this industry',
            })

            onSuccess?.()
            onOpenChange(false)
        } catch (error) {
            // Error is handled by ShowErrorNotifications
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(newOpen) => {
                // Only allow closing if not loading
                if (!generateBioResult.isLoading) {
                    onOpenChange(newOpen)
                }
            }}
        >
            <DialogContent className="max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden p-0 gap-0">
                <DialogHeader className="bg-gradient-to-r from-primaryNew to-[#0D5468] p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-white font-bold text-lg">
                                Generate Biography with AI
                            </DialogTitle>
                            <p className="text-white/80 text-sm mt-1">
                                Create a professional bio automatically
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6">
                    <ShowErrorNotifications result={generateBioResult} />

                    <div className="bg-gradient-to-br from-primaryNew/10 to-[#0D5468]/10 rounded-xl p-5 border border-primaryNew/20 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primaryNew/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Wand2 className="w-5 h-5 text-primaryNew" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-[#1A2332] text-sm mb-2">
                                    AI-Powered Content Generation
                                </h4>
                                <p className="text-sm text-[#64748B] leading-relaxed">
                                    Our AI will analyze your industry profile and
                                    create a compelling biography that highlights
                                    your strengths, values, and workplace culture.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <p className="text-xs text-amber-800">
                            <strong>Note:</strong> You can always edit the
                            generated biography afterwards to personalize it
                            further.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            outline
                            onClick={() => onOpenChange(false)}
                            className="px-5 py-2.5 h-auto"
                            disabled={generateBioResult.isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primaryNew"
                            onClick={handleGenerateBio}
                            loading={generateBioResult.isLoading}
                            disabled={generateBioResult.isLoading}
                            className="px-5 py-2.5 h-auto flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            Generate Biography
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
