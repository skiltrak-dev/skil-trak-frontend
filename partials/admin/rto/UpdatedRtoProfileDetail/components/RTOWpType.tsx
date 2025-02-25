import { ActionButton, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { WorkplaceTypes } from '@types'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export const RTOWpType = ({ wpType }: { wpType: WorkplaceTypes }) => {
    const [isDelete, setIsDelete] = useState(false)
    const [deletedId, setDeletedId] = useState<number | null>(null)

    const { notification } = useNotification()

    const [remove, removeResult] = CommonApi.Rtos.removeRtoWpType()

    const onConfirmUClicked = async (wpType: WorkplaceTypes) => {
        const res: any = await remove(Number(wpType?.id))

        if (res?.data) {
            setDeletedId(wpType?.id)
            notification.error({
                title: `Workplace Type Removed`,
                description: `Workplace Type  "${wpType?.workplaceType?.name}" has been Removed.`,
            })
        }
    }

    if (deletedId === wpType?.id) {
        return null
    }

    return (
        <>
            <ShowErrorNotifications result={removeResult} />
            <div className="bg-gray-100 px-2 py-1.5 rounded-md cursor-pointer flex justify-between items-center">
                <Typography variant="small">
                    {wpType?.workplaceType?.name}{' '}
                </Typography>
                <div>
                    {isDelete ? (
                        <div className=" top-0 left-0 flex justify-end w-full h-full ">
                            <div className="w-full bg-[#ffffff60] px-2 py-2 rounded-xl">
                                <div className="flex items-center gap-x-2 mb-2">
                                    <div className="bg-red-500 w-5 h-5 rounded-lg flex items-center justify-center text-white">
                                        <FaTrash size={11} />
                                    </div>
                                    <p className="font-medium text-xs">
                                        Are you sure?
                                    </p>
                                </div>

                                <div className="flex gap-x-2">
                                    <ActionButton
                                        variant="error"
                                        onClick={() => {
                                            onConfirmUClicked(wpType)
                                        }}
                                        loading={removeResult.isLoading}
                                        disabled={removeResult.isLoading}
                                    >
                                        Delete
                                    </ActionButton>
                                    <ActionButton
                                        simple
                                        onClick={() => setIsDelete(false)}
                                    >
                                        Cancel
                                    </ActionButton>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ActionButton
                            variant="error"
                            onClick={() => setIsDelete(true)}
                            Icon={MdDelete}
                        />

                        // <div
                        //     onClick={() => {
                        //         setIsDelete(true)
                        //         // onDeleteWpType(wpType)
                        //     }}
                        //     className="bottom-full p-1 rounded-full shadow-md bg-white"
                        // >
                        //     <MdDelete className="text-error-dark" />
                        // </div>
                    )}
                </div>
            </div>
        </>
    )
}
