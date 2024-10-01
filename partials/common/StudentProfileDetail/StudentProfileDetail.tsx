import {
    Alert,
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useAlert, useContextBar } from '@hooks'
import { StudentStatusEnum, UserStatus } from '@types'
import { getLink, getUserCredentials } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoArrowBackOutline } from 'react-icons/io5'
import { ProfileAppointments } from '../ProfileAppointments'
import { SubAdminApi, useGetSubAdminStudentDetailQuery } from '@queries'
import {
    AssessmentSubmissions,
    MailsCommunication,
    Notes,
    Schedule,
    Tickets,
    Workplace,
} from './components'
import { ProfileViewCB } from './ContextBar'

export const StudentProfileDetail = () => {
    const contextBar = useContextBar()
    const [selectedId, setSelectedId] = useState<string>('')
    const [workplaceLength, setWorkplaceLength] = useState<number>(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

    const handleMouseMove = (event: any) => {
        if (!contextBar.content) {
            setMousePosition({ x: event.clientX, y: event.clientY })
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [contextBar])

    const router = useRouter()

    const [quickSearch, setQuickSearch] = useState<boolean>(false)

    const { alert: alertMessage, setAlerts, alerts } = useAlert()

    const role = getUserCredentials()?.role

    const profile = useGetSubAdminStudentDetailQuery(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })
    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
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
    }, [profile, mousePosition])

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
                        alertMessage[
                            profile?.data?.studentStatus ===
                            StudentStatusEnum.COMPLETED
                                ? 'success'
                                : 'warning'
                        ]({
                            title:
                                profile?.data?.studentStatus ===
                                StudentStatusEnum.COMPLETED
                                    ? 'Student is Completed'
                                    : 'Student is Archived',
                            description:
                                profile?.data?.studentStatus ===
                                StudentStatusEnum.COMPLETED
                                    ? 'Student is Completed'
                                    : 'Student is Archived',
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

    const getWorkplaceLength = (length: number) => {
        if (length) {
            setWorkplaceLength(length)
        }
    }

    return (
        <div>
            {profile?.data?.isSnoozed && (
                <Alert
                    title="Student Snoozed"
                    description={`Student Snoozed till ${moment(
                        profile?.data?.snoozedDate
                    ).format('MMM DD YYYY')}`}
                    variant="warning"
                    autoDismiss={false}
                />
            )}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-2 gap-x-3">
                <div className="flex  items-center gap-x-2.5">
                    <div
                        className={
                            'shadow-site rounded-[10px] px-2.5 bg-white group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark cursor-pointer'
                        }
                        onClick={() => {
                            role === UserRoles.ADMIN || subadmin?.data?.isAdmin
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
                            role !== UserRoles.ADMIN ? 'lg:-mr-9' : ''
                        } flex justify-end ml-auto w-fit items-center gap-x-4 bg-white rounded-l-[10px] py-2 px-5 shadow-md cursor-pointer`}
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
                <div className="flex flex-col gap-y-5 mt-8 mb-20 px-0 lg:px-2">
                    <div
                        className={`grid grid-cols-1 h-auto ${
                            role === UserRoles.ADMIN || subadmin?.data?.isAdmin
                                ? 'xl:grid-cols-1 gap-3'
                                : `xl:grid-cols-5  ${
                                      workplaceLength > 1
                                          ? 'xl:h-[570px]'
                                          : 'xl:h-[500px]'
                                  } `
                        }  px-2 gap-x-3`}
                    >
                        <div
                            className={`${
                                role === UserRoles.ADMIN ||
                                subadmin?.data?.isAdmin
                                    ? 'xl:col-span-1'
                                    : 'xl:col-span-3'
                            } h-[99%]  ${activeBorder(ProfileIds.Workplace)}`}
                            id={`student-profile-${ProfileIds.Workplace}`}
                        >
                            <Workplace
                                getWorkplaceLength={getWorkplaceLength}
                                student={profile?.data}
                            />
                        </div>
                        <div
                            className={`${
                                role === UserRoles.ADMIN ||
                                subadmin?.data?.isAdmin
                                    ? 'xl:col-span-1'
                                    : 'xl:col-span-2'
                            } h-[99%] ${activeBorder(ProfileIds.Notes)}`}
                            id={`student-profile-${ProfileIds.Notes}`}
                        >
                            <Notes userId={profile?.data?.user?.id} />
                        </div>
                    </div>
                    <div
                        className={`${activeBorder(
                            ProfileIds['Assessment Evidence']
                        )}  px-2`}
                        id={`student-profile-${ProfileIds['Assessment Evidence']}`}
                    >
                        <AssessmentSubmissions student={profile?.data} />
                    </div>
                    <div className="h-[640px] px-2  grid grid-cols-2 gap-x-3">
                        <div
                            className={`${activeBorder(
                                ProfileIds.Mails
                            )} !h-[99%] col-span-2`}
                        >
                            <MailsCommunication user={profile?.data?.user} />
                        </div>
                        {/* <div
                            id={`student-profile-${ProfileIds.Mails}`}
                            className={`${activeBorder(ProfileIds.Mails)} `}
                        >
                            <Mails user={profile?.data?.user} />
                        </div>
                        <div
                            className={`${activeBorder(
                                ProfileIds['All Communications']
                            )} `}
                            id={`student-profile-${ProfileIds['All Communications']}`}
                        >
                            <AllCommunication user={profile?.data?.user} />
                        </div> */}
                    </div>
                    <div
                        className={`h-[600px] px-3 grid grid-cols-1 xl:grid-cols-2 gap-y-5 gap-x-3 `}
                    >
                        <div
                            id={`student-profile-${ProfileIds.Appointments} `}
                            className={`${
                                selectedId === ProfileIds.Appointments
                                    ? 'border-2 border-primary'
                                    : ''
                            } !h-[99%] overflow-hidden`}
                        >
                            <ProfileAppointments
                                link={
                                    role === UserRoles.ADMIN ||
                                    subadmin?.data?.isAdmin
                                        ? {
                                              pathname:
                                                  '/portals/admin/appointment-type/create-appointment',
                                              query: {
                                                  student:
                                                      profile?.data?.user?.id,
                                              },
                                          }
                                        : role === UserRoles.SUBADMIN
                                        ? {
                                              pathname:
                                                  '/portals/sub-admin/tasks/appointments/create-appointment',
                                              query: {
                                                  student:
                                                      profile?.data?.user?.id,
                                              },
                                          }
                                        : null
                                }
                                userId={profile?.data?.user?.id}
                            />
                        </div>
                        <div
                            id={`student-profile-${ProfileIds.Tickets}`}
                            className={`${activeBorder(
                                ProfileIds.Tickets
                            )} !h-[99%] overflow-hidden`}
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
