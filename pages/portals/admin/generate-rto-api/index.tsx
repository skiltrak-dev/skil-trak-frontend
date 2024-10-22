import { AdminLayout } from '@layouts'
import { RtoListWithKey } from '@partials'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'

const GenerateRtoApi: NextPageWithLayout = () => {
    return (
        <div>
            <RtoListWithKey />
        </div>
    )
}
GenerateRtoApi.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default GenerateRtoApi
