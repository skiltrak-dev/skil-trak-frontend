import { Button } from '@components'
import {
    Feedback,
    ReportModal,
} from '@partials/industry/currentStudents/modals'
import { getStudentWorkplaceAppliedIndustry } from '@utils'
import React, { ReactElement, useState } from 'react'

export const StudentReport = ({ workplace }: { workplace: any }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const industry = getStudentWorkplaceAppliedIndustry(workplace?.industries)
    const onModalCancelClicked = () => setModal(null)
    const onReportClicked = () => {
        setModal(
            <ReportModal
                onCancel={onModalCancelClicked}
                workIndustry={industry?.id}
                student={workplace?.student?.id}
            />
        )
    }
    return (
        <div className="w-full">
            {modal}
            <div className="w-full h-10">
                <Button
                    fullWidth
                    fullHeight
                    text={'REPORT'}
                    onClick={() => {
                        onReportClicked()
                    }}
                    variant="info"
                />
            </div>
        </div>
    )
}
