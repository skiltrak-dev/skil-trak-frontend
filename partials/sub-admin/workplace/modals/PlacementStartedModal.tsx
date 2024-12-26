import { useEffect } from 'react'
import { IoIosWarning } from 'react-icons/io'
import { HiCheckBadge } from 'react-icons/hi2'
import { useStartPlacementMutation } from '@queries'
import { useContextBar, useNotification } from '@hooks'
import { Button, ShowErrorNotifications, Typography } from '@components'

export const PlacementStartedModal = ({
    id,
    student,
    agreementSigned,
    onCancel,
}: {
    id: any
    student: any
    onCancel: Function
    agreementSigned: any
}) => {
    // hooks
    const { notification } = useNotification()

    const contextBar = useContextBar()

    // query
    const [startPlacement, startPlacementResult] = useStartPlacementMutation()

    const onConfirmUClicked = async () => {
        startPlacement(id)
    }

    useEffect(() => {
        if (startPlacementResult.isSuccess) {
            notification.success({
                title: 'Placement Started',
                description: 'Placement Started Successfully',
            })
            onCancel()
            contextBar.setContent(null)
            contextBar.setTitle(null)
            contextBar.hide()
        }
    }, [startPlacementResult])

    return (
        <>
            <ShowErrorNotifications result={startPlacementResult} />
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white modal-animation rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] px-16 py-4">
                    <div
                        className={`${
                            !agreementSigned
                                ? 'text-orange-500'
                                : 'text-green-500'
                        }`}
                    >
                        {!agreementSigned ? (
                            <IoIosWarning size={48} />
                        ) : (
                            <HiCheckBadge size={48} />
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-y-2">
                        <p className="text-lg font-semibold text-orange-500">
                            Start Placement
                        </p>
                        {!agreementSigned && (
                            <Typography
                                variant={'small'}
                                color={'text-primary'}
                            >
                                Agrement Not Signed
                            </Typography>
                        )}
                        <p className="text-gray-500 max-w-[400px] text-center">
                            You are about to start {student?.user?.name}{' '}
                            Placement on Behalf of Industry
                        </p>
                    </div>

                    <div className="flex gap-x-4 items-center">
                        <Button
                            text="Cancel"
                            variant="secondary"
                            onClick={() => {
                                onCancel && onCancel()
                            }}
                        />
                        <Button
                            text={'Start Placement'}
                            variant={'primary'}
                            onClick={() => {
                                onConfirmUClicked()
                            }}
                            loading={startPlacementResult?.isLoading}
                            disabled={startPlacementResult?.isLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
