import { NextPageWithLayout } from '@types'
import React, { ReactElement }  from 'react'
import { ManagementLayout } from '@layouts'


const MembersPage: NextPageWithLayout = () => {
    return <div>MembersPage</div>
}
MembersPage.getLayout = (page: ReactElement) => {
    return <ManagementLayout>{page}</ManagementLayout>
}
export default MembersPage