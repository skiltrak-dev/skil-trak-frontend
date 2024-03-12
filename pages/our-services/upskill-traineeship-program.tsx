import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { SiteLayout } from '@layouts'
import { UpskillTraineeship } from '@partials/frontPages'
import React, { ReactElement } from 'react'

const UpskillTraineeshipProgramPage = () => {
    return <UpskillTraineeship />
}

UpskillTraineeshipProgramPage.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default UpskillTraineeshipProgramPage
