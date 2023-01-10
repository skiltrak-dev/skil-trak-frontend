import { InitialAvatar } from '@components'
import { Student } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const StudentCellInfo = ({ student }: { student: Student }) => {
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <div>
                    {student?.user?.avatar ? (
                        <Image
                            className="rounded-full w-7 h-7"
                            src={student?.user?.avatar}
                            alt={''}
                            width={50}
                            height={50}
                        />
                    ) : (
                        <InitialAvatar name={student?.user?.name} />
                    )}
                </div>

                <Link
                    href={`/portals/sub-admin/students/${student?.id}?tab=overview`}
                >
                    <a>
                        <div className="flex items-center gap-x-2">
                            <p className={'text-xs text-gray-500'}>
                                {student?.studentId}
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
                            {student?.user?.name}
                        </p>
                        <div className="flex items-center gap-x-2 text-sm">
                            <span className="text-gray-400">
                                <FaEnvelope />
                            </span>
                            <p className="text-gray-500">
                                {student?.user?.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2 text-sm">
                            <span className="text-gray-400">
                                <FaPhone />
                            </span>
                            <p className="text-gray-500">{student?.phone}</p>
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
