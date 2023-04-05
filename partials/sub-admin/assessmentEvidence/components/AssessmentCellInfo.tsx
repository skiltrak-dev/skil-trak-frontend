import { InitialAvatar } from '@components'
import { Student } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const AssessmentCellInfo = ({ item }: { item: any }) => {
    console.log('student', item)
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                {item?.student?.user?.name && (
                    <div>
                        <InitialAvatar
                            name={item?.student?.user?.name}
                            imageUrl={item?.student?.user?.avatar}
                        />
                    </div>
                )}

                <Link
                    legacyBehavior
                    href={{
                        pathname: `/portals/sub-admin/tasks/assessment-evidence/${item?.student?.id}/${item?.student?.user?.id}`,
                        query: {
                            course: item?.course?.id,
                        },
                    }}
                >
                    <a>
                        <div className="flex items-center gap-x-2">
                            <p className={'text-xs text-gray-500'}>
                                {item?.student?.studentId}
                            </p>
                            {/* <div className="flex items-center gap-x-2 ">
                                            <div
                                                className={`w-1 h-1 rounded-full ${
                                                    industries === null
                                                        ? 'bg-red-400'
                                                        : 'bg-green-400'
                                                } `}
                                            ></div>
                                            <Typography
                                                variant="muted"
                                                color="text-green-400"
                                            >
                                                Completed
                                            </Typography>
                                        </div> */}
                        </div>
                        <p className="text-gray-800 font-medium">
                            {item?.student?.user?.name}
                        </p>
                        <div className="flex items-center gap-x-2 text-sm">
                            <span className="text-gray-400">
                                <FaEnvelope />
                            </span>
                            <p className="text-gray-500">
                                {item?.student?.user?.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 text-sm">
                            <span className="text-gray-400">
                                <FaPhone />
                            </span>
                            <p className="text-gray-500">
                                {item?.student?.phone}
                            </p>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
