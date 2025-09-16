import { Button, Card, Typography } from '@components'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import React, { ReactElement, useState } from 'react'
import {
    SkipCurrentWPApplyAnotherWPModal,
    WpConfirmCapacity,
} from '../../modals'

export const VerifyCapacityComponent = ({
    wpReqApproval,
}: {
    wpReqApproval: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const role = getUserCredentials()?.role

    const onCancel = () => setModal(null)

    const onSkipCurrentWPApplyAnotherWP = () => {
        setModal(
            <SkipCurrentWPApplyAnotherWPModal
                onCancel={onCancel}
                wpReqApproval={wpReqApproval}
            />
        )
    }

    const onWorkplaceConfirmCapacity = () => {
        setModal(
            <WpConfirmCapacity
                onCancel={onCancel}
                wpReqApproval={wpReqApproval}
            />
        )
    }

    return (
        <>
            {modal}
            <Card noPadding>
                <div className="flex flex-col gap-y-2 items-center px-4 py-2 bg-gray-200">
                    <Typography
                        variant="label"
                        color="text-red-500"
                        block
                        medium
                        center
                    >
                        Please verify the workplace student capacity prior to
                        student placement confirmation.
                    </Typography>
                    <div className="col-span-2 flex justify-end gap-x-3">
                        <Button
                            variant="success"
                            text="Capacity Verified"
                            disabled={role === UserRoles.RTO}
                            onClick={onWorkplaceConfirmCapacity}
                        />
                        <Button
                            text="Skip this workplace"
                            variant="primary"
                            disabled={role === UserRoles.RTO}
                            onClick={onSkipCurrentWPApplyAnotherWP}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}
