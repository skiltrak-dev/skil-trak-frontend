import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React, { useEffect, useState } from 'react'
import { RiBook2Fill } from 'react-icons/ri'
import { Notes } from '../Notes'
import { StudentAvailability } from '../StudentAvailability'
import { StudentDetail } from '../StudentDetail'
import moment from 'moment'
import { Actions } from '../Actions'
import { RtoDetail } from '../RtoDetail'
import { CourseDetail } from '../CourseDetail'
import { Folders } from '../Folders'
import { SmallDetail } from '../smallDetail'

export const CurrentStudentCard = ({ workplace }: any) => {
    const [industry, setIndustry] = useState<any | null>(null)

    useEffect(() => {
        if (workplace.industries) {
            setIndustry(workplace.industries[0])
        }
    }, [workplace])

    return (
        <Card>
            <div className="flex justify-between items-center pb-2.5 border-b border-dashed">
                <div className="flex items-center gap-x-6">
                    <div>
                        <Typography variant={'xs'}>Recieved On:</Typography>
                        <Typography variant={'small'}>
                            <span className="font-semibold">
                                {moment(
                                    industry?.awaitingWorkplaceResponseDate,
                                    'YYYY-MM-DD hh:mm:ss Z'
                                ).format('Do MMM, YYYY')}
                            </span>
                        </Typography>
                    </div>
                    <RtoDetail rto={workplace?.courses[0]?.rtos[0]} />
                </div>

                {/*  */}

                {/* Request Type Selection */}
                <Actions
                    student={workplace?.student}
                    workplace={workplace}
                    industry={industry}
                />
            </div>

            {/* Student Small Details */}
            <div className="mt-3 flex justify-between items-center">
                <StudentDetail
                    student={workplace?.student}
                    agreementSigned={workplace?.industries[0]?.AgreementSigned}
                />

                <CourseDetail course={workplace?.courses[0]} />

                {/*  */}
                <Folders
                    workplaceId={workplace?.id}
                    appliedIndustryId={industry?.industry?.id}
                    courseId={workplace?.courses[0]?.id}
                    workplace={workplace}
                />
            </div>

            <SmallDetail
                currentWork={workplace?.currentWork}
                haveTransport={workplace?.haveTransport}
                haveDrivingLicense={workplace?.haveDrivingLicense}
                currentQualification={workplace?.currentQualification}
            />

            {/* Industries and notes */}
            <div className="grid grid-cols-2 gap-x-3 mt-4">
                {/* Industries */}
                <StudentAvailability
                    availability={workplace?.generalAvailability}
                />
                {/* Notes */}
                <Notes workplace={workplace} />
            </div>
        </Card>
    )
}
