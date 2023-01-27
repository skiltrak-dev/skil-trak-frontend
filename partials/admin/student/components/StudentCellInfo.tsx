import { InitialAvatar } from '@components'
import { Student } from '@types'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const StudentCellInfo = ({ student }: { student: Student }) => {
    return (
        <Link legacyBehavior href={`student/${student.id}?tab=overview`}>
            <a className="flex items-center gap-x-2">
                <div className="">
                    {/* <img
                        src={
                            student.user.avatar ||
                            `https://picsum.photos/64/${64 + student.id}`
                        }
                        className="w-8 h-8 rounded-full"
                    /> */}
                    <InitialAvatar
                        name={student?.user?.name}
                        imageUrl={student?.user?.avatar}
                    />
                </div>
                <div>
                    <p className="flex items-center gap-x-1 text-xs">
                        {student?.studentId}
                    </p>
                    <p className="font-semibold">{student?.user?.name}</p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {student?.user?.email}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
