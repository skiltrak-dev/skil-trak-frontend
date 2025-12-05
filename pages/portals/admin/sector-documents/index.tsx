import { AdminLayout } from '@layouts'
import { SectorDocuments } from '@partials'
import { NextPageWithLayout } from '@types'
import React, { ReactElement } from 'react'

const SectorDocumentsPage: NextPageWithLayout = () => {
    return (
        <div>
            <SectorDocuments />
        </div>
    )
}
SectorDocumentsPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SectorDocumentsPage
