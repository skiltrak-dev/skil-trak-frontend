import { Button } from '@components/buttons'
import { Checkbox } from '@components/inputs'
import { Typography } from '@components/Typography'
import React from 'react'
import { AssessmentFolderDetails } from './AssessmentFolderDetails'
import { AssessmentFolders } from './AssessmentFolders'
import { AssessmentCourseCard } from './components'

type Props = {}

export const AssessmentsEvidence = (props: Props) => {
    return (
        <div>
            <div className="mb-3">
                <AssessmentCourseCard />
            </div>
            <div className='flex items-center gap-x-1 mb-1'>
                <Typography variant="label" color="text-black">
                    Assessment Submission -
                </Typography>
                <Typography variant="muted" color="text-gray-500">
                    Submission #1
                </Typography>
            </div>
            <div className="flex">
                <div className="w-[33%] border-r">
                    <AssessmentFolders />
                </div>
                <div className="w-[67%]">
                    <AssessmentFolderDetails />
                </div>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
                <div>
                    <Button submit text="SUBMIT" />
                </div>
                <div className="flex items-center gap-x-2">
                    <Checkbox
                        name="notifyCoordinator"
                        label="Notify Coordinator"
                    />
                    <Checkbox
                        name="notifyCoordinator"
                        label="Notify Coordinator"
                    />
                </div>
            </div>
            <div className="my-2">
                <Typography variant="muted" color="text-neutral-500">
                    *You will be able to submit assessment request after you
                    upload atleast one attachment to each folder mentioned
                    above.
                </Typography>
            </div>
        </div>
    )
}
