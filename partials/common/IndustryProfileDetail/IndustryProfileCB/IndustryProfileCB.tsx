import { Industry } from '@types'
import React from 'react'
import { IndustryProfileAvatar, ProfileLinks } from './components'

export const IndustryProfileCB = ({ industry }: { industry: Industry }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    {/* <Avatar
                        avatar={profile?.user?.avatar}
                        name={profile?.user?.name}
                    /> */}
                    <IndustryProfileAvatar
                        avatar={industry?.user?.avatar as string}
                    />
                </div>
                <ProfileLinks industry={industry} />
            </div>
        </div>
    )
}
