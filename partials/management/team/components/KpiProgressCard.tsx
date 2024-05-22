import { GlobalModal, Typography } from '@components'
import React, { ReactElement, useState } from 'react'
import { EditLimitModal, KpisFilterModal } from '../modal'

export const KpiProgressCard = ({ data, achieved }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const bgColor =
        data.status === 'appointment'
            ? '#CCF8FE'
            : data.status === 'placementStarted'
            ? '#E2FBD7'
            : data.status === 'agreementUploaded'
            ? '#FFE5D3'
            : '#DAD7FE'
    const barColor =
        data.status === 'appointment'
            ? '#02A0FC'
            : data.status === 'placementStarted'
            ? '#34B53A'
            : data.status === 'agreementUploaded'
            ? '#FF3A29'
            : '#4339F2'
    const title =
        data.status === 'appointment'
            ? 'Appointments'
            : data.status === 'placementStarted'
            ? 'Placement Started'
            : data.status === 'agreementUploaded'
            ? 'Agreements Uploaded'
            : 'Student Provided'

    let total = data?.target || 0
    if (achieved > total) {
        achieved = total
    }

    const onCancel = () => {
        setModal(null)
    }
    const onChangeLimit = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <EditLimitModal onCancel={onCancel} targetId={data?.id} />
            </GlobalModal>
        )
        // }
    }
    const onChangeFilter = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <KpisFilterModal onCancel={onCancel} />
            </GlobalModal>
        )
        // }
    }
    const progress = (achieved / total) * 100
    return (
        <>
            {modal && modal}
            <div className="p-4 bg-white rounded-lg w-full">
                <div className="flex items-center justify-between mb-4">
                    <Typography variant={'label'}>{title}</Typography>
                    <button
                        onClick={onChangeLimit}
                        className="text-blue-500 font-medium text-sm underline"
                    >
                        Edit Limit
                    </button>
                </div>
                <div className={`flex items-center gap-x-8`}>
                    <div
                        className={`relative w-[8.4rem] h-[8.4rem] rounded-full`}
                    >
                        {/* Progress Circle */}
                        <div className="flex items-center justify-center z-10">
                            <svg className="w-full h-full">
                                <circle
                                    cx="75"
                                    cy="75"
                                    r="60"
                                    fill={bgColor}
                                    stroke={barColor}
                                    strokeWidth="10"
                                    strokeDasharray="380"
                                    strokeDashoffset={
                                        380 - (progress * 380) / 100
                                    }
                                    className="transform -rotate-90 origin-center transition-all duration-300 ease-in-out"
                                />
                            </svg>
                        </div>

                        {/* Percentage */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-semibold">{`${Math.round(
                                progress
                            )}%`}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-y-1.5">
                        <div className="flex items-center gap-x-3 rounded-md border-2 border-dashed px-2.5 py-1.5 justify-between w-[6.5rem]">
                            <Typography
                                variant={'small'}
                                color={'text-gray-400'}
                            >
                                Target
                            </Typography>
                            <Typography
                                variant={'small'}
                                color={'text-gray-400'}
                                bold
                            >
                                {total}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-3 rounded-md border-2 border-dashed px-2.5 py-1.5 justify-between w-[6.5rem]">
                            <Typography
                                variant={'small'}
                                color={'text-gray-400'}
                            >
                                Uploaded
                            </Typography>
                            <Typography
                                variant={'small'}
                                color={'text-gray-400'}
                                bold
                            >
                                {achieved}
                            </Typography>
                        </div>
                    </div>
                </div>
                {/* <div className="flex items-center justify-between mt-4 whitespace-nowrap gap-x-3">
                    <Typography variant={'xs'} color={'text-gray-400'}>
                        Results : 24-06-2024 - 30-06-2024
                    </Typography>
                    <button
                        onClick={onChangeFilter}
                        className="text-blue-500 font-medium text-sm underline"
                    >
                        Change
                    </button>
                </div> */}
            </div>
        </>
    )
}
