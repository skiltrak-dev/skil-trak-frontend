import { NoData } from '@components'
import React from 'react'
import { SmallDetail } from '../../components/SmallDetail'

export const QuestionsTab = ({ workplace }: { workplace: any }) => {
    return (
        <div>
            <SmallDetail
                currentWork={workplace?.currentWork}
                haveTransport={workplace?.haveTransport}
                haveDrivingLicense={workplace?.haveDrivingLicense}
                currentQualification={workplace?.currentQualification}
            />
        </div>
    )
}
