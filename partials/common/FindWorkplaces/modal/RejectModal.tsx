import React, { useEffect, useState } from 'react'
import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { IoMdClose } from 'react-icons/io'

export const RejectModal = ({ industry, onCancel }: any) => {
    const [note, setNote] = useState('')
    const [error, setError] = useState('')

    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useChangePendingIndustryStatus()
    const { notification } = useNotification()

    const onConfirmClicked = async () => {
        if (!note.trim()) {
            setError('Please add a note explaining the rejection reason')
            return
        }

        setError('')
        await changeStatus({
            params: { id: industry?.id, status: 'rejected' },
            body: note,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: 'Industry Reject',
                description: `Industry "${industry?.industry?.user?.name}" has been Rejected.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <GlobalModal>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <Typography variant="title">
                            Reject Industry Request
                        </Typography>
                        <div
                            className="flex justify-end cursor-pointer"
                            onClick={onCancel}
                        >
                            <IoMdClose size={25} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <TextArea
                            name="note"
                            placeholder="Add Note here why you are rejecting"
                            required
                            onChange={(e: any) => {
                                setNote(e?.target?.value)
                                if (e.target.value.trim()) {
                                    setError('')
                                }
                            }}
                            rows={5}
                        />
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button
                            variant="error"
                            text="Reject"
                            loading={changeStatusResult.isLoading}
                            disabled={
                                changeStatusResult.isLoading || !note.trim()
                            }
                            onClick={onConfirmClicked}
                        />
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
