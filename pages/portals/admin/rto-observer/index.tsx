import { AdminLayout } from '@layouts'
import { RtoObserverList } from '@partials/admin/rtoObserver'
import { ReactElement } from 'react'

const RtoObserver = () => {
    return <RtoObserverList />
}

RtoObserver.getLayout = (page: ReactElement) => (
    <AdminLayout>{page}</AdminLayout>
)

export default RtoObserver
