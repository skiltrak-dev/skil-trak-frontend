import { ReactElement, useState } from 'react'

import {
    ESignatures,
    PendingESignatures,
} from '@components/sections/student/AssessmentsContainer'
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const [showESignatures, setShowESignatures] = useState<
        'pending' | 'signed'
    >('pending')

    const handleShowESignatures = (type: 'pending' | 'signed') => {
        setShowESignatures(type)
    }
    return (
        <>
            <div className="flex gap-x-4 border-b border-gray-200 mb-4">
                {['pending', 'signed'].map((type) => (
                    <button
                        key={type}
                        onClick={() =>
                            handleShowESignatures(type as 'pending' | 'signed')
                        }
                        className={`relative px-2 pb-2 font-medium transition-colors duration-200 ${
                            showESignatures === type
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-500 hover:text-primary'
                        }`}
                    >
                        {type === 'pending' ? 'Pending' : 'Signed'}
                    </button>
                ))}
            </div>
            {showESignatures === 'pending' ? (
                <PendingESignatures />
            ) : (
                <ESignatures />
            )}
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return <RtoLayout pageTitle={{ title: 'E-Sign' }}>{page}</RtoLayout>
}

export default AssessmentEvidence
