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
        inProgress: subAdminProfileCount?.data?.inProgress || 0,
        noWorkPlace: subAdminProfileCount?.data?.noWorkPlace || 0,
        placementStarted: subAdminProfileCount?.data?.placementStarted || 0,
        appointmentBooked: subAdminProfileCount?.data?.appointmentBooked || 0,
        awaitingAgreementSigned:
            subAdminProfileCount?.data?.awaitingAgreementSigned || 0,
        students: Number(subAdminProfileCount?.data?.student) || 0,
        industries: Number(subAdminProfileCount?.data?.industry) || 0,
        rtos: Number(subAdminProfileCount?.data?.rto) || 0,
        workplaceRequests:
            Number(subAdminProfileCount?.data?.workplaceRequest) || 0,
        pendingStudents:
            Number(subAdminProfileCount?.data?.Pendingstudent) || 0,
        appointments: Number(subAdminProfileCount?.data?.appointment) || 0,
        expiredStudentWorkplace:
            Number(subAdminProfileCount?.data?.expiredStudentWorkplace) || 0,
        inProcess: Number(subAdminProfileCount?.data?.inProcess) || 0,
        appointment: Number(subAdminProfileCount?.data?.appointment) || 0,
        dontHaveWorkplace:
            Number(subAdminProfileCount?.data?.dontHaveWorkplace) || 0,
    }

    const countsUpdatedArr = {
        placementStarted: countsArr?.placementStarted,
        inProcess: countsArr?.inProcess,
        dontHaveWorkplace: countsArr?.dontHaveWorkplace,
        awaitingAgreementSigned: countsArr?.awaitingAgreementSigned,
        appointment: countsArr?.appointment,
        expiredStudentWorkplace: countsArr?.expiredStudentWorkplace,
    }

    const addedData = Object.values(countsUpdatedArr)?.reduce(
        (acum: any, curr: any) => acum + curr,
        0
    )

    const percentData = (count: number) =>
        count > 0
            ? ((((count * 100) / addedData).toFixed(1) || 0) as number)
            : 0

    const progressData: RtoProfileProgressTypes[] = [
        {
            title: 'Placement Started',
            color: '#34B53A',
            percent: percentData(countsUpdatedArr?.placementStarted),
        },
        {
            title: 'In Progress',
            color: '#4339F2',
            percent: percentData(countsUpdatedArr?.inProcess),
        },
        {
            title: 'Don’t Have Workplace',
            color: '#21516A',
            percent: percentData(countsUpdatedArr?.dontHaveWorkplace),
        },
        {
            title: 'Agreement Pending',
            color: '#FF3A29',
            percent: percentData(countsUpdatedArr?.awaitingAgreementSigned),
        },
        {
            title: 'Appointments',
            color: '#02A0FC',
            percent: percentData(countsUpdatedArr?.appointment),
        },
        {
            title: 'Expired Student Workplace',
            color: '#BF0000',
            percent: percentData(countsUpdatedArr?.expiredStudentWorkplace),
        },
    ]

    console.log({
        progressData,
    })
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
                        data={
                            progressData?.reduce((a, c) => a + +c?.percent, 0) >
                            0
                                ? progressData
                                : [
                                      {
                                          title: '...',
                                          color: '#BF0000',
                                          percent: 100,
                                      },
                                  ]
                        }
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
