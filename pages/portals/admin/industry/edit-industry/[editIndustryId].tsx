import { useContextBar, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { IndustryProfileFrom } from '@partials/common'
import { AdminApi, RtoApi, useUpdateIndustryProfileMutation } from '@queries'
import { useState } from 'react'
import {
    EmptyData,
    LoadingAnimation,
    SelectOption,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'

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

    const onSubmit = (values: any) => {
        updateProfile({
            id: industry?.data?.user?.id,
            body: {
                ...values,
                courses: values?.courses?.map((course: SelectOption) => ({
                    id: course?.value,
                })),
            },
        })
    }

    return (
        <>
            <ShowErrorNotifications result={updateProfileResult} />
            <div className="px-4">
                {industry.isError && <TechnicalError />}
                {industry.isLoading || industry.isFetching ? (
                    <LoadingAnimation height={'h-[70vh]'} />
                ) : industry.data && industry.isSuccess ? (
                    <div className="px-4">
                        <IndustryProfileFrom
                            onSubmit={onSubmit}
                            profile={industry}
                            result={updateProfileResult}
                        />
                    </div>
                ) : (
                    !industry.isError && industry.isSuccess && <EmptyData />
                )}
            </div>
        </>
    )
}

EditRto.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
