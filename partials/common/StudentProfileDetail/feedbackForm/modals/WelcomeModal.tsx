import { ArrowRight, Clock, GraduationCap } from 'lucide-react'
import React, { useState } from 'react'
import styles from '../../../../../styles/custom-form.module.css'
import { GlobalModal, Typography } from '@components'
export const WelcomeModal = () => {
    const [showWelcome, setShowWelcome] = useState(true)

    return (
        <GlobalModal>
            <div className={`max-w-lg mx-auto ${styles.customForm}`}>
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-2">
                        <Typography
                            color="text-brand-primary"
                            variant="h4"
                            semibold
                        >
                            Placement Complete! 🎓
                        </Typography>
                        <Typography color="text-muted-foreground leading-relaxed">
                            According to SkilTrak's schedule, you have
                            successfully completed your placement. We'd love to
                            hear about your experience to help improve our
                            program for future students.
                        </Typography>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 p-4 rounded-xl border border-brand-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                            <Clock className="w-5 h-5 text-brand-accent" />
                            <span className="font-medium text-brand-primary">
                                About this feedback form
                            </span>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Takes approximately 3-5 minutes to complete</li>
                            <li>
                                Your responses help improve future placements
                            </li>
                            <li>All feedback is reviewed confidentially</li>
                            <li>Form automatically saves your progress</li>
                        </ul>
                    </div>

                    <button
                        onClick={() => setShowWelcome(false)}
                        className={`w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white ${styles.customForm}`}
                    >
                        Start Feedback Form{' '}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </GlobalModal>
    )
}
