import { ReactElement, useEffect, useState } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

import { PageHeading } from '@components/headings'
import { EmailDraftForm } from '@partials/common/AdminEmails/emailDraft'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { Button, Card, EmptyData, LoadingAnimation, TechnicalError, TextInput, Typography } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { BulkEmailEditor } from '@partials/common/AdminEmails/bulkEmail'
import { FileUpload } from '@hoc'
import draftToHtml from 'draftjs-to-html'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Attachment } from '@partials/common'
import { useNotification } from '@hooks'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'

const EmailDraftDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const id = router?.query?.id
    const { data, isLoading, isError } = CommonApi.Messages.useGetTemplate(id, {
        skip: !id,
    })

    return (
        <div className='p-4'>
            <Card>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : (<div>
                    <div
                        className="block mr-6"
                        dangerouslySetInnerHTML={{
                            __html: data?.content,
                        }}
                    />

                </div>)}
            </Card>
        </div>
    )
}

EmailDraftDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EmailDraftDetail
