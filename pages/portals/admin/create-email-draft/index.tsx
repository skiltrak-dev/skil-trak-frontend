import { ReactElement, useState } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

import { PageHeading } from '@components/headings'
import { EmailDraftForm } from '@partials/common/AdminEmails/emailDraft'

const CreateEmailDraft: NextPageWithLayout = () => {
    return (
        <div className="p-4">
            <div className="mt-4 ml-4">
                <PageHeading
                    title={'Email Draft'}
                    subtitle={'Create email draft'}
                ></PageHeading>
            </div>
            <EmailDraftForm />
        </div>
    )
}

CreateEmailDraft.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default CreateEmailDraft
