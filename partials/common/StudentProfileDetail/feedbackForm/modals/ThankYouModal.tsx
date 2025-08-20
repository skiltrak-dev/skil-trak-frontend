import React, { useState } from 'react'

import { CheckCircle2, Trophy, X } from 'lucide-react'
import styles from '../../../../../styles/custom-form.module.css'
import { GlobalModal, Typography } from '@components'

export const ThankYouModal = ({
    showThankYou,
    setShowThankYou,
    onClose,
}: any) => {
    return (
        <GlobalModal>
            <div
                className={`max-w-md mx-auto custom-form py-5 px-6 rounded-md ${styles.customForm}`}
            >
                <div className="flex justify-end">
                    <X
                        onClick={() => {
                            setShowThankYou(null)
                            onClose()
                        }}
                        className="cursor-pointer"
                    />
                </div>
                <div className=" space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primaryNew to-[#f7a619] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-2">
                        <Typography
                            color="text-primaryNew"
                            variant="h2"
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
                    <div className="bg-gradient-to-br from-primaryNew/5 to-[#f7a619]/5 p-4 rounded-xl border border-primaryNew/20">
                        <div className="flex items-center gap-3 mb-3">
                            <Trophy className="w-5 h-5 text-[#f7a619]" />
                            <span className="font-medium text-primaryNew">
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
                        className="w-full bg-gradient-to-r from-primaryNew to-[#0d5468] text-white rounded-md py-1"
                    >
                        Close
                    </button>
                </div>
            </div>
        </GlobalModal>
    )
}
