import { Badge } from '@components'
import { WorkplaceTypes } from '@types'
import { ReactElement, useState } from 'react'
import { AddRTOWpTypeModal } from '../../modals'

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
                    <Badge
                        onClick={() => {
                            onAddWpTypeClicked(
                                courseId,
                                workplaceTypes?.map(
                                    (wpType: WorkplaceTypes) =>
                                        wpType?.workplaceType?.id
                                )
                            )
                        }}
                        text="WP Types"
                        variant="info"
                    />
                </div>
            </div>
        </>
    )
}
