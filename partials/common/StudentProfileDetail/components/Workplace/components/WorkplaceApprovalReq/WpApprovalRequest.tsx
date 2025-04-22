import React from 'react'
import { WorkplaceApprovalReq } from './WorkplaceApprovalReq'
import {
    ActionButton,
    AuthorizedUserComponent,
    Badge,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import moment from 'moment'

export const WpApprovalRequest = ({
    latestWorkplaceApprovaleRequest,
    workplaceStudentDetail,
    selectedWorkplace,
    onCancelWPClicked,
    onCancelWPRequestClicked,
}: {
    workplaceStudentDetail: any
    latestWorkplaceApprovaleRequest: any
    selectedWorkplace: any
    onCancelWPClicked: any
    onCancelWPRequestClicked: any
}) => {
    return (
        <>
            <div className="h-[380px] overflow-auto custom-scrollbar">
                <WorkplaceApprovalReq
                    wpReqApproval={{
                        ...latestWorkplaceApprovaleRequest,
                        student: {
                            location: workplaceStudentDetail?.data?.location,
                        },
                    }}
                    coordinator={selectedWorkplace?.assignedTo}
                />
            </div>
            <div className="flex justify-between items-center px-5 py-2">
                {!selectedWorkplace?.cancelledRequests?.length ? (
                    <div className="px-3 mt-1">
                        <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                            <ActionButton
                                variant={'error'}
                                onClick={async () => {
                                    onCancelWPClicked()
                                }}
                            >
                                Cancel Request
                            </ActionButton>
                        </AuthorizedUserComponent>
                        <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                            <ActionButton
                                variant={'error'}
                                onClick={async () => {
                                    onCancelWPRequestClicked()
                                }}
                            >
                                Cancel Request
                            </ActionButton>
                        </AuthorizedUserComponent>
                    </div>
                ) : (
                    <div className="w-64 px-3 mt-1">
                        <Badge
                            variant="warning"
                            text="WP Cancelation Request Sent to Admin, wait for APPROVAL!"
                        />
                    </div>
                )}
                <Typography variant="small" medium>
                    Recieved On:{' '}
                    {moment(selectedWorkplace?.createdAt).format(
                        'Do MMM, YYYY'
                    )}
                </Typography>
            </div>
        </>
    )
}
