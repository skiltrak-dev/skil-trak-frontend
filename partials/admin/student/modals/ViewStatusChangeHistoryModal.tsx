import { Modal, Typography } from '@components'
import React from 'react'
import { WorkplaceWorkIndustriesType } from 'redux/queryTypes'
import moment from 'moment'

export const ViewStatusChangeHistoryModal = ({
    onCancel,
    appliedIndustry,
}: {
    onCancel: () => void
    appliedIndustry: WorkplaceWorkIndustriesType
}) => {
    const WorkplaceStatus = [
        {
            text: 'Request Sent',
            type: appliedIndustry?.applied,
        },
        {
            text: 'Coordinator Assigned',
            type: appliedIndustry?.caseOfficerAssignedDate,
        },
        {
            text: 'Interview',
            type: appliedIndustry?.interviewDate,
        },
        {
            text: 'Meeting',
            type: appliedIndustry?.appointmentBookedDate,
        },
        {
            text: 'Awaiting Workplace Responce',
            type: appliedIndustry?.awaitingWorkplaceResponseDate,
        },
        {
            text: 'Agreement and Eligibility Pending',
            type: appliedIndustry?.awaitingAgreementSignedDate,
        },
        {
            text: 'Agreement Signed',
            type: appliedIndustry?.AgreementSignedDate,
        },
        {
            text: 'Placement Started',
            type: appliedIndustry?.placementStartedDate,
        },
        {
            text: 'Placement Completed',
            type: appliedIndustry?.isCompleted,
        },
    ]

    const updatedStatus = WorkplaceStatus?.filter((wpStatus) => wpStatus?.type)
    return (
        <Modal
            title="Status Change History"
            subtitle="View Student Workplace Status Change History"
            showActions={false}
            onCancelClick={onCancel}
        >
            <div className={'flex flex-col gap-y-1.5'}>
                {updatedStatus?.map((wpStatus, i, list) => {
                    const date1 = moment(list?.[i - 1]?.type as any)
                    const date2 = moment(wpStatus?.type as any)

                    // Calculate the difference in days
                    const difference = date2.diff(date1, 'days')

                    return (
                        <div
                            className={
                                'flex justify-between items-center gap-x-8 bg-gray-200 px-3 py-1.5 rounded-md'
                            }
                        >
                            <Typography variant={'small'} medium>
                                {wpStatus?.text}
                            </Typography>
                            <Typography variant={'small'} bold={difference > 0}>
                                {difference ? difference : '0'} Days
                            </Typography>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}
