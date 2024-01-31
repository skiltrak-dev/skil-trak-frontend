import { Typography } from '@components'
import { UserRoles } from '@constants'
import { RTOCellInfo } from '@partials/sub-admin/rto/components'
import { StudentCellInfo } from '@partials/sub-admin/students'
import React from 'react'
import { CoordinatorCellInfo } from './CoordinatorCellInfo'
import { IndustryCellInfo } from '@partials/sub-admin/Industries'

export const SignersView = ({ signers }: { signers: any }) => {
    return (
        <div className="flex items-center gap-x-4 gap-y-3 w-auto">
            {signers?.map((signer: any) => {
                switch (signer?.user?.role) {
                    case UserRoles.STUDENT:
                        return (
                            <div>
                                <Typography variant="xs" bold uppercase>
                                    {signer?.user?.role}
                                </Typography>
                                <StudentCellInfo
                                    student={{
                                        ...signer?.user?.student,
                                        user: signer?.user,
                                    }}
                                />
                            </div>
                        )
                    case UserRoles.RTO:
                        return (
                            <div>
                                <Typography variant="xs" bold uppercase>
                                    {signer?.user?.role}
                                </Typography>
                                <RTOCellInfo
                                    rto={{
                                        ...signer?.user?.rto,
                                        user: signer?.user,
                                    }}
                                />
                            </div>
                        )
                    case UserRoles.INDUSTRY:
                        return (
                            <div>
                                <Typography variant="xs" bold uppercase>
                                    {signer?.user?.role}
                                </Typography>
                                <IndustryCellInfo
                                    industry={{
                                        ...signer?.user?.industry,
                                        user: signer?.user,
                                    }}
                                />
                            </div>
                        )
                    case UserRoles.SUBADMIN:
                        return (
                            <div>
                                <Typography variant="xs" bold uppercase>
                                    {signer?.user?.role}
                                </Typography>
                                <CoordinatorCellInfo
                                    subAdmin={{
                                        ...signer?.user?.coordinator,
                                        user: signer?.user,
                                    }}
                                />
                            </div>
                        )
                    default:
                        return
                }
            })}
        </div>
    )
}
