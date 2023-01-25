import { Card, InitialAvatar, Select, Typography } from '@components'
import {
    Industries,
    RequestType,
    StudentDetail,
} from '@partials/sub-admin/workplace/components'

import { AdminApi } from '@queries'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { RiBook2Fill } from 'react-icons/ri'
import { AssignWorkplace } from '../AssignWorkplace'
type Props = {
    workplace: any
}

export const AdminWorkplaceRequest = ({ workplace }: Props) => {
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)

    useEffect(() => {
        setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
    }, [workplace])

    return (
        <div>
            <Card>
                <div className="flex justify-between gap-x-4 items-center pb-2.5 border-b border-dashed">
                    <AssignWorkplace workplace={workplace} />

                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <InitialAvatar
                                name={workplace?.student?.user?.name}
                                imageUrl={workplace?.student?.user?.avatar}
                            />
                            <div>
                                <Typography color={'black'} variant={'small'}>
                                    {workplace?.student?.user?.name}
                                </Typography>
                                <div className="flex items-center gap-x-2">
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        {workplace?.student?.user?.email}
                                    </Typography>
                                    <span className="text-gray-400">|</span>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        {workplace?.student?.phone}
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
                                    {workplace?.courses[0]?.sector?.name}
                                </Typography>
                                <Typography variant={'muted'}>
                                    {workplace?.courses[0]?.code} -{' '}
                                    {workplace?.courses[0]?.title}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* Request Type Selection */}
                    {/* <RequestType
                        appliedIndustry={appliedIndustry}
                        workplace={workplace}
                    /> */}
                </div>

                {/* Student Small Details */}
                <div className="mt-3 flex justify-between items-center">
                    <StudentDetail data={workplace?.student} />

                    {/*  */}
                    <div className="flex items-center gap-x-5">
                        {/* <div className="flex flex-col items-end gap-y-1">
                            <Typography variant={'small'}>
                                <span className="bg-primary-light text-primary rounded-md p-1">
                                    Documents Pending
                                </span>
                            </Typography>
                            <Typography variant={'small'} color={'text-info'}>
                                <span className="font-semibold">
                                    View Folders
                                </span>
                            </Typography>
                        </div> */}
                        <div>
                            <Typography variant={'xs'}>Recieved On:</Typography>
                            <Typography variant={'small'}>
                                <span className="font-semibold">
                                    {moment(
                                        workplace?.createdAt,
                                        'YYYY-MM-DD hh:mm:ss Z'
                                    ).format('Do MMM, YYYY')}
                                </span>
                                Date
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Industries and notes */}
                <div className="grid grid-cols-2 gap-x-3 mt-4">
                    {/* Industries */}
                    <Industries
                        appliedIndustry={appliedIndustry}
                        industries={workplace?.industries}
                        workplaceId={workplace?.id}
                        admin
                    />

                    {/* Notes */}
                    {/* <Notes /> */}
                </div>
            </Card>
        </div>
    )
}
