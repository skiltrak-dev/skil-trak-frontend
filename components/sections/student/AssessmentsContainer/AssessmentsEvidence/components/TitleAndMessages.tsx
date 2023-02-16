import { PageTitle } from '@components'
import { NotificationMessage } from '@components/NotificationMessage'
import { UserStatus } from '@types'
import React from 'react'

export const TitleAndMessages = ({ result }: { result: any }) => {
    return (
        <div className="flex flex-col md:flex-row gap-2 justify-between  md:items-center mb-6">
            <PageTitle title="Assessment Evidence" backTitle="Assessment" />
            <div>
                {result?.result === UserStatus.Pending &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Submitted For Approval'}
                            subtitle={'Wait for Admin review'}
                        />
                    )}
                {result?.result === 'reOpened' &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Admin Reopened your request'}
                            subtitle={'You can resubmit your assessment'}
                        />
                    )}
                {result?.result === 'competent' && (
                    <NotificationMessage
                        title={'Congratulations!'}
                        subtitle={'You have successfully passes the Assessment'}
                    />
                )}
                {result?.result === 'notCompetent' &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Failed'}
                            subtitle={
                                'You have failed the assessment on this course, you can resubmit your assessment'
                            }
                        />
                    )}
                {result?.result !== 'competent' &&
                    result?.totalSubmission >= 3 &&
                    !result?.isManualSubmission && (
                        <NotificationMessage
                            title={'Request manually for reopen'}
                            subtitle={
                                'You have failed the assessment on this course, you can request for admin to reopen manullay'
                            }
                        />
                    )}
                {result?.isManualSubmission && (
                    <NotificationMessage
                        title={'Request manually reOpened'}
                        subtitle={'Request manually reOpened'}
                    />
                )}
            </div>
        </div>
    )
}
