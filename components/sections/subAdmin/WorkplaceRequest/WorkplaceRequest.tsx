import moment from 'moment'

// Icons
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { RiBook2Fill } from 'react-icons/ri'

// components
import { Card, Typography, Button } from '@components'

import { Industries, Notes, RequestType, StudentDetail } from './components'

// query
import { useAssignToSubAdminMutation } from '@queries'

export const WorkplaceRequest = ({ workplace }: any) => {
    const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()
    return (
        <Card>
            <div className="flex justify-between items-center pb-2.5 border-b border-dashed">
                <div>
                    <Typography variant={'xs'} color={'text-gray-400'}>
                        Allocated To:
                    </Typography>
                    {workplace?.assignedTo ? (
                        <div>
                            <Typography variant={'small'} capitalize>
                                <span className="font-semibold">
                                    {workplace?.assignedTo?.user?.name}
                                </span>
                            </Typography>
                            <Typography
                                variant={'badge'}
                                color={'text-primary'}
                            >
                                + Change Coordinator
                            </Typography>
                        </div>
                    ) : (
                        <Button
                            variant={'dark'}
                            text={'ASSIGN TO ME'}
                            onClick={() => {
                                assignToMe(workplace?.id)
                            }}
                            loading={assignToMeResult?.isLoading}
                            disabled={assignToMeResult?.isLoading}
                        />
                    )}
                </div>
                <div className="flex items-center relative">
                    <div className="flex items-center gap-x-2">
                        <img
                            className="rounded-full w-8 h-8"
                            src={'https://picsum.photos/100/100'}
                            alt={''}
                        />
                        <div>
                            <Typography color={'black'} variant={'small'}>
                                Job Tranining Institute{' '}
                            </Typography>
                            <div className="flex items-center gap-x-2">
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    info@jti.edu.au
                                </Typography>
                                <span className="text-gray-400">|</span>
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    041 610 9825
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
                                Commercial Cookery {'&'} Hospitality
                            </Typography>
                            <Typography variant={'muted'}>
                                SITHCCC020 - Work Effectively As A Cook
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Request Type Selection */}
                <RequestType />
            </div>

            {/* Student Small Details */}
            <div className="mt-3 flex justify-between items-center">
                <StudentDetail data={workplace?.student} />

                {/*  */}
                <div className="flex items-center gap-x-5">
                    <div className="flex flex-col items-end gap-y-1">
                        <Typography variant={'small'}>
                            <span className="bg-primary-light text-primary rounded-md p-1">
                                Documents Pending
                            </span>
                        </Typography>
                        <Typography variant={'small'} color={'text-info'}>
                            <span className="font-semibold">View Folders</span>
                        </Typography>
                    </div>
                    <div>
                        <Typography variant={'xs'}>Recieved On:</Typography>
                        <Typography variant={'small'}>
                            <span className="font-semibold">
                                {moment(
                                    workplace?.createdAt,
                                    'YYYY-MM-DD hh:mm:ss Z'
                                ).format('Do MMM, YYYY')}
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Industries and notes */}
            <div className="grid grid-cols-2 gap-x-3 mt-4">
                {/* Industries */}
                <Industries industries={workplace?.industries} />

                {/* Notes */}
                <Notes />
            </div>
        </Card>
    )
}
