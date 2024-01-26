import { InitialAvatar, Typography } from '@components'
import React from 'react'

export const ViewSignersCB = ({ signers }: { signers: any }) => {
    return (
        <div className="flex flex-col gap-y-3 pl-2">
            {signers.map((signer: any) => (
                <div>
                    <Typography variant="label" uppercase semibold>
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
                            <Typography variant="label">
                                {signer?.user?.name}
                            </Typography>
                            <Typography variant="small">
                                {signer?.user?.email}
                            </Typography>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
