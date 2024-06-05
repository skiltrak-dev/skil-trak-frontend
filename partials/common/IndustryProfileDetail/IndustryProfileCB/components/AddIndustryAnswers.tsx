import React, { ReactElement, useState } from 'react'
import { ActionButton, Button } from '@components'
import {
    AddIndustryQuestionsModal,
    ViewIndustryAnswersModal,
} from '../../modal'
import { Industry } from '@types'

export const AddIndustryAnswers = ({ industry }: { industry: Industry }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelClicked = () => setModal(null)

    const onViewIndustryAnswersClicked = () =>
        setModal(
            <AddIndustryQuestionsModal
                industry={industry}
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
                ADD INDUSTRY ANSWERS
            </ActionButton>
        </div>
    )
}
