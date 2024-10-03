import { useContextBar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, OptionType } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import {
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'
import { UserRoles } from '@constants'
import { IndustryProfileFrom } from '@partials/common'
import { AdminApi, useUpdateIndustryProfileMutation } from '@queries'
import { getUserCredentials } from '@utils'

const EditRto: NextPageWithLayout = () => {
    const router = useRouter()
    const editIndustryId = Number(router.query.editIndustryId || -1)
    const contextBar = useContextBar()
    const role = getUserCredentials()?.role

    const industry = AdminApi.Industries.useDetail(editIndustryId, {
        skip: !editIndustryId,
        refetchOnMountOrArgChange: true,
    })

    const [updateProfile, updateProfileResult] =
        useUpdateIndustryProfileMutation()

    useEffect(() => {
        if (role === UserRoles.SUBADMIN) {
            router.back()
        }
    }, [role])

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    const onSubmit = (values: any) => {
        updateProfile({
            id: industry?.data?.user?.id,
            body: {
                ...values,
                courses: values?.courses?.map((course: OptionType) => ({
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
