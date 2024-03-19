import { SiteLayout } from '@layouts'
import { UpskillTraineeship } from '@partials/frontPages'
import { ReactElement } from 'react'

const UpskillTraineeshipProgramPage = () => {
    return <UpskillTraineeship />
}

UpskillTraineeshipProgramPage.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default UpskillTraineeshipProgramPage
