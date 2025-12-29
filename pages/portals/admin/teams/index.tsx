import { ReactElement } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'
import { TeamsDashboard } from '@partials/common'

const TeamsPage: NextPageWithLayout = () => {
    return (
        <div className="px-4 mt-8">
            <TeamsDashboard />
        </div>
    )
}

TeamsPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default TeamsPage
