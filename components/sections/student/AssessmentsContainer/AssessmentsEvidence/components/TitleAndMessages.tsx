import { PageTitle } from '@components'
import { NotificationMessage } from '@components/NotificationMessage'
import React from 'react'

export const TitleAndMessages = ({ results }: { results: any }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <PageTitle title="Assessment Evidence" backTitle="Assessment" />
            <div>
                {results?.result === 'pending' &&
                    results?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Submitted For Approval'}
                            subtitle={'Wait for Admin review'}
                        />
                    )}
                {results?.result === 'reOpened' &&
                    results?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Admin Reopened your request'}
                            subtitle={'You can resubmit your assessment'}
                        />
                    )}
                {results?.result === 'competent' &&
                    results?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Congratulations!'}
                            subtitle={
                                'You have successfully passes the Assessment'
                            }
                        />
                    )}
                {results?.result === 'notCompetent' &&
                    results?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Failed'}
                            subtitle={
                                'You have failed the assessment on this course, you can resubmit your assessment'
                            }
                        />
                    )}
                {results?.totalSubmission >= 3 && (
                    <NotificationMessage
                        title={'Request manually for reopen'}
                        subtitle={
                            'You have failed the assessment on this course, you can request for admin to reopen manullay'
                        }
                    />
                )}
            </div>
        </div>
    )
}
