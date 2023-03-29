import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

// hooks
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { RTOProfileEditForm } from '@partials/common'
import { useContextBar, useNotification } from '@hooks'
import { RtoApi, useGetSubAdminRTODetailQuery } from '@queries'

//components

// icons
// queries

type Props = {}

const EditRTOProfile: NextPageWithLayout = (props: Props) => {
    const pathname = useRouter()
    const { id } = pathname.query
    const contextBar = useContextBar()
    const { notification } = useNotification()
    const profile = useGetSubAdminRTODetailQuery(String(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const [updateProfile, updateProfileResult] = RtoApi.Rto.useUpdateProfile()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    useEffect(() => {
        if (updateProfileResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
            profile.refetch()
        }
    }, [])
    const onSubmit = (values: any) => {
        updateProfile({
            id: profile?.data?.user?.id,
            body: {
                ...values,
                courses: values?.courses?.map((id: number) => ({ id })) || [],
            },
        })
    }
    return (
        <>
            <div className="px-4">
                <RTOProfileEditForm
                    onSubmit={onSubmit}
                    profile={profile}
                    result={updateProfileResult}
                />
            </div>
        </>
    )
}
EditRTOProfile.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{ title: 'Edit Profile', navigateBack: true }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default EditRTOProfile
