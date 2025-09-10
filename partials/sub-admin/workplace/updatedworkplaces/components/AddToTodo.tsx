import { Button } from '@components'
import React, { ReactElement, useState } from 'react'
import { AddWPTodoModal } from '../../modals'
import { useSubadminProfile } from '@hooks'

export const AddToTodo = ({
    workplaceId,
    coordinatorUserId,
}: {
    workplaceId: number
    coordinatorUserId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const subadmin = useSubadminProfile()

    const onCancel = () => setModal(null)

    const onAddWpTodo = () => {
        setModal(
            <AddWPTodoModal
                onCancel={onCancel}
                workplaceId={workplaceId}
                coordinatorUserId={coordinatorUserId}
            />
        )
    }
    return (
        <div className="flex-shrink-0">
            {modal}
            {subadmin?.isManager && (
                <Button
                    text="Send to Todo"
                    onClick={() => {
                        onAddWpTodo()
                    }}
                />
            )}
        </div>
    )
}
