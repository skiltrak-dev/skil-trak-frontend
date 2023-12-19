import { Result } from '@constants'
import React from 'react'

export const SubmissionMessage = ({
    allCommentsAdded,
}: {
    allCommentsAdded: boolean
}) => {
    return (
        <div>
            {Result.NotSubmitted ? (
                <div className="mt-4">
                    <p className="text-xs text-orange-600 bg-orange-100 py-2 px-4">
                        *You will be able to submit assessment evidence result
                        when student will submit the assessment submissions.
                    </p>
                </div>
            ) : (
                !allCommentsAdded && (
                    <div className="mt-4">
                        <p className="text-xs text-orange-500 bg-orange-200 py-2 px-4">
                            *You will be able to submit assessment evidence
                            result after you add a comment to each folder
                            mentioned above.
                        </p>
                    </div>
                )
            )}
        </div>
    )
}
