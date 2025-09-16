import { Button, Card, Typography } from '@components'
import { UserRoles } from '@constants'
import React, { ReactElement, useState } from 'react'
import {
    SkipWorkplaceModal,
    UpdateIndustryEligibilityModal,
} from '../../modals'
import { useRouter } from 'next/router'
import { getUserCredentials } from '@utils'

export const EligibleWorkplaceComponent = ({
    wpReqApproval,
}: {
    wpReqApproval: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const router = useRouter()

    const role = getUserCredentials()?.role

    const onCancel = () => setModal(null)

    const onUpdateIndustryEligibility = () => {
        setModal(
            <UpdateIndustryEligibilityModal
                onCancel={onCancel}
                wpReqApproval={wpReqApproval}
            />
        )
    }

    const onWorkplaceSkippedClicked = () => {
        setModal(
            <SkipWorkplaceModal
                onCancel={onCancel}
                wpReqApproval={wpReqApproval}
            />
        )
    }
    return (
        <>
            {modal}
            <Card noPadding>
                <div className="flex flex-col gap-y-2 items-center px-4 py-2 bg-primary-light">
                    <Typography variant="label" block medium center>
                        The workplace course file does not exist or the course
                        content has not yet been approved. Once approved by HOD,
                        you will be able to send the workplace to the student
                        for approval.
                    </Typography>
                    <div className="col-span-2 flex justify-end gap-x-3">
                        <Button
                            outline
                            text="Update Workplace"
                            variant="info"
                            disabled={role === UserRoles.RTO}
                            onClick={() => {
                                role === UserRoles.ADMIN
                                    ? router.push(
                                          `/portals/admin/industry/${wpReqApproval?.industry?.id}`
                                      )
                                    : role === UserRoles.SUBADMIN
                                    ? router.push(
                                          `/portals/sub-admin/users/industries/${wpReqApproval?.industry?.id}?tab=students`
                                      )
                                    : ''
                            }}
                        />
                        <Button
                            variant="success"
                            text="Submit For Approval"
                            disabled={role === UserRoles.RTO}
                            onClick={onUpdateIndustryEligibility}
                        />
                        {
                            // is72HoursOlder(wpReqApproval?.createdAt) &&
                            !wpReqApproval?.isEligible && (
                                <Button
                                    text="Skip"
                                    variant="primary"
                                    disabled={role === UserRoles.RTO}
                                    onClick={onWorkplaceSkippedClicked}
                                />
                            )
                        }
                    </div>
                </div>
            </Card>
        </>
    )
}
