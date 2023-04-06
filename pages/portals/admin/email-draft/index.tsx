import { ReactElement, useState } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

import { PageHeading } from '@components/headings'

import { useRouter } from 'next/router'
import { Button } from '@components'
import { EmailDraftList } from '@partials/common/AdminEmails/emailDraft'


const EmailDraft: NextPageWithLayout = () => {
    const router = useRouter()

    return (
        <>
            <div className="mt-4 ml-4">
                <PageHeading
                    title={'Email Draft'}
                    subtitle={'Email Draft List'}
                ></PageHeading>
            </div>
            <div className="flex justify-end px-4 py-2">
                <Button
                    text="Add New Draft"
                    onClick={() =>
                        router.push('/portals/admin/create-email-draft')
                    }
                />
            </div>
            <EmailDraftList />
        </>
    )
}

EmailDraft.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EmailDraft
