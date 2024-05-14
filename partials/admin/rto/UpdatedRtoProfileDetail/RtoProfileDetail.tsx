import React from 'react'
import { Rto } from '@types'
import {
    ProfileCounts,
    RtoAssessmentTools,
    RtoProfileProgress,
    RtoProfileTopbar,
    RtoReports,
    RtoSectors,
} from './components'
import { Card } from '@components'
import {
    MailsCommunication,
    Notes,
} from '@partials/common/StudentProfileDetail/components'
import { ProfileAppointments } from '@partials/common'

export const RtoProfileDetail = ({ rto }: { rto: Rto }) => {
    return (
        <div className="px-2.5 py-5">
            <RtoProfileTopbar />

            {/*  */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mt-[18px]">
                <div className="flex flex-col">
                    <div className="flex-grow">
                        <div className="h-full">
                            <ProfileCounts rtoUserId={rto?.user?.id} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex-grow">
                        <Card shadowType="profile" fullHeight>
                            <RtoProfileProgress />
                        </Card>
                    </div>
                </div>
            </div>

            {/* Sector */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 mt-5 h-[506px]">
                <RtoSectors courses={rto?.courses} />
                <div className="h-full">
                    <Notes userId={rto?.user?.id} />
                </div>
            </div>

            {/* Appointments */}
            <div className="mt-5 h-[480px]">
                <ProfileAppointments
                    link={{
                        pathname:
                            '/portals/admin/appointment-type/create-appointment',
                        query: {
                            rto: rto?.user?.id,
                        },
                    }}
                    userId={rto?.user?.id}
                />
            </div>

            {/* Assessment Tools */}
            <div className="mt-5 h-[405px]">
                <RtoAssessmentTools
                    rtoUser={rto?.user}
                    courses={rto?.courses}
                />
            </div>

            {/* Reports */}
            <div className="mt-5 h-[405px]">
                <RtoReports
                    user={rto?.user}
                    createdAt={rto?.createdAt as Date}
                />
            </div>

            {/* Mails */}
            <div className="mt-5">
                <MailsCommunication user={rto?.user} />
            </div>
        </div>
    )
}
