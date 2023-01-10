import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

const MyProfile: NextPageWithLayout = () => {
    return <p>Saad</p>
}

MyProfile.getLayout = (page: ReactElement) => {
    return (
        <IndustryLayout pageTitle={{ title: 'My Profile' }}>
            {page}
        </IndustryLayout>
    )
}

export default MyProfile
