import { InitialAvatar } from '@components'
import { Student } from '@types'
import { setLink } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdEmail } from 'react-icons/md'

export const StudentCellInfo = ({ student }: { student: Student }) => {
    const router = useRouter()

    return (
        <Link legacyBehavior href={`student/${student.id}?tab=overview`}>
            <a
                onClick={() => {
                    setLink('student', router)
                }}
                className="flex items-center gap-x-2"
            >
                <div className="">
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
