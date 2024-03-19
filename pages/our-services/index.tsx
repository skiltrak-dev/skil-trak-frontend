import { useHeaderWrapperTitle } from '@hooks'
import { SiteLayout } from '@layouts'
import { OurServices } from '@partials/frontPages'
import dynamic from 'next/dynamic'
import { ReactElement, useEffect } from 'react'

const LatestUpdates = dynamic(
    () => import('@partials/frontPages/home2/LatestUpdates/LatestUpdates')
)

const OurservicesPage = () => {
    const { setTitle } = useHeaderWrapperTitle()
    useEffect(() => {
        setTitle('Our Services')
    }, [])

    return (
        <div>
            <OurServices />
            <LatestUpdates />
        </div>
    )
}

OurservicesPage.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default OurservicesPage
