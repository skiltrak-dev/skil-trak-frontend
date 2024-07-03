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
                <div className={'grid grid-cols-2 gap-x-3 w-full'}>
                    {Object.values(SelectedFeedbackEnum).map((feedback) => (
                        <Typography
                            variant="label"
                            semibold
                            color={'text-black'}
                        >
                            {feedback}
                        </Typography>
                    ))}
                </div>
            </div>

            {/*  */}
            <div className="px-7 grid grid-cols-2 pb-4">
                <div className="px-3 border-r border-gray-400">
                    <CoordinatorFeedback />
                </div>
                <div className="px-3">
                    <IndustryFeedback />
                </div>
            </div>
        </Card>
    )
}
