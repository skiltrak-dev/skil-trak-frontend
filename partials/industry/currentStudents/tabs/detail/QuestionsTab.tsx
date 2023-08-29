import { NoData } from '@components'
import React from 'react'
import { SmallDetail } from '../../components/SmallDetail'

export const QuestionsTab = ({ workplace }: { workplace: any }) => {
    return (
        <div>
            {workplace?.currentWork && workplace?.currentQualification ? (
                <SmallDetail
                    currentWork={workplace?.currentWork}
                    haveTransport={workplace?.haveTransport}
                    haveDrivingLicense={workplace?.haveDrivingLicense}
                    currentQualification={workplace?.currentQualification}
                />
            ) : (
                <NoData text={'No Questions Were provided'} />
            )}
        </div>
    )
}
