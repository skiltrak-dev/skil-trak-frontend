import moment from 'moment'

// Icons
import { RiBook2Fill } from 'react-icons/ri'

// components
import { Card, Typography, Button } from '@components'

import {
    AssignToMe,
    Industries,
    Notes,
    RequestType,
    StudentDetail,
    WorkplaceFolders,
} from './components'

// utils
import { elipiciseText } from '@utils'

// query
import { useAssignToSubAdminMutation } from '@queries'
import { useEffect, useState } from 'react'
import { useContextBar } from '@hooks'

export const WorkplaceRequest = ({ workplace }: any) => {
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const [course, setCourse] = useState<any | null>(null)
    useEffect(() => {
        setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
        setCourse(workplace?.courses ? workplace?.courses[0] : {})
    }, [workplace])

    const { setContent, show } = useContextBar()

    return (
        <Card>
            <div className="flex justify-between items-center pb-2.5 border-b border-dashed">
                <AssignToMe
                    workplace={workplace}
                    appliedIndustry={appliedIndustry}
                />

                <div className="flex items-center relative">
                    <div className="flex items-center gap-x-2">
                        <img
                            className="rounded-full w-8 h-8"
                            src={'https://picsum.photos/100/100'}
                            alt={''}
                        />
                        <div>
                            <Typography color={'black'} variant={'small'}>
                                {workplace?.student?.rto?.user?.name}
                            </Typography>
                            <div className="flex items-center gap-x-2">
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    {workplace?.student?.rto?.user?.email}
                                </Typography>
                                <span className="text-gray-400">|</span>
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    {workplace?.student?.rto?.phone}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  */}
                <div className="flex items-center relative">
                    <div className="flex items-center gap-x-2">
                        <RiBook2Fill className="text-gray-400 text-2xl" />
                        <div>
                            <Typography color={'black'} variant={'xs'}>
                                {course?.sector?.name}
                            </Typography>
                            <Typography variant={'muted'}>
                                {course?.code} - {course?.title}
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Request Type Selection */}
                <RequestType data={appliedIndustry} workplace={workplace} />
            </div>

            {/* Student Small Details */}
            <div className="mt-3 flex justify-between items-center">
                <StudentDetail data={workplace?.student} />

                {/*  */}
                <WorkplaceFolders workplace={workplace} />
            </div>

            {/* Industries and notes */}
            <div className="grid grid-cols-2 gap-x-3 mt-4">
                {/* Industries */}
                <Industries
                    appliedIndustry={appliedIndustry}
                    industries={workplace?.industries}
                    workplaceId={workplace?.id}
                />

                {/* Notes */}
                <Notes workplace={workplace} />
            </div>
        </Card>
    )
}
