import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import React from 'react'
import { TiWarning } from 'react-icons/ti'

export const RemoveFromFalgModal = ({
    studentId,
    onCancel,
}: {
    studentId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [problamaticStudent, problamaticStudentResult] =
        SubAdminApi.Student.useProblamaticStudent()

    const onRemoveFromFlagged = async () => {
        const res: any = await problamaticStudent({ studentId })
        if (res?.data) {
            notification.success({
                title: 'Remove as Flaged',
                description: 'Removed Marked As Flaged',
            })
            onCancel()
        }
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={problamaticStudentResult} />
            <div className="flex flex-col justify-center items-center gap-y-4 px-20 py-10">
                <div>
                    <TiWarning className="text-yellow-500" size={55} />
                </div>
                <div className="fex flex-col gap-y-8 justify-center items-center mb-5">
                    <Typography variant="h4" center>
                        Are you sure?
                    </Typography>
                    <Typography variant="body" center>
                        You want to switch the flag OFF?
                    </Typography>
                </div>
                <div className="flex items-center gap-x-4">
                    <Button onClick={onCancel} outline variant="error">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onRemoveFromFlagged()
                        }}
                        loading={problamaticStudentResult.isLoading}
                        disabled={problamaticStudentResult.isLoading}
                    >
                        Yes
                    </Button>
                </div>
            </div>
        </GlobalModal>
    )
}
