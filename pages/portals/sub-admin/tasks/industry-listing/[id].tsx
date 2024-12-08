import { useContextBar } from '@hooks'
import { SubAdminLayout } from '@layouts'
import { CBListingProfile, ListingProfileDetails } from '@partials/common'
import { CommonApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

const IndustryListingDetails: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const router = useRouter()
    const id = router.query.id
    const { data } = CommonApi.FindWorkplace.useIndustryListingProfileDetails(
        id,
        { skip: !id }
    )

    useEffect(() => {
        contextBar.show(false)
        contextBar.setContent(<CBListingProfile industry={data} />)

        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [])
    console.log('data::: details of listing profile', data)
    return (
        <div>
            <ListingProfileDetails />
        </div>
    )
}

IndustryListingDetails.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'Industry Profile Details',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}
export default IndustryListingDetails
