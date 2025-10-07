import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const StudentAccFeatures = () => {
    return (
        <div className="flex flex-col md:justify-between md:gap-20 gap-4 md:flex-row items-center mx-auto max-w-7xl my-10 px-4 md:px-0">
            <Image
                src={
                    '/images/site/services/student-services/student-features/skiltrak-student-features.png'
                }
                alt="student"
                width={560}
                height={585}
                className=""
            />
            <div
                className=""
                style={{
                    backgroundImage:
                        'url(/images/site/services/student-services/student-features/skiltrak-student-features-lines.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="space-y-4 ">
                    <Typography variant="label" medium color={'text-primary'}>
                        Feature
                    </Typography>
                    <Typography variant="h1" bold>
                        SkilTrak Student account feature
                    </Typography>
                    <Typography variant="body">
                        Manage your placements with ease, using your SkilTrak
                        Student Account. Submit timesheets, upload documents,
                        and track your progress, all in one place. Stay
                        organised, connected, and ready for every step of your
                        placement journey.
                    </Typography>
                </div>
                <div className="flex md:items-start items-center gap-x-10 justify-center gap-y-6 md:flex-row flex-col w-full mt-12">
                    <div className="md:w-1/2 space-y-4">
                        <Image
                            src={
                                '/images/site/services/student-services/student-features/document-feature.png'
                            }
                            alt="student"
                            width={212}
                            height={212}
                            className="mx-auto"
                        />
                        <Typography variant="title" bold center>
                            Assured Placement Assistance
                        </Typography>
                        <Typography variant="body" center>
                            We take the stress out of finding the right host
                            organization. Whether you're studying Ageing
                            Support, Disability Care, or Hospitality, we match
                            you with verified, compliant workplaces aligned with
                            your course needs.
                        </Typography>
                    </div>
                    <div className="md:w-1/2 space-y-4">
                        <Image
                            src={
                                '/images/site/services/student-services/student-features/process.png'
                            }
                            alt="student"
                            width={212}
                            height={212}
                            className="mx-auto"
                        />
                        <Typography variant="title" bold center>
                            Student Portal Access
                        </Typography>
                        <Typography variant="body" center>
                            Track your placement progress, upload documents,
                            download necessary forms, and stay in control, all
                            from one user-friendly platform.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
