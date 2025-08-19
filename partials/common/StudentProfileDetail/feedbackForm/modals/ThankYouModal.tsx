import React, { useState } from 'react'

import { CheckCircle2, Trophy } from 'lucide-react'
import '../../../../../styles/custom-form.css'
import { GlobalModal, Typography } from '@components'

export const ThankYouModal = ({
    showThankYou,
    setShowThankYou,
    onClose,
}: any) => {
    return (
        <GlobalModal>
            <div className="max-w-md mx-auto custom-form">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-2">
                        <Typography
                            color="text-brand-primary"
                            variant="h4"
                            semibold
                        >
                            Thank You! 🎉
                        </Typography>
                        <Typography color="text-muted-foreground">
                            Your feedback has been submitted successfully and
                            will help us improve our placement program for
                            future students.
                        </Typography>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 p-4 rounded-xl border border-brand-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                            <Trophy className="w-5 h-5 text-brand-accent" />
                            <span className="font-medium text-brand-primary">
                                What happens next?
                            </span>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Your feedback will be reviewed by our team</li>
                            <li>
                                Employers will receive constructive feedback
                            </li>
                            <li>
                                We'll continue improving our placement program
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={() => {
                            setShowThankYou(null)
                            onClose()
                        }}
                        className="w-full bg-gradient-to-r from-primaryNew to-[#0d5468] text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
        </GlobalModal>
    )
}
