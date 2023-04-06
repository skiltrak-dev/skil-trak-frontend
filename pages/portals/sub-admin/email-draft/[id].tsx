import { ReactElement, useEffect, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

import { PageHeading } from '@components/headings'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { Button, Card, EmptyData, LoadingAnimation, TechnicalError, TextInput, Typography } from '@components'


const EmailDraftDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const id = router?.query?.id
    const { data, isLoading, isError } = CommonApi.Messages.useGetTemplate(id, {
        skip: !id,
    })

    return (
        <div className='p-4'>
            <div className="my-4 ml-2">
                <PageHeading
                    title={'Email Draft'}
                    subtitle={'Email Draft Detail'}
                ></PageHeading>
            </div>
            <Card>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : (<div>
                    <div className='mb-4'>
                        <Typography variant="title" color='text-gray-500'>
                            Subject: {data?.subject}
                        </Typography>
                    </div>
                    <div>
                        <div
                            className="block mr-6"
                            dangerouslySetInnerHTML={{
                                __html: data?.content,
                            }}
                        />
                    </div>

                </div>)}
            </Card>
        </div>
    )
}

EmailDraftDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default EmailDraftDetail
