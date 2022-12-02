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
    return <SubAdminLayout pageTitle={{
        title: 'Setting',
        navigateBack: true,
        backTitle: 'Back',
    }}>{page}</SubAdminLayout>
}

export default Setting
