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
            date: appliedIndustry?.appliedDate,
        },
        {
            text: 'Coordinator Assigned',
            date: appliedIndustry?.caseOfficerAssignedDate,
        },
        {
            text: 'Interview',
            date: appliedIndustry?.interviewDate,
        },
        {
            text: 'Meeting',
            date: appliedIndustry?.appointmentBookedDate,
        },
        {
            text: 'Awaiting Workplace Responce',
            date: appliedIndustry?.awaitingWorkplaceResponseDate,
        },
        {
            text: 'Agreement and Eligibility Pending',
            date: appliedIndustry?.awaitingAgreementSignedDate,
        },
        {
            text: 'Agreement Signed',
            date: appliedIndustry?.AgreementSignedDate,
        },
        {
            text: 'Placement Started',
            date: appliedIndustry?.placementStartedDate,
        },
        {
            text: 'Placement Completed',
            date: appliedIndustry?.isCompletedDate,
        },
    ]

    const updatedStatus = WorkplaceStatus?.filter((wpStatus) => wpStatus?.date)
    return (
        <Modal
            title="Status Change History"
            subtitle="View Student Workplace Status Change History"
            showActions={false}
            onCancelClick={onCancel}
        >
            <div className={'flex flex-col gap-y-1.5'}>
                {updatedStatus?.map((wpStatus, i, list) => {
                    const date1 = moment(list?.[i - 1]?.date as any)
                    const date2 = moment(wpStatus?.date as any)

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
                                {/* {difference ? difference : '0'} Days */}
                                {moment(wpStatus?.date).format('MMM DD, YYYY')}
                            </Typography>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}
