import { ReactElement } from 'react'

//Layouts
import {
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'
import { SubAdminLayout } from '@layouts'
import { IndustryProfileFrom } from '@partials/common'
import {
    useGetSubAdminIndustryProfileQuery,
    useUpdateIndustryProfileMutation,
} from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const EditIndustriesProfile: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    const profile = useGetSubAdminIndustryProfileQuery(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const [updateProfile, updateProfileResult] =
        useUpdateIndustryProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile({
            id: profile?.data?.user?.id,
            body: {
                ...values,
                courses: values?.courses?.map((course: any) => ({
                    id: course?.value,
                })),
            },
        })
    }

    return (
        <>
            <ShowErrorNotifications result={updateProfileResult} />
            <div className="px-4">
                {profile.isError && <TechnicalError />}
                {profile.isLoading || profile.isFetching ? (
                    <LoadingAnimation height={'h-[70vh]'} />
                ) : profile.data && profile.isSuccess ? (
                    <IndustryProfileFrom
                        onSubmit={onSubmit}
                        profile={profile}
                        result={updateProfileResult}
                    />
                ) : (
                    !profile.isError && profile.isSuccess && <EmptyData />
                )}
            </div>
        </>
    )
}
EditIndustriesProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default EditIndustriesProfile
