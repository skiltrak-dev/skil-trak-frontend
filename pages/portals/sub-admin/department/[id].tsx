import React, { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '@types'
import { SubAdminLayout } from '@layouts'
import { AdminApi, SubAdminApi } from '@queries'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { SubadminProfileDetail } from '@partials/admin/sub-admin'
import { useRouter } from 'next/router'

const CoordinatorsList: NextPageWithLayout = () => {
    const router = useRouter()

    const subadminDetail = AdminApi.SubAdmins.useSubadminProfile(
        Number(router.query.id),
        {
            skip: !router.query?.id,
        }
    )

    return (
        <div>
            {subadminDetail.isError ? <TechnicalError /> : null}
            {subadminDetail.isLoading ? (
                <LoadingAnimation height="h-[70vh]" />
            ) : subadminDetail?.data ? (
                <SubadminProfileDetail subadmin={subadminDetail?.data} />
            ) : subadminDetail.isSuccess ? (
                <EmptyData description="No Subadmin Detail were found!" />
            ) : null}
        </div>
    )
}

CoordinatorsList.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Coordinator Details' }}>
            {page}
        </SubAdminLayout>
    )
}
export default CoordinatorsList
