import { ActionButton, Typography } from '@components'
import React from 'react'
import ReactStars from 'react-stars'

export const WorkplaceFeedback = ({
    onViewPlacementStartedAnswers,
    selectedWorkplace,
}: {
    onViewPlacementStartedAnswers: any
    selectedWorkplace: any
}) => {
    return (
        <>
            <ActionButton
                variant={'link'}
                onClick={() => {
                    onViewPlacementStartedAnswers(selectedWorkplace?.id)
                }}
            >
                Coordinators Feedback
            </ActionButton>
            <div className="flex items-center gap-x-1">
                <div className="flex items-center gap-x-2">
                    <ReactStars
                        count={5}
                        value={selectedWorkplace?.studentFeedBacks?.[0]?.rating}
                        edit={false}
                        size={27}
                        color2={'#ffd700'}
                    />
                    <Typography variant="label">
                        {selectedWorkplace?.studentFeedBacks?.[0]?.rating}
                    </Typography>
                </div>
            </div>
        </>
    )
}
