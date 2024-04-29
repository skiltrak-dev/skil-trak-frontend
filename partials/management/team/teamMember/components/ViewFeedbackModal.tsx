import { Button, Typography, NoData, LoadingAnimation } from '@components'
import React from 'react'
import { useRouter } from 'next/router'
import { ManagementApi } from '@queries'

export const ViewFeedbackModal = ({ onCancel }: any) => {
    const router = useRouter()
    const reportId = router.query.reportId
    const { data, isError, isLoading } =
        ManagementApi.CheckKpi.useKpiReportFeedback(reportId, {
            skip: !reportId,
        })

    return (
        <div className="pb-9 pt-5 px-5 flex flex-col gap-y-5">
            <Typography variant="title" color={'text-primaryNew'} semibold>
                Remarks
            </Typography>
            <div className="flex flex-col gap-y-3 remove-scrollbar max-h-[calc(100vh-200px)] overflow-auto">
                {isError && <>Something went wrong</>}
                {isLoading ? (
                    <LoadingAnimation />
                ) : data && data.length > 0 ? (
                    data?.map((feedback: any, index: number) => (
                        <div className="p-4 bg-[#FEF6E6] rounded-lg flex flex-col gap-y-3">
                            <div>
                                <Typography variant="label" semibold>
                                    {index + 1} - Remarks
                                </Typography>
                                <Typography variant="small">
                                    {feedback?.comment || 'N/A'}
                                </Typography>
                            </div>
                            <div>
                                <Typography
                                    variant="muted"
                                    color={'text-primaryNew'}
                                    semibold
                                >
                                    Added On
                                </Typography>
                                <Typography
                                    variant="small"
                                    color={'text-primaryNew'}
                                >
                                    {feedback?.createdAt?.slice(0, 10) || 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    ))
                ) : (
                    !isError && <NoData text={'No Feedback Found'} />
                )}
            </div>
            <div className="flex justify-center items-center gap-x-4">
                <Button variant={'error'} onClick={onCancel} text="Close" />
            </div>
        </div>
    )
}
