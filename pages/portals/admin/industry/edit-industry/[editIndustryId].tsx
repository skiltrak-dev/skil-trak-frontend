import { useContextBar, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { IndustryProfileFrom } from '@partials/common'
import { AdminApi, RtoApi, useUpdateIndustryProfileMutation } from '@queries'
import { useState } from 'react'

const EditRto: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<any>('')

    const router = useRouter()
    const editIndustryId = Number(router.query.editIndustryId || -1)
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const industry = AdminApi.Industries.useDetail(editIndustryId, {
        skip: !editIndustryId,
        refetchOnMountOrArgChange: true,
    })

    const { notification } = useNotification()
    const [updateProfile, updateProfileResult] =
        useUpdateIndustryProfileMutation()

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
            router.back()
        }
    }, [])
    const onSubmit = (values: any) => {
        updateProfile({
            id: industry?.data?.user?.id,
            body: { ...values, courses: values?.courses || [] },
        })
    }

    return (
        <div className="px-4">
            <IndustryProfileFrom
                onSubmit={onSubmit}
                profile={industry}
                result={updateProfileResult}
            />
        </div>
    )
}

EditRto.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
