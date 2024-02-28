import { Button } from '@components'
import { Feedback } from '@partials/industry/currentStudents/modals'
import { getStudentWorkplaceAppliedIndustry } from '@utils'
import React, { ReactElement, useState } from 'react'

export const StudentFeedBack = ({ workplace }: { workplace: any }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const industry = getStudentWorkplaceAppliedIndustry(workplace?.industries)
    const onModalCancelClicked = () => setModal(null)
    const onFeedBackClicked = () => {
        setModal(
            <Feedback
                onCancel={onModalCancelClicked}
                workIndustry={industry?.id}
                student={workplace?.student?.id}
            />
        )
    }
    return (
        <div>
            {modal}
            <Button
                text={'FeedBack'}
                onClick={() => {
                    onFeedBackClicked()
                }}
            />
        </div>
    )
}
