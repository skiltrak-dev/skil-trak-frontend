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
import { Profile } from './components'

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
            contextBar.setContent(<Profile profile={profile?.data} />)
        }
    }, [profile])

    return (
        <div>
            <PageTitle title="Student Profile" />

            {profile.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation />
            ) : profile?.data && profile?.isSuccess ? (
                <p>Profile</p>
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
