import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

const MyProfile: NextPageWithLayout = () => {
    return <p>Saad</p>
}

MyProfile.getLayout = (page: ReactElement) => {
    return <RtoLayout pageTitle={{ title: 'My Profile' }}>{page}</RtoLayout>
}

export default MyProfile
