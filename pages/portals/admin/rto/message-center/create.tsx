import { AdminLayout } from '@layouts'
import { CreateMessageCenter } from '@partials'
import { ReactElement } from 'react'

const CreateMessagePage = () => {
    return <CreateMessageCenter />
}

CreateMessagePage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default CreateMessagePage
