import React, { ReactElement, useState } from 'react'
import { ActionButton, Button } from '@components'
import { ViewIndustryAnswersModal } from '../../modal'

export const ViewIndustryAnswers = ({ industryId }: { industryId: number }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onViewIndustryAnswersClicked = () =>
        setModal(
            <ViewIndustryAnswersModal
                industryId={industryId}
                onCancel={onCancelClicked}
            />
        )

    return (
        <div className="border-b border-secondary-dark py-3">
            {modal}
            <ActionButton
                variant="info"
                simple
                onClick={() => onViewIndustryAnswersClicked()}
            >
                VIEW INDUSTRY ANSWERS
            </ActionButton>
        </div>
    )
}
