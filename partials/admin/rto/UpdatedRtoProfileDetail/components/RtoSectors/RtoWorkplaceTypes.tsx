import { ActionButton, Tooltip, Typography } from '@components'
import { WorkplaceType, WorkplaceTypes } from '@types'
import React, { ReactElement, useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { TiPlus } from 'react-icons/ti'
import { AddRTOWpTypeModal, DeleteRtoWpTypeModal } from '../../modals'
import { MdDelete } from 'react-icons/md'

export const RtoWorkplaceTypes = ({
    workplaceTypes,
    userId,
    courseId,
}: {
    courseId: number
    userId?: number
    workplaceTypes: WorkplaceTypes[]
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onAddWpTypeClicked = (courseId: number, selectedIds: number[]) => {
        setModal(
            <AddRTOWpTypeModal
                userId={userId}
                onCancel={onCancel}
                courseId={courseId}
                selectedIds={selectedIds}
                workplaceTypes={workplaceTypes}
            />
        )
    }

    const onDeleteWpType = (wpType: WorkplaceTypes) => {
        setModal(<DeleteRtoWpTypeModal wpType={wpType} onCancel={onCancel} />)
    }

    const TiPlusIcon = () => <TiPlus size={15} />
    return (
        <>
            {modal}
            <div className="flex items-center gap-x-1">
                <div>
                    {/* {workplaceTypes && workplaceTypes?.length > 0 && (
                        <Typography variant="xxs" color={'text-gray-500'}>
                            Workplace Types
                        </Typography>
                    )} */}
                    {/* <div className="flex justify-end gap-x-1">
                        {workplaceTypes?.map((wpType: WorkplaceTypes) => (
                            <div className="relative group cursor-pointer">
                                <GoDotFill className="text-gray-400" />
                                <div
                                    onClick={() => {
                                        onDeleteWpType(wpType)
                                    }}
                                    className="absolute bottom-full hidden group-hover:block p-1 rounded-full shadow-md bg-white"
                                >
                                    <MdDelete className="text-error-dark" />
                                </div>
                                <Tooltip>{wpType?.workplaceType?.name}</Tooltip>
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className="relative group flex-shrink-0">
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            onAddWpTypeClicked(
                                courseId,
                                workplaceTypes?.map(
                                    (wpType: WorkplaceTypes) =>
                                        wpType?.workplaceType?.id
                                )
                            )
                        }}
                    >
                        WP Types
                    </ActionButton>
                </div>
            </div>
        </>
    )
}
