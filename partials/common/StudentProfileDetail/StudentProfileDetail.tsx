import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { useContextBar } from '@hooks'
import { useGetSubAdminStudentDetailQuery } from '@queries'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ProfileViewCB } from './ContextBar'
import {
    AllCommunication,
    Appointments,
    Mails,
    Notes,
    Schedule,
    Tickets,
    Workplace,
} from './components'

export const StudentProfileDetail = () => {
    const contextBar = useContextBar()

    const router = useRouter()

    const profile = useGetSubAdminStudentDetailQuery(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        if (profile?.isSuccess && profile?.data) {
            contextBar.show(false)
            contextBar.setContent(<ProfileViewCB profile={profile?.data} />)
        }
    }, [profile])

    return (
        <div>
            <PageTitle title="Student Profile" />

            {profile.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation />
            ) : profile?.data && profile?.isSuccess ? (
                <div>
                    <div className="h-[500px] overflow-hidden grid grid-cols-5 gap-x-3">
                        <div className="col-span-3 h-full">
                            <Workplace studentId={profile?.data?.id} />
                        </div>
                        <div className="col-span-2 h-full">
                            <Notes userId={profile?.data?.user?.id} />
                        </div>
                    </div>
                    <div className="h-[500px] overflow-hidden grid grid-cols-2 gap-x-3">
                        <Appointments user={profile?.data?.user} />
                        <Tickets studentId={profile?.data?.id} />
                    </div>
                    <div className="mt-5">
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
