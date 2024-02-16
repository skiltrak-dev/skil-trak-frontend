import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { useContextBar } from '@hooks'
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

export const StudentProfileDetail = () => {
    const contextBar = useContextBar()

    const router = useRouter()

    const [isMouseMove, setIsMouseMove] = useState<any>(null)

    const profile = useGetSubAdminStudentDetailQuery(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (profile?.isSuccess && profile?.data && !contextBar.content) {
            console.log('contextBar.content', contextBar.content)
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

    return (
        <div>
            <PageTitle title="Student Profile" />

            {profile.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation />
            ) : profile?.data && profile?.isSuccess ? (
                <div className="flex flex-col gap-y-5">
                    <div className="h-[500px] overflow-hidden grid grid-cols-5 gap-x-3">
                        <div className="col-span-3 h-full">
                            <Workplace studentId={profile?.data?.id} />
                        </div>
                        <div className="col-span-2 h-full">
                            <Notes userId={profile?.data?.user?.id} />
                        </div>
                    </div>
                    <div>
                        <AssessmentSubmissions student={profile?.data} />
                    </div>
                    <div className="h-[500px] overflow-hidden grid grid-cols-2 gap-x-3">
                        <Appointments user={profile?.data?.user} />
                        <Tickets studentId={profile?.data?.id} />
                    </div>
                    <div className="">
                        <Schedule
                            user={profile?.data?.user}
                            studentId={profile?.data?.id}
                        />
                    </div>
                    <div className="h-[640px] overflow-hidden grid grid-cols-2 gap-x-3">
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
