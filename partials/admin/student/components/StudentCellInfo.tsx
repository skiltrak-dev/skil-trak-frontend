import { InitialAvatar } from '@components'
import { Student } from '@types'
import { queryToUrl, setLink } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiPhoneOutgoing } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'

export const StudentCellInfo = ({
    student,
    call,
}: {
    student: Student
    call?: boolean
}) => {
    const router = useRouter()

    const query = queryToUrl(router?.query)

    return (
        <Link
            legacyBehavior
            href={`/portals/admin/student/${student?.id}?tab=overview`}
        >
            <a
                onClick={() => {
                    setLink('student', router)
                    sessionStorage.setItem(
                        'student',
                        `${router?.pathname}?${query}`
                    )
                }}
                className="flex items-center gap-x-2"
            >
                <div className="">
                    {student?.user?.name && (
                        <InitialAvatar
                            name={student?.user?.name}
                            imageUrl={student?.user?.avatar}
                        />
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <p className="flex items-center gap-x-1 text-xs">
                            {student?.studentId}
                        </p>
                        {call && student?.called && (
                            <HiPhoneOutgoing title={'Call Made'} />
                        )}
                    </div>
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
