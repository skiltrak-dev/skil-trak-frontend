import { Mail, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, ShowErrorNotifications, TextArea } from '@components'
import { commonApi } from '@redux/queries'
import { useNotification } from '@hooks'
import { Button } from '@components'

interface EmailVerificationDialogProps {
    open: boolean
    emailVerified: boolean
    industryEmail: string
    userId: number
    userName: string
    onOpenChange: (open: boolean) => void
}

export function EmailVerificationDialog({
    open,
    emailVerified,
    industryEmail,
    userId,
    userName,
    onOpenChange,
}: EmailVerificationDialogProps) {
    const [checked, setChecked] = useState(false)
    const { notification } = useNotification()

    const [verifyEmail, verifyEmailResult] =
        commonApi.useVerifyUserEmailMutation()

    const validationSchema = Yup.object({
        note: Yup.string().required('Note is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onCheckboxChange = () => {
        setChecked(!checked)
    }

    const onSubmit = async (body: any) => {
        try {
            await verifyEmail({
                userId,
                body,
            }).unwrap()

            notification.success({
                title: 'Email Verified',
                description: 'Industry email verified successfully',
            })

            methods.reset()
            setChecked(false)

            setTimeout(() => {
                onOpenChange(false)
            }, 1500)
        } catch (error) {
            // Error is handled by ShowErrorNotifications
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden p-0 gap-0">
                <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-white font-bold">
                                Email Verification
                            </DialogTitle>
                            <p className="text-white/80 text-xs">
                                Verify industry contact email
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6">
                    {!emailVerified ? (
                        <>
                            <ShowErrorNotifications
                                result={verifyEmailResult}
                            />

                            <div className="bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] rounded-xl p-4 border border-[#B8D9E8] mb-4">
                                <p className="text-sm text-[#1A2332] mb-2">
                                    <strong>Email:</strong> {industryEmail}
                                </p>
                                <p className="text-xs text-[#64748B]">
                                    Please add a note and confirm the email
                                    verification for this industry.
                                </p>
                            </div>

                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)}>
                                    <TextArea
                                        label="Add Note"
                                        name="note"
                                        required
                                        placeholder="Add a note about the email verification..."
                                        rows={7}
                                        className="mb-4"
                                    />

                                    <div className="mb-4">
                                        <Checkbox
                                            label={
                                                <span className="text-sm">
                                                    I confirm that the email for{' '}
                                                    <strong>{userName}</strong>{' '}
                                                    has been verified
                                                </span>
                                            }
                                            name="sendEmail"
                                            onChange={onCheckboxChange}
                                            value={checked}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="secondary"
                                            outline
                                            onClick={() => onOpenChange(false)}
                                            className="px-4 py-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            submit
                                            loading={
                                                verifyEmailResult.isLoading
                                            }
                                            disabled={
                                                !checked ||
                                                verifyEmailResult.isLoading
                                            }
                                            className="px-4 py-2 bg-gradient-to-br from-[#10B981] to-[#059669] hover:shadow-lg text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            Verify Email
                                        </Button>
                                    </div>
                                </form>
                            </FormProvider>
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
