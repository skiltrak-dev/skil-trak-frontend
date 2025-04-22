import {
    ActionButton,
    AuthorizedUserComponent,
    Badge,
    Typography,
} from '@components'
import { paymentStatusData } from '@partials/admin/invoices'
import React from 'react'
import { AdminApi } from '@queries'
import { UserRoles } from '@constants'

export const WPInvoiceStatus = ({
    onClick,
    selectedWorkplaceId,
}: {
    onClick: () => void
    selectedWorkplaceId: number
}) => {
    const wpInvoiceStatus = AdminApi.Invoice.getInvoiceStatus(
        selectedWorkplaceId,
        {
            skip: !selectedWorkplaceId,
        }
    )
    return (
        <>
            {wpInvoiceStatus?.data && (
                <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                    {wpInvoiceStatus?.data?.paymentStatus ? (
                        <div className="flex gap-x-2">
                            <Typography
                                variant="xs"
                                color={'text-gray-500'}
                                medium
                            >
                                Invoice Status :
                            </Typography>
                            <Badge
                                text={
                                    paymentStatusData(
                                        wpInvoiceStatus?.data?.paymentStatus
                                    )?.text + ''
                                }
                                variant={'error'}
                            />
                        </div>
                    ) : (
                        <ActionButton
                            variant="info"
                            simple
                            onClick={() => {
                                onClick()
                            }}
                        >
                            Change Invoice Status
                        </ActionButton>
                    )}
                </AuthorizedUserComponent>
            )}
        </>
    )
}
