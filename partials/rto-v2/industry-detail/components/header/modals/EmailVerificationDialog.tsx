import { Mail } from 'lucide-react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@components/ui/dialog'
import { Button, TextInput } from '@components'

interface EmailVerificationDialogProps {
    open: boolean
    emailVerified: boolean
    industryEmail: string
    onOpenChange: (open: boolean) => void
    onVerified: () => void
}

export function EmailVerificationDialog({
    open,
    emailVerified,
    industryEmail,
    onOpenChange,
    onVerified,
}: EmailVerificationDialogProps) {
    const [verificationCode, setVerificationCode] = useState('')

    const handleVerify = () => {
        if (verificationCode.length === 6) {
            onVerified()
            setTimeout(() => onOpenChange(false), 1500)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-0">
                <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-white font-bold">
                                Email Verification
                            </DialogTitle>
                            <DialogDescription className="text-white/80 text-xs">
                                Verify your industry contact email
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6">
                    {!emailVerified ? (
                        <>
                            <div className="mb-6">
                                <div className="bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] rounded-xl p-4 border border-[#B8D9E8] mb-4">
                                    <p className="text-sm text-[#1A2332] mb-2">
                                        <strong>Email:</strong> {industryEmail}
                                    </p>
                                    <p className="text-xs text-[#64748B]">
                                        We've sent a verification code to this
                                        email address. Please enter it below.
                                    </p>
                                </div>

                                <TextInput
                                    label={'Verification Code'}
                                    id="verificationCode"
                                    name="verificationCode"
                                    value={verificationCode}
                                    onChange={(e: any) =>
                                        setVerificationCode(e.target.value)
                                    }
                                    placeholder="Enter 6-digit code"
                                    max={6}
                                    className="w-full px-4 py-3 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] border border-[#E2E8F0] rounded-xl text-lg font-mono text-center text-[#1A2332] placeholder-[#94A3B8] hover:border-[#044866]/30 focus:outline-none focus:ring-2 focus:ring-[#044866]/20 focus:border-[#044866] transition-all"
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    onClick={handleVerify}
                                    className="flex-1 px-4 py-3 bg-gradient-to-br from-[#10B981] to-[#059669] hover:shadow-lg text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={verificationCode.length !== 6}
                                >
                                    <Mail className="w-4 h-4" />
                                    Verify Email
                                </Button>
                                <Button
                                    onClick={() => setVerificationCode('')}
                                    variant="action"
                                    className="px-4 py-3 bg-white hover:bg-[#F8FAFB] border border-[#E2E8F0] text-[#64748B] rounded-xl font-medium transition-all duration-300 h-auto"
                                >
                                    Resend Code
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-bold text-[#1A2332] mb-2">
                                Email Verified!
                            </h3>
                            <p className="text-sm text-[#64748B]">
                                Your email address has been successfully
                                verified.
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
