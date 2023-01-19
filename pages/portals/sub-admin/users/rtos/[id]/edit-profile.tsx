import { ReactElement, useEffect } from 'react'

// hooks
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { RTOProfileEditForm } from '@partials/common'
import { useContextBar, useNotification } from '@hooks'
import { RtoApi } from '@queries'

//components

// icons
// queries

type Props = {}

const EditRTOProfile: NextPageWithLayout = (props: Props) => {
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
EditRTOProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default EditRTOProfile
