import { AdminLayout } from '@layouts'
import { FindWorkplaces, SearchLocation } from '@partials/common'
import { NextPageWithLayout } from '@types'
import { ReactElement, useState } from 'react'
import GoogleMapReact from 'google-map-react'
type Props = {}

const SearchWorkplaces: NextPageWithLayout = (props: Props) => {
    return (
        <div className="p-6 flex flex-col gap-y-2">
            <SearchLocation />
            {/* <FindWorkplaces /> */}
        </div>
    )
}
SearchWorkplaces.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default SearchWorkplaces
