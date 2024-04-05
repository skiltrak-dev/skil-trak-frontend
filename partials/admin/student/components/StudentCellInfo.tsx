import { InitialAvatar } from '@components'
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary'
import { useScrollIntoView } from '@hooks'
import { Student } from '@types'
import { QueryType, isBrowser, queryToUrl, setLink } from '@utils'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ImPhone, ImPhoneHangUp } from 'react-icons/im'
import { MdEmail, MdPhone } from 'react-icons/md'

export const StudentCellInfo = ({
    student,
    call,
    showHignPriority = true,
}: {
    call?: boolean
    student: Student
    showHignPriority?: boolean
}) => {
    const router = useRouter()

    const query = queryToUrl(router?.query as QueryType)

    useScrollIntoView(student) // Scroll into view with scroll ID

    // useEffect(() => {
    //     if (student && router.query.scrollId) {
    //         const element = document.getElementById(
    //             String(router.query?.scrollId)
    //         )
    //         if (element) {
    //             element.scrollIntoView({
    //                 behavior: 'smooth',
    //             })
    //         }
    //     }
    // }, [student, router])

    const callLog = student?.callLog?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            isExpired: true,
            createdAt: null,
        }
    )

    const today = moment()
    const startDate = today.startOf('week').format('MM-DD-YYYY')
    const endDate = today.endOf('week').format('MM-DD-YYYY')
    const createdAt = moment(callLog?.createdAt, 'YYYY-MM-DD')

    const isDateExist = createdAt.isBetween(startDate, endDate, 'day')

    return (
        // <div
        //     onClick={() => {
        //         router.push({
        //             pathname: router.pathname,
        //             query: { ...router.query, scrollId: student?.studentId },
        //         }) // First router.push is using for the save the full url in session storage to access when go back from detail page to list page
        //         setLink('student', router)
        //         router.push(
        //             /portals/admin/student/${student?.id}/detail
        //         ) // Secound Router.push is using for the navigating to detail page
        //     }}
        //     className="flex items-center gap-x-2 cursor-pointer"
        // >
        <Link
            legacyBehavior
            href={`/portals/admin/student/${student?.id}/detail`}
        >
            <a
                onClick={() => {
                    setLink('student', router)
                    if (isBrowser()) {
                        sessionStorage.setItem('scrollId', student?.studentId)
                    }
                }}
                className="flex items-center gap-x-2 cursor-pointer"
            >
                <div className="" id={student?.studentId}>
                    <ErrorBoundary>
                        {student?.user?.name && (
                            <InitialAvatar
                                name={student?.user?.name}
                                imageUrl={student?.user?.avatar}
                            />
                        )}
                    </ErrorBoundary>
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center gap-x-2">
                            <p
                                className={
                                    'whitespace-nowrap text-xs text-gray-500'
                                }
                            >
                                <ErrorBoundary>
                                    {student?.studentId}
                                </ErrorBoundary>
                            </p>
                            {router.pathname !== '/portals/admin/talent-pool' &&
                            showHignPriority
                                ? student?.isHighPriority && (
                                      <div className="rounded-md whitespace-nowrap px-1 py-0.5 border border-red-400 text-red-400 text-xs font-medium">
                                          High Priority
                                      </div>
                                  )
                                : null}
                        </div>
                        {call &&
                            isDateExist &&
                            (callLog.isAnswered ? (
                                <div className="rounded-full bg-success p-0.5">
                                    <ImPhone
                                        title={'Call Made and Answered'}
                                        className="text-white text-[10px]"
                                    />
                                </div>
                            ) : callLog.isAnswered === false ? (
                                <div className="rounded-full bg-red-700 p-0.5">
                                    <ImPhoneHangUp
                                        title={'Call Made and Not Answered'}
                                        className="text-white text-[10px]"
                                    />
                                </div>
                            ) : null)}
                    </div>
                    <p className="font-semibold">
                        {student?.user?.name}{' '}
                        {student?.familyName?.toLowerCase() === 'na'
                            ? ''
                            : student?.familyName}
                    </p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {student?.user?.email}
                        </p>
                    </div>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhone />
                            </span>
                            {student?.phone}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
