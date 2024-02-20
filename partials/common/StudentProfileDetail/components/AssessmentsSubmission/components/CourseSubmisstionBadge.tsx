import { Typography } from '@components'
import { Result } from '@constants'
import classNames from 'classnames'
import { title } from 'process'
import React from 'react'

export const CourseSubmisstionBadge = ({
    result,
    resultLength,
}: {
    result: any
    resultLength: number
}) => {
    const classes = classNames({
        'rounded-[3px] p-2 w-fit': true,
        'bg-[#6971DD]': result?.result === Result.Pending,
        'bg-white border border-gray-300':
            result?.result === Result.NotSubmitted,
        'bg-error': result?.result === Result.NotCompetent,
        'bg-error-light': result?.result === Result.ReOpened,
        'bg-secondary': result?.result === Result.Archived,
    })

    const titleColorClasses = classNames({
        'text-white':
            result?.result === Result.Pending ||
            result?.result === Result.NotCompetent ||
            result?.result === Result.ReOpened,
        'text-gray-400': result?.result === Result.NotSubmitted,
        'text-black': result?.result === Result.Archived,
    })

    const getResultTitle = () => {
        switch (result?.result) {
            case Result.Competent:
                return 'Competent'

            case Result.NotCompetent:
                return 'Not Competent'
            case Result.ReOpened:
                return 'Re-Opened'
            case resultLength > 1 && Result.Pending:
                return 'Resubmitted'
            case Result.Pending:
                return 'Submitted'

            default:
                return result?.result
        }
    }
    return (
        <div className={classes}>
            <Typography variant="badge" color={`${titleColorClasses} block`}>
                {getResultTitle()}
            </Typography>
        </div>
    )
}
