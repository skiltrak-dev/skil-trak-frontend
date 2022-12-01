import { ReactElement } from 'react'

// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
// components
import { Typography } from '@components'
import { ArchivedView } from '@components/sections'
// React Icons

// Queries
import { ArchivedViewContainer } from '@partials/rto'

// queries

type Props = {}

const ViewArchived: NextPageWithLayout = (props: Props) => {
    return (
        <>
            <ArchivedViewContainer role={"RTO"} />
        </>
    )
}
ViewArchived.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Assessment Tools">{page}</RtoLayout>
}

export default ViewArchived
