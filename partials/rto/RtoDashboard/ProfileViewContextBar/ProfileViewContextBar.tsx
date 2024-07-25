import { ProfileLinks, RtoDetails, RtoPackage } from '@partials/admin'
import React from 'react'
import { Rto } from '@types'
import {
    InitialAvatarContainer,
    InitialAvatar,
    RtoAvatar,
    Typography,
} from '@components'
import { getSectors } from '@utils'
import { UpdatedCourseList } from '@partials/common'

export const ProfileViewContextBar = ({ rto }: { rto: Rto }) => {
    const sectorsWithCourses = getSectors(rto?.courses)
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    {/* <Avatar
                        avatar={profile?.user?.avatar}
                        name={profile?.user?.name}
                    /> */}
                    <RtoAvatar
                        user={rto?.user?.id}
                        imageUrl={rto?.user?.avatar}
                        canEdit
                    />
                </div>
                <ProfileLinks rto={rto} />
                {/* User */}
            </div>
            <div className="mt-2">
                <Typography semibold>
                    <span className="text-[15px]">{rto?.user?.name}</span>
                </Typography>
                <Typography variant="xs" color="text-[#6B7280]">
                    {rto?.user?.email}
                </Typography>
            </div>

            {/*  */}
            {/* RtoDetails */}
            <div className="py-5 border-b border-secondary-dark">
                <RtoDetails rto={rto} />
            </div>
            {/* RtoPackage */}
            <div className="py-5 border-b border-secondary-dark">
                <RtoPackage rto={rto} />
            </div>

            {/*  */}
            <div className="py-3.5 border-b border-secondary-dark">
                <p className="text-[11px] text-gray-400">
                    Placement Coordinators
                </p>
                <div className="flex justify-between gap-x-2">
                    <div>
                        <p className="font-medium text-sm">
                            {rto?.subadmin[0]?.user.name}
                        </p>
                        <p className="text-xs font-medium text-slate-400">
                            {rto?.subadmin[0]?.user.email}
                        </p>
                    </div>

                    {rto?.subadmin.length && (
                        <InitialAvatarContainer show={1}>
                            {rto?.subadmin.map((coordinator: any) => (
                                <InitialAvatar
                                    name={coordinator?.user?.name}
                                    first
                                />
                            ))}
                        </InitialAvatarContainer>
                    )}
                </div>
            </div>

            {/*  */}
            <UpdatedCourseList sectorsWithCourses={sectorsWithCourses} />
        </div>
    )
}
