import { AdminApi } from '@queries'
import React, { useState } from 'react'
import { ActionButton, ShowErrorNotifications } from '@components'
import { FaFolder, FaTrash } from 'react-icons/fa'
import { AddSectoIndustryChecksForm } from '../../form'
import { useNotification } from '@hooks'
export const IndustryCheckFolder = ({
    industryCheck,
    sectorId,
}: {
    sectorId: number
    industryCheck: any
}) => {
    const [edit, setEdit] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const { notification } = useNotification()

    const [update, updateResult] = AdminApi.IndustryChecks.updateIndustryCheck()
    const [remove, removeResult] = AdminApi.IndustryChecks.removeIndustryCheck()

    const onDelete = async () => {
        const res: any = await remove(industryCheck?.id)

        if (res?.data) {
            notification.success({
                title: 'Industry Check Updated',
                description: 'Industry Check Updated Successfully',
            })
            setDeleting(false)
        }
    }

    const onSubmit = async (values: any) => {
        const res: any = await update({
            id: industryCheck?.id,
            ...values,
        })

        if (res?.data) {
            notification.success({
                title: 'Industry Check Updated',
                description: 'Industry Check Updated Successfully',
            })
            setEdit(false)
        }
    }
    return (
        <div className="border-b pb-4">
            <ShowErrorNotifications result={updateResult} />
            <ShowErrorNotifications result={removeResult} />
            {edit ? (
                <AddSectoIndustryChecksForm
                    onSubmit={onSubmit}
                    result={{}}
                    onCancel={() => setEdit(false)}
                    edit
                    initialValues={industryCheck}
                    sectorId={sectorId}
                />
            ) : (
                <div className="relative">
                    {deleting && (
                        <div className="absolute top-0 left-0 flex flex-col w-full h-full backdrop-blur-sm bg-white/50 px-2 py-2">
                            <div className="flex items-center gap-x-2 mb-4">
                                <div className="bg-red-500 w-6 h-6 rounded-lg flex items-center justify-center text-white">
                                    <FaTrash />
                                </div>
                                <p className="font-medium text-sm">
                                    Delete '{industryCheck?.name}' Folder!
                                </p>
                            </div>
                            <div className="flex gap-x-2">
                                <ActionButton
                                    loading={removeResult?.isLoading}
                                    disabled={removeResult?.isLoading}
                                    variant="error"
                                    onClick={() => {
                                        onDelete()
                                    }}
                                >
                                    Yes
                                </ActionButton>
                                <ActionButton
                                    simple
                                    onClick={() => setDeleting(false)}
                                >
                                    Cancel
                                </ActionButton>
                            </div>
                        </div>
                    )}
                    <div>
                        <div className="flex justify-between">
                            <div className="flex gap-x-2 items-center">
                                <span className="text-indigo-500">
                                    <FaFolder />
                                </span>
                                <p className="text-sm font-medium">
                                    {industryCheck?.name}
                                </p>
                            </div>

                            <div className="flex">
                                <ActionButton
                                    variant="info"
                                    simple
                                    onClick={() => setEdit(true)}
                                >
                                    Edit
                                </ActionButton>
                                <ActionButton
                                    variant="error"
                                    simple
                                    onClick={() => setDeleting(true)}
                                >
                                    Delete
                                </ActionButton>
                            </div>
                        </div>

                        <p className="text-[11px] text-gray-500">
                            {industryCheck?.link}
                        </p>
                        <div className="mt-2">
                            <p className="text-[11px] text-gray-500">
                                Description:
                            </p>
                            <p className="text-xs text-gray-700 font-medium">
                                {industryCheck?.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
