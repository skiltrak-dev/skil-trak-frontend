import { Card, Typography } from '@components'
import React, { useState } from 'react'
import { CoordinatorFeedback } from './CoordinatorFeedback'
import { IndustryFeedback } from './IndustryFeedback'

enum SelectedFeedbackEnum {
    Coordinators = 'Coordinators Feedback',
    Industry = 'Industry Feedback',
}

export const StudentFeedback = () => {
    const [selectedFeedback, setSelectedFeedback] =
        useState<SelectedFeedbackEnum>(SelectedFeedbackEnum.Coordinators)
    return (
        <Card noPadding>
            <div className="py-3.5 px-7 flex items-center gap-x-10 border-b border-secondary-dark">
                {Object.values(SelectedFeedbackEnum).map((feedback) => (
                    <div
                        onClick={() => {
                            setSelectedFeedback(feedback)
                        }}
                    >
                        <Typography
                            variant="label"
                            semibold={selectedFeedback === feedback}
                            color={
                                selectedFeedback === feedback
                                    ? 'text-black'
                                    : 'text-gray-400'
                            }
                        >
                            <span className="cursor-pointer">{feedback}</span>
                        </Typography>
                    </div>
                ))}
            </div>

            {/*  */}
            <div className="p-7">
                {selectedFeedback === SelectedFeedbackEnum.Coordinators ? (
                    <CoordinatorFeedback />
                ) : selectedFeedback === SelectedFeedbackEnum.Industry ? (
                    <IndustryFeedback />
                ) : null}
            </div>
        </Card>
    )
}
