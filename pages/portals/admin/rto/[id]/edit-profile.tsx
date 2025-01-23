import { useContextBar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { RTOProfileEditForm } from '@partials/common'
import { AdminApi, RtoApi } from '@queries'
import { Course, NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

const EditRtoProfile: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    const router = useRouter()
    const profile = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
    })
    const [updateProfile, updateProfileResult] = RtoApi.Rto.useUpdateProfile()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
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
EditRtoProfile.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRtoProfile
