import { InitialAvatar } from '@components'
import { SubAdmin } from '@types'
import React from 'react'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const CoordinatorCellInfo = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full relative">
                {subAdmin.user.name && (
                    <InitialAvatar
                        name={subAdmin.user.name}
                        imageUrl={subAdmin.user?.avatar}
                    />
                )}
            </div>
            <div>
                <div className="flex items-center gap-x-2">
                    <p className="font-semibold">{subAdmin?.user?.name}</p>
                </div>

                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdEmail />
                        </span>
                        {subAdmin?.user?.email}
                    </p>
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdPhoneIphone />
                        </span>
                        {subAdmin?.phone}
                    </p>
                </div>
            </div>
        </div>
    )
}
