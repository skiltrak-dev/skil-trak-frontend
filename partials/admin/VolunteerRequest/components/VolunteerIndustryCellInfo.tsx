import { HideRestrictedData, InitialAvatar } from '@components'
import { UserRoles } from '@constants'
import { Industry } from '@types'
import React from 'react'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const VolunteerIndustryCellInfo = ({
    industry,
}: {
    industry: Industry
}) => {
    return (
        <a className="flex items-center gap-x-2">
            <InitialAvatar
                name={industry?.user?.name}
                imageUrl={industry?.user?.avatar}
            />
            <div>
                <p className="font-semibold">{industry?.user?.name}</p>
                <div className="font-medium text-xs text-gray-500">
                    <HideRestrictedData type={UserRoles.INDUSTRY}>
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {industry?.user?.email}
                        </p>
                    </HideRestrictedData>
                    <HideRestrictedData type={UserRoles.INDUSTRY}>
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhoneIphone />
                            </span>
                            {industry?.phoneNumber}
                        </p>
                    </HideRestrictedData>
                </div>
            </div>
        </a>
    )
}
