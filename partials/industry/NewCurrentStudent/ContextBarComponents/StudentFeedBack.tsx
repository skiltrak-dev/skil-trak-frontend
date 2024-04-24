import { Button } from '@components'
import { AddIndustryFeedback } from '@partials/common/StudentProfileDetail/components'
import { getStudentWorkplaceAppliedIndustry } from '@utils'
import { ReactElement, useState } from 'react'

export const StudentFeedBack = ({ workplace }: { workplace: any }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const industry = getStudentWorkplaceAppliedIndustry(workplace?.industries)
    const onModalCancelClicked = () => setModal(null)
    const onFeedBackClicked = () => {
        // setModal(
        //     <Feedback
        //         onCancel={onModalCancelClicked}
        //         workIndustry={industry?.id}
        //         student={workplace?.student?.id}
        //     />
        // )
        setModal(
            <AddIndustryFeedback
                onCancel={onModalCancelClicked}
                id={industry?.id}
                student={workplace?.student}
                course={workplace?.courses?.[0]}
                workplaceId={workplace?.[0]?.id}
                industryId={industry?.industry?.id as number}
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
