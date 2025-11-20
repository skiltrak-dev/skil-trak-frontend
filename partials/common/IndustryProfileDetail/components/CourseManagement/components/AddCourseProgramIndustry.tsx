import { Button } from '@components'
import { ReactElement, useState } from 'react'
import { AddIndustryProgramModal } from '../modal'
import { Industry } from '@types'

export const AddCourseProgramIndustry = ({
    industry,
    approval,
}: {
    approval: any
    industry: Industry
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onAddIndustryCourseProgram = () => {
        setModal(
            <AddIndustryProgramModal
                industry={industry}
                onCancel={onCancel}
                approval={approval}
            />
        )
    }

    return (
        <div>
            {modal}
            <Button
                onClick={onAddIndustryCourseProgram}
                text="Programs"
                variant="info"
                className="!py-1 !rounded-sm"
            />
        </div>
    )
}
