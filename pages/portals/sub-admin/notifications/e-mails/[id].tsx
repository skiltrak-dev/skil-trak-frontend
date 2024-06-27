import {
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { SubAdminLayout } from '@layouts'
import { CommonApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'

const EmailDetail: NextPageWithLayout = () => {
    const router = useRouter()

    const mailDetail = CommonApi.Messages.useMailDetail(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )
    const [isSeen] = CommonApi.Messages.useIsSeen()

    useEffect(() => {
        if (router?.query?.id && !mailDetail?.data?.isSeen) {
            isSeen(router?.query?.id)
        }
    }, [router?.query, mailDetail?.data])

    return (
        <div>
            <Card shadowType="profile">
                {mailDetail.isError ? <TechnicalError /> : null}
                {mailDetail?.isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : mailDetail?.data ? (
                    <div>
                        <Typography semibold>
                            Subject : {mailDetail?.data?.subject}
                        </Typography>
                        <div>
                            <Typography variant={'label'}>Message</Typography>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: mailDetail?.data?.message,
                                }}
                            />
                        </div>
                    </div>
                ) : mailDetail?.isSuccess ? (
                    <EmptyData />
                ) : null}
            </Card>
        </div>
    )
}

EmailDetail.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Mail Detail' }}>
            {page}
        </SubAdminLayout>
    )
}

export default EmailDetail
