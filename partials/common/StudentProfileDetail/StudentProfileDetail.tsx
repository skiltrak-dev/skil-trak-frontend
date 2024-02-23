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
    Schedule,
    Tickets,
    Workplace,
} from './components'
import { UserStatus } from '@types'
import { FaTimes } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'

export const StudentProfileDetail = () => {
    const contextBar = useContextBar()

    const router = useRouter()

    const [isMouseMove, setIsMouseMove] = useState<any>(null)
    const [quickSearch, setQuickSearch] = useState<boolean>(false)

    const { alert: alertMessage, setAlerts, alerts } = useAlert()

    const profile = useGetSubAdminStudentDetailQuery(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (profile?.isSuccess && profile?.data && !contextBar.content) {
            contextBar.show(false)
            contextBar.setContent(<ProfileViewCB profile={profile?.data} />)
        }
    }, [profile, isMouseMove, contextBar])

    useEffect(() => {
        window.addEventListener('mousemove', () => setIsMouseMove(true))

        return () => {
            window.removeEventListener('mousemove', () => setIsMouseMove(false))
            contextBar.hide()
            contextBar.setContent(null)
        }
    }, [])

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

    const ProfileIds = {
        Workplace: 'workplace',
        Notes: 'notes',
        Assessments: 'assessments',
        Appointments: 'appointments',
        Schedule: 'schedule',
        Mails: 'mails',
    }

    const onHandleScroll = (id: string) => {
        const detailItem = document.getElementById(`student-profile-${id}`)
        if (detailItem) {
            detailItem.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center gap-x-3">
                <PageTitle title="Student Profile" />
                {quickSearch ? (
                    <div className="-mr-9 pl-7 shadow px-3 w-full bg-white rounded-[10px] py-2 flex items-center justify-between">
                        <div
                            onClick={() => {
                                setQuickSearch(false)
                            }}
                            className=""
                        >
                            <FaTimes />
                        </div>
                        <div className="w-[1px] h-6 bg-secondary-dark" />
                        {[
                            { item: 'Workplace', id: ProfileIds.Workplace },
                            { item: 'Notes', id: ProfileIds.Notes },
                            {
                                item: 'Assessment Evidence',
                                id: ProfileIds.Assessments,
                            },
                            {
                                item: 'Appointments',
                                id: ProfileIds.Appointments,
                            },
                            { item: 'Tickets', id: ProfileIds.Appointments },
                            { item: 'Schedule', id: ProfileIds.Schedule },
                            { item: 'Mails', id: ProfileIds.Mails },
                            {
                                item: 'All communications',
                                id: ProfileIds.Mails,
                            },
                        ]?.map((item, index) => (
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    onHandleScroll(item?.id)
                                }}
                            >
                                <Typography medium>
                                    <span className="text-[9px] block">
                                        {item?.item}
                                    </span>
                                </Typography>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setQuickSearch(true)
                        }}
                        className="-mr-9 flex items-center gap-x-4 bg-white rounded-[10px] py-2 px-5 shadow-md cursor-pointer"
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
                <div className="flex flex-col gap-y-5">
                    <div className="h-[500px] overflow-hidden grid grid-cols-5 gap-x-3">
                        <div
                            className="col-span-3 h-full"
                            id={`student-profile-${ProfileIds.Workplace}`}
                        >
                            <Workplace
                                studentId={profile?.data?.id}
                                studentUserId={profile?.data?.user?.id}
                            />
                        </div>
                        <div
                            className="col-span-2 h-full"
                            id={`student-profile-${ProfileIds.Notes}`}
                        >
                            <Notes userId={profile?.data?.user?.id} />
                        </div>
                    </div>
                    <div id={`student-profile-${ProfileIds.Assessments}`}>
                        <AssessmentSubmissions student={profile?.data} />
                    </div>
                    <div
                        className="h-[500px] overflow-hidden grid grid-cols-2 gap-x-3"
                        id={`student-profile-${ProfileIds.Appointments}`}
                    >
                        <Appointments user={profile?.data?.user} />
                        <Tickets studentId={profile?.data?.id} />
                    </div>
                    <div
                        className=""
                        id={`student-profile-${ProfileIds.Schedule}`}
                    >
                        <Schedule
                            user={profile?.data?.user}
                            studentId={profile?.data?.id}
                        />
                    </div>
                    <div
                        className="h-[640px] overflow-hidden grid grid-cols-2 gap-x-3"
                        id={`student-profile-${ProfileIds.Mails}`}
                    >
                        <Mails user={profile?.data?.user} />
                        <AllCommunication user={profile?.data?.user} />
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
