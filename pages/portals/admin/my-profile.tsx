import { ReactElement } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

const MyProfile: NextPageWithLayout = () => {
    return <p>Saad</p>
}

MyProfile.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default MyProfile
