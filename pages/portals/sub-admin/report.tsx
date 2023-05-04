import { ReactElement } from 'react'
import { NextPageWithLayout } from '@types'

// layouts
import { SubAdminLayout } from '@layouts'

import { DownloadButton, FilterReport } from '@partials/sub-admin'
import { Card, PageTitle, Typography } from '@components'

// components

const Report: NextPageWithLayout = () => {

    return (
        <>

            <div className="flex items-center justify-between mb-4">
                <PageTitle title="Statistics" />
                <DownloadButton />
            </div>

            <Card>
                <div className="flex justify-between">
                    <div className="">
                        <Typography variant="title" color='text-gray-400'>
                            Students Assigned
                        </Typography>
                        <Typography variant="h3">
                            50
                        </Typography>
                    </div>
                    <FilterReport />
                </div>



            </Card>
        </>
    )
}

Report.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Report
