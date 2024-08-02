import { InitialAvatar } from '@components'
import { User } from '@types'
import React from 'react'
import { MdEmail } from 'react-icons/md'

export const ListingCreatedBy = ({ createdBy }: { createdBy: User }) => {
    return (
        <div>
            {createdBy ? (
                <div className="flex items-center gap-x-2">
                    <div className="shadow-inner-image rounded-full relative">
                        {createdBy?.name && (
                            <InitialAvatar
                                name={createdBy?.name}
                                imageUrl={createdBy?.name}
                            />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold">{createdBy?.name}</p>
                        </div>

                        <div className="font-medium text-xs text-gray-500">
                            <p className="flex items-center gap-x-1">
                                <span>
                                    <MdEmail />
                                </span>
                                {createdBy?.email}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                '---'
            )}
        </div>
    )
}
