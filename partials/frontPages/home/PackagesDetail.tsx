import React from 'react'
import { Typography } from '@components'
import { PackageDetailCard } from './PackageDetailCard'

export const PackagesDetail = ({ onClick }: { onClick: () => void }) => {
    const packagesDetail = [
        {
            text: 'Automated emails & communication records',
            highPriority: true,
        },
        {
            text: 'E-Signature',
            highPriority: true,
        },
        {
            text: 'Appointment Booking System',
        },
        {
            text: 'Student Progress Tracking',
            highPriority: true,
        },
        {
            text: 'Automated emails & communication records',
            highPriority: true,
        },
        {
            text: 'Online System Tracking',
        },
        {
            text: 'Automated emails & communication records',
            highPriority: true,
        },
        {
            text: 'Placement Management Platform',
            highPriority: true,
        },
        {
            text: 'Staff Training on Skiltrak Software',
            highPriority: true,
        },
        {
            text: 'Student Induction Class',
            highPriority: true,
        },
        {
            text: 'Ongoing Comm',
        },
        {
            text: 'Eligible Workplace Allocation',
            highPriority: true,
        },
        {
            text: 'Placement Agreement Signing',
            highPriority: true,
        },
        {
            text: 'Online Assessment',
            highPriority: true,
        },
        {
            text: 'Supervision & Observation',
        },
    ]
    return (
        <div className="max-w-7xl mx-auto mt-10">
            <div className="flex ">
                <div>
                    <div className="flex flex-col gap-y-2.5">
                        <Typography variant={'small'}>
                            Package Detail
                        </Typography>
                        <Typography variant={'h3'}>
                            Placement Management Portal
                        </Typography>
                        <Typography variant={'title'}>
                            Do it yourself
                        </Typography>
                        <Typography>
                            For classes that can be self-managed
                        </Typography>
                    </div>

                    <div className="mt-6">
                        <Typography variant={'subtitle'}>
                            Included Features:
                        </Typography>

                        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
                            {packagesDetail.map((packageDetail, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-y-2"
                                >
                                    <div
                                        className={`w-7 ${
                                            packageDetail.highPriority
                                                ? 'border-t-4 border-[#D9D9D9]'
                                                : ''
                                        } `}
                                    />
                                    <Typography
                                        variant={'subtitle'}
                                        color={
                                            packageDetail?.highPriority
                                                ? 'text-black'
                                                : 'text-[#D9D9D9]'
                                        }
                                    >
                                        {packageDetail?.text}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <PackageDetailCard onClick={onClick} />
            </div>
        </div>
    )
}
