import { Button } from '@components'
import { StudentApi } from '@queries'
import { ReactElement, useEffect, useState } from 'react'
import { WorkplaceApprovalDeclaration, WorkplaceRejectedModal } from './modal'

export const WorkplaceApprovalActions = ({
    onCancel,
    declaration,
    wpApprovalId,
    dates,
}: {
    declaration: string
    onCancel?: () => void
    wpApprovalId: number
    dates: any
}) => {
    const onCancelModal = () => setModal(null)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [reqData, setReqData] = useState<{
        status: string
        date: string
    }>(
        {} as {
            status: string
            date: string
        }
    )

    const changeWpApprovalReq = StudentApi.Workplace.changeStatusWpApprroval(
        { id: wpApprovalId, ...reqData },
        {
            skip: !Object.values(reqData)?.length,
        }
    )

    useEffect(() => {
        if (changeWpApprovalReq.isSuccess) {
            if (onCancel) {
                onCancel()
            }
            onCancelModal()
        }
    }, [changeWpApprovalReq.isSuccess])

    const onApprovalClicked = (declaration: string) => {
        setModal(
            <WorkplaceApprovalDeclaration
                onCancel={(val?: boolean) => {
                    if (val) {
                        onCancelModal()
                        if (onCancel) {
                            onCancel()
                        }
                    } else {
                        onCancelModal()
                    }
                }}
                declaration={declaration}
                wpApprovalId={wpApprovalId}
            />
        )
    }

    const onRejectedClicked = () => {
        setModal(
            <WorkplaceRejectedModal
                onCancel={(val?: boolean) => {
                    if (val) {
                        onCancelModal()
                        if (onCancel) {
                            onCancel()
                        }
                    } else {
                        onCancelModal()
                    }
                }}
                wpApprovalId={wpApprovalId}
            />
        )
    }

    const updatedDates = {
        'Option 1': dates?.date1,
        'Option 2': dates?.date2,
    }
    return (
        <>
            {modal}
            <div className="w-full md:w-[400px] flex flex-col gap-y-1 items-center justify-center mx-auto py-2">
                {Object.values(dates)?.filter((date) => {
                    if (date) {
                        return date
                    }
                })?.length > 0 ? (
                    <div className="h-10 w-full flex items-center gap-x-6">
                        {Object.entries(dates)
                            ?.filter(([_, value]) => {
                                if (value) {
                                    return value
                                }
                            })
                            ?.map(([key, value], i) => (
                                <Button
                                    fullHeight
                                    fullWidth
                                    onClick={() => {
                                        setReqData({
                                            date: String(value),
                                            status: 'approved',
                                        })
                                    }}
                                    loading={changeWpApprovalReq?.isLoading}
                                    disabled={changeWpApprovalReq?.isLoading}
                                    text={`Approve With Option ${i + 1}`}
                                    variant="success"
                                />
                            ))}
                        {/* {dates?.date1 ? (
                            <Button
                                fullHeight
                                fullWidth
                                onClick={() => {
                                    setReqData({
                                        date: dates?.date1,
                                        status: 'approved',
                                    })
                                    // if (isBrowser()) {
                                    //     window?.open(
                                    //         `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/workplace/approval-request/${wpApprovalId}/update-status?status=approved&date=${dates?.date1}`
                                    //     )
                                    // }
                                    // if (onCancel) {
                                    //     onCancel()
                                    // }
                                }}
                                loading={changeWpApprovalReq?.isLoading}
                                disabled={changeWpApprovalReq?.isLoading}
                                text="Approve With Option 1"
                                variant="success"
                            />
                        ) : null}
                        {dates?.date2 ? (
                            <Button
                                fullHeight
                                fullWidth
                                onClick={() => {
                                    setReqData({
                                        date: dates?.date1,
                                        status: 'approved',
                                    })
                                    // if (isBrowser()) {
                                    //     window?.open(
                                    //         `${process.env.NEXT_PUBLIC_END_POINT}/subadmin/workplace/approval-request/${wpApprovalId}/update-status?status=approved&date=${dates?.date2}`
                                    //     )
                                    // }
                                    // if (onCancel) {
                                    //     onCancel()
                                    // }
                                }}
                                loading={changeWpApprovalReq?.isLoading}
                                disabled={changeWpApprovalReq?.isLoading}
                                text="Approve With Option 2"
                                variant="success"
                            />
                        ) : null} */}
                    </div>
                ) : (
                    <div className="h-10 w-full">
                        <Button
                            fullWidth
                            fullHeight
                            onClick={() => {
                                // onChangeStatusClicked(WPApprovalStatus.Approved)
                                onApprovalClicked(declaration)
                            }}
                            text="Approve"
                            variant="success"
                        />
                    </div>
                )}
                <div className="h-10 w-full">
                    <Button
                        fullWidth
                        fullHeight
                        onClick={() => {
                            // onChangeStatusClicked(WPApprovalStatus.Rejected)
                            onRejectedClicked()
                        }}
                        text="Reject"
                        variant="action"
                    />
                </div>
            </div>
        </>
    )
}
