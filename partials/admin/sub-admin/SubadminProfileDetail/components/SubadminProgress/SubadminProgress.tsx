import { Card, Typography } from '@components'
import { ProgressChart, RtoProfileProgressTypes } from '@partials/admin/rto'
import { ProgressView } from '@partials/admin/rto/UpdatedRtoProfileDetail/components/RtoProfileProgress/ProgressView'
import { AdminApi } from '@queries'
import React from 'react'

export const SubadminProgress = ({
    subAdminProfileCount,
}: {
    subAdminProfileCount: any
}) => {
    const countsArr = {
        inProgress: subAdminProfileCount?.data?.inProgress || 10,
        noWorkPlace: subAdminProfileCount?.data?.noWorkPlace || 10,
        placementStarted: subAdminProfileCount?.data?.placementStarted || 10,
        appointmentBooked: subAdminProfileCount?.data?.appointmentBooked || 10,
        awaitingAgreementSigned:
            subAdminProfileCount?.data?.awaitingAgreementSigned || 10,
        students: Number(subAdminProfileCount?.data?.student) || 10,
        industries: Number(subAdminProfileCount?.data?.industry) || 10,
        rtos: Number(subAdminProfileCount?.data?.rto) || 10,
        workplaceRequests:
            Number(subAdminProfileCount?.data?.workplaceRequest) || 10,
        pendingStudents:
            Number(subAdminProfileCount?.data?.Pendingstudent) || 10,
        appointments: Number(subAdminProfileCount?.data?.appointment) || 10,
    }

    const addedData = Object.values(countsArr)?.reduce(
        (acum: any, curr: any) => acum + curr,
        0
    )

    const percentData = (count: number) =>
        (((count * 100) / addedData).toFixed(1) || 0) as number

    const progressData: RtoProfileProgressTypes[] = [
        {
            title: 'Placement Started',
            color: '#34B53A',
            percent: percentData(countsArr?.placementStarted),
        },
        {
            title: 'In Progress',
            color: '#4339F2',
            percent: percentData(countsArr?.inProgress),
        },
        {
            title: 'Don’t Have Workplace',
            color: '#21516A',
            percent: percentData(countsArr?.awaitingAgreementSigned),
        },
        {
            title: 'Agreement Pending',
            color: '#FF3A29',
            percent: percentData(countsArr?.appointmentBooked),
        },
        {
            title: 'Appointments',
            color: '#02A0FC',
            percent: percentData(countsArr?.noWorkPlace),
        },
        {
            title: 'Expired Student Workplace',
            color: '#BF0000',
            percent: percentData(countsArr?.noWorkPlace),
        },
    ]
    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="h-full overflow-hidden">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Progress</span>
                    </Typography>
                </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-4 items-center h-full px-6 py-2">
                <div>
                    <ProgressChart
                        data={progressData}
                        pieSliceText={'none'}
                        height="170px"
                        pieHole={0.7}
                    />
                </div>

                {/*  */}
                <div className="w-full h-full flex items-center col-span-3">
                    <div className="w-full">
                        <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                            {progressData.map((progress, i) => (
                                <ProgressView key={i} progress={progress} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
