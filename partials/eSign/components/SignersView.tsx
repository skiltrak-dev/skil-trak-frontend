import React from 'react'
import { InitialAvatar, Typography } from '@components'

export const SignersView = ({ signer }: { signer: any }) => {
    return (
        <div>
            <Typography variant="xs" bold uppercase>
                {signer?.user?.role}
            </Typography>
            <div className="flex items-center gap-x-1">
                {signer?.user?.name && (
                    <InitialAvatar
                        name={signer?.user?.name}
                        imageUrl={signer?.user?.avatar}
                    />
                )}
                <div>
                    <h3 className="text-xs font-bold ">{signer?.user?.name}</h3>
                    <p className="text-[11px] text-gray-400">
                        {signer?.user?.email}
                    </p>
                </div>
            </div>
        </div>
    )
}
