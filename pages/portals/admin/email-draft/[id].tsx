import { ReactElement } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

import { Card, LoadingAnimation, TechnicalError } from '@components'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'

const EmailDraftDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const id = router?.query?.id
    const { data, isLoading, isError } = CommonApi.Messages.useGetTemplate(id, {
        skip: !id,
    })

    return (
        <div className="p-4">
            <Card>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : (
                    <div>
                        <div
                            className="block mr-6"
                            dangerouslySetInnerHTML={{
                                __html: data?.content,
                            }}
                        />
                    </div>
                )}
            </Card>
        </div>
    )
}

EmailDraftDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EmailDraftDetail
