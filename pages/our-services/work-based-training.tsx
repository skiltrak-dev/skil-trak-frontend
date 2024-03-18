import { SiteLayout } from '@layouts'
import { WorkBaseTraining } from '@partials/frontPages'
import { ReactElement } from 'react'

const WorkBasedTraining = () => {
    return <WorkBaseTraining />
}

WorkBasedTraining.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default WorkBasedTraining
