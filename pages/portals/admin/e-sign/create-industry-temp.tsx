import { PageHeading } from '@components/headings'
import { AdminLayout } from '@layouts'
import { CreateIndustryESignTemp } from '@partials/admin/eSign/components/CreateIndustryESignTemp'
import React, { ReactElement } from 'react'

const CreateIndustryTemplate = () => {
    return (
        <div className="p-5 flex flex-col gap-y-4">
            <PageHeading
                title="E-Sign Templates"
                subtitle="Create and manage e-sign templates for industry documents"
            />
            <CreateIndustryESignTemp />
        </div>
    )
}
CreateIndustryTemplate.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default CreateIndustryTemplate
