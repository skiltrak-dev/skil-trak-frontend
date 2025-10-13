import { ReactElement } from 'react'
// Layouts
import { AdminLayout } from '@layouts'
// Types
import { NextPageWithLayout } from '@types'

const PremiumFeaturesPage: NextPageWithLayout = () => {
    return (
        <>
            <div className="p-5">Premium Features</div>
        </>
    )
}

PremiumFeaturesPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default PremiumFeaturesPage
