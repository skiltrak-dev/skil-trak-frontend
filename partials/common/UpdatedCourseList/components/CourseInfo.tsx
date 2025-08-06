import { Badge } from '@components'
import React, { ReactElement, useState } from 'react'
import { CourseInfoModal } from '../modal'

export const CourseInfo = ({
    userId,
    courseId,
    courseInfo,
}: {
    userId: number
    courseInfo: any
    courseId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onAddInfo = () => {
        setModal(
            <CourseInfoModal
                userId={userId}
                onCancel={onCancel}
                courseId={courseId}
                courseInfo={courseInfo}
            />
        )
    }
    return (
        <div>
            {modal}

            <Badge
                text={'Highlighted Tasks'}
                variant={
                    courseInfo && courseInfo?.length > 0 ? 'primary' : 'info'
                }
                onClick={() => onAddInfo()}
            />
        </div>
    )
}
