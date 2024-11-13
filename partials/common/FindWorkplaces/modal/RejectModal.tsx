import {
    ActionModal,
    Button,
    GlobalModal,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Industry, IndustryStatus } from '@types'
import { useEffect, useState } from 'react'
import { FaBan } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

export const RejectModal = ({
    industry,
    onCancel,
}: {
    industry: any
    onCancel: any
}) => {
    const { notification } = useNotification()
    const [note, setNote] = useState<string>('')

    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useChangePendingIndustryStatus()

    const onConfirmClicked = async () => {
        await changeStatus({
            params: { id: industry?.id, status: 'rejected' },
            body: note,
        })
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.error({
                title: `Industry Reject`,
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
                            <IoMdClose size={25} className=" " />
                        </div>
                    </div>

                    <TextArea
                        name="note"
                        placeholder="Add Note here why you are rejecting"
                        required
                        onChange={(e: any) => setNote(e.target.value)}
                        rows={5}
                    />
                    <div className="flex justify-center">
                        <Button
                            variant="error"
                            text="Reject"
                            loading={changeStatusResult.isLoading}
                            disabled={changeStatusResult.isLoading}
                            onClick={onConfirmClicked}
                        />
                    </div>
                </div>
            </GlobalModal>
            {/* <ActionModal
                Icon={FaBan}
                variant="error"
                title="Are you sure!"
                description={`You are about to reject <em>"${industry?.industry?.user?.name}"</em>. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.industry?.user?.email}
                actionObject={industry}
                loading={changeStatusResult.isLoading}
            /> */}
        </>
    )
}
