import { Student } from '@types'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const StudentCellInfo = ({ student }: { student: Student }) => {
    return (
        <Link href={`/portals/rto/users/students/${student.id}?tab=overview`}>
            <a className="flex items-center gap-x-2">
                <div className="shadow-inner-image rounded-full">
                    <img
                        src={
                            student.user.avatar ||
                            `https://picsum.photos/64/${64 + student.id}`
                        }
                        className="w-8 h-8 rounded-full"
                    />
                </div>
                <div>
                    <p className="flex items-center gap-x-1 text-xs">
                        {student.studentId}
                    </p>
                    <p className="font-semibold">{student.user.name}</p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {student.user.email}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
