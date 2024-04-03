import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
    Typography,
} from '@components'
import { useAlert, useContextBar } from '@hooks'
import { useGetSubAdminStudentDetailQuery } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProfileViewCB } from './ContextBar'
import {
    AllCommunication,
    Appointments,
    AssessmentSubmissions,
    Mails,
    Notes,
    Tickets,
    Workplace,
} from './components'
import { UserStatus } from '@types'
import { FaTimes } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import dynamic from 'next/dynamic'
import { UserRoles } from '@constants'
import { getLink, getUserCredentials } from '@utils'
import { IoArrowBackOutline } from 'react-icons/io5'

const Schedule = dynamic(() => import('./components/Schedule/Schedule'), {
    ssr: false,
})
export const StudentProfileDetail = () => {
    const contextBar = useContextBar()
    const [selectedId, setSelectedId] = useState<string>('')

    useEffect(() => {
        let timer: any = null
        if (selectedId) {
            timer = setTimeout(() => {
                setSelectedId('')
            }, 2000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [selectedId])

    const router = useRouter()

    const [quickSearch, setQuickSearch] = useState<boolean>(false)

    const { alert: alertMessage, setAlerts, alerts } = useAlert()

    const profile = useGetSubAdminStudentDetailQuery(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (profile?.isSuccess && profile?.data) {
            contextBar.show(false)
            contextBar.setContent(<ProfileViewCB profile={profile?.data} />)
        }
        return () => {
            contextBar.hide()
            contextBar.setContent(null)
        }
    }, [profile])

    useEffect(() => {
        if (profile?.isSuccess && profile?.data) {
            const showAlert = () => {
                switch (profile?.data?.user?.status) {
                    case UserStatus.Pending:
                        alertMessage.warning({
                            title: 'Student is Pending',
                            description: 'Student is Pending',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Archived:
                        alertMessage.warning({
                            title: 'Student is Archived',
                            description: 'Student is Archived',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Rejected:
                        alertMessage.error({
                            title: 'Student is Rejected',
                            description: 'Student is Rejected',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Blocked:
                        alertMessage.error({
                            title: 'Student is Blocked',
                            description: 'Student is Blocked',
                            autoDismiss: false,
                        })
                        break

                    default:
                        break
                }
            }
            if (!alerts?.length) {
                showAlert()
            }
        }

        return () => {
            setAlerts([])
        }
    }, [profile])

    enum ProfileIds {
        Workplace = 'workplace',
        Notes = 'notes',
        'Assessment Evidence' = 'assessments',
        Mails = 'mails',
        'All Communications' = 'allCommunication',
        Appointments = 'appointments',
        Tickets = 'tickets',
        Schedule = 'schedule',
    }

    const onHandleScroll = (id: string) => {
        const detailItem = document.getElementById(`student-profile-${id}`)
        if (detailItem) {
            detailItem.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const activeBorder = (key: ProfileIds) =>
        selectedId === key ? 'border-2 border-primary rounded-xl' : ''

    const role = getUserCredentials()?.role

    return (
        <div>
            <div className="flex justify-between items-center gap-x-3">
                <div className="flex items-center gap-x-2.5">
                    <div
                        className={
                            'shadow-site rounded-[10px] px-2.5 bg-white group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark cursor-pointer'
                        }
                        onClick={() => {
                            role === UserRoles.ADMIN
                                ? router.push(
                                      `/${getLink('student')}` ||
                                          'portals/admin/student?tab=active&page=1&pageSize=50'
                                  )
                                : role === UserRoles.SUBADMIN
                                ? router.push(
                                      `/${getLink('subadmin-student')}` ||
                                          '/portals/sub-admin/students?tab=all'
                                  )
                                : role === UserRoles.RTO
                                ? router.push(
                                      '/portals/rto/students?tab=active'
                                  )
                                : '#'
                        }}
                    >
                        <IoArrowBackOutline className="transition-all inline-flex text-lg text-gray-600 group-hover:-translate-x-1" />
                    </div>
                    <PageTitle title="Student Profile" />
                </div>
                {quickSearch ? (
                    <div
                        className={`${
                            role !== UserRoles.ADMIN
                                ? '-mr-9'
                                : 'flex-wrap gap-x-3'
                        } pl-7 shadow px-3 w-full bg-white rounded-[10px] py-2 flex items-center justify-between`}
                    >
                        <div
                            onClick={() => {
                                setQuickSearch(false)
                            }}
                            className=""
                        >
                            <FaTimes />
                        </div>
                        <div className="w-[1px] h-6 bg-secondary-dark" />
                        {Object.entries(ProfileIds)?.map(
                            ([key, value], index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        onHandleScroll(value)
                                        setQuickSearch(false)
                                        setSelectedId(value)
                                    }}
                                >
                                    <Typography medium>
                                        <span className="text-[11px] block">
                                            {key}
                                        </span>
                                    </Typography>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setQuickSearch(true)
                        }}
                        className={`${
                            role !== UserRoles.ADMIN ? '-mr-9' : ''
                        } flex items-center gap-x-4 bg-white rounded-l-[10px] py-2 px-5 shadow-md cursor-pointer`}
                    >
                        <IoIosArrowRoundBack />
                        <Typography variant="label" color="block">
                            <span className="block cursor-pointer">
                                Quick Search
                            </span>
                        </Typography>
                    </div>
                )}
            </div>

            {profile.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation />
            ) : profile?.data && profile?.isSuccess ? (
                <div className="flex flex-col gap-y-5 mt-8 px-2">
                    <div className="h-[500px] overflow-hidden grid grid-cols-5 gap-x-3">
                        <div
                            className={`col-span-3 h-full ${activeBorder(
                                ProfileIds.Workplace
                            )}`}
                            id={`student-profile-${ProfileIds.Workplace}`}
                        >
                            <Workplace
                                studentId={profile?.data?.id}
                                studentUserId={profile?.data?.user?.id}
                            />
                        </div>
                        <div
                            className={`col-span-2 h-full ${activeBorder(
                                ProfileIds.Notes
                            )}`}
                            id={`student-profile-${ProfileIds.Notes}`}
                        >
                            <Notes userId={profile?.data?.user?.id} />
                        </div>
                    </div>
                    <div
                        className={`${activeBorder(
                            ProfileIds['Assessment Evidence']
                        )}`}
                        id={`student-profile-${ProfileIds['Assessment Evidence']}`}
                    >
                        <AssessmentSubmissions student={profile?.data} />
                    </div>
                    <div className="h-[640px] overflow-hidden grid grid-cols-2 gap-x-3">
                        <div
                            id={`student-profile-${ProfileIds.Mails}`}
                            className={`${activeBorder(ProfileIds.Mails)}`}
                        >
                            <Mails user={profile?.data?.user} />
                        </div>
                        <div
                            className={`${activeBorder(
                                ProfileIds['All Communications']
                            )}`}
                            id={`student-profile-${ProfileIds['All Communications']}`}
                        >
                            <AllCommunication user={profile?.data?.user} />
                        </div>
                    </div>
                    <div
                        className={`h-[500px] overflow-hidden grid grid-cols-2 gap-x-3 `}
                    >
                        <div
                            id={`student-profile-${ProfileIds.Appointments} `}
                            className={`${
                                selectedId === ProfileIds.Appointments
                                    ? 'border-2 border-primary'
                                    : ''
                            } !h-[inherit]`}
                        >
                            <Appointments user={profile?.data?.user} />
                        </div>
                        <div
                            id={`student-profile-${ProfileIds.Tickets}`}
                            className={`${activeBorder(ProfileIds.Tickets)}`}
                        >
                            <Tickets studentId={profile?.data?.id} />
                        </div>
                    </div>

                    <div
                        className={`${activeBorder(ProfileIds.Schedule)}`}
                        id={`student-profile-${ProfileIds.Schedule}`}
                    >
                        <Schedule
                            user={profile?.data?.user}
                            studentId={profile?.data?.id}
                        />
                    </div>
                </div>
            ) : (
                profile?.isSuccess && (
                    <EmptyData
                        title="No Student Detail"
                        description="No Student Detail were found"
                    />
                )
            )}
        </div>
    )
}
