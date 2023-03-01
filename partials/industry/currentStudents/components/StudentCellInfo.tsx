import { InitialAvatar } from '@components'
import { Student } from '@types'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const StudentCellInfo = ({
    student,
    id,
}: {
    student: Student
    id: number
}) => {
    return (
        <Link
            legacyBehavior
            href={{
                pathname: `/portals/industry/students/current-students/${id}`,
                query: { tab: 'overview' },
            }}
        // href={`}
        >
            <a className="flex items-center gap-x-2">
                <div className="">
                    <InitialAvatar
                        name={student?.user?.name || ""}
                        imageUrl={student?.user?.avatar || ""}
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
