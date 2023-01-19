import { useContextBar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { RTOProfileEditForm } from '@partials/common'
import { RtoApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect } from 'react'

const EditRtoProfile: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const { notification } = useNotification()
    const profile = RtoApi.Rto.useProfile()
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
        }
    }, [])
    const onSubmit = (values: any) => {
        updateProfile(values)
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
