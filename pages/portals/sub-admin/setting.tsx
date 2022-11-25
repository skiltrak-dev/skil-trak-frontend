import { ReactElement, useEffect } from 'react'
import { NextPageWithLayout } from '@types'

// layouts
import { SubAdminLayout } from '@layouts'

// components
import { SettingContainer } from '@partials'

const Setting: NextPageWithLayout = () => {
    return <SettingContainer />
}

Setting.getLayout = (page: ReactElement) => {
    return <SubAdminLayout title="Setting">{page}</SubAdminLayout>
}

export default Setting
