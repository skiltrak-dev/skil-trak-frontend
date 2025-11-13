import { AdminLayout } from '@layouts'
import { MessageCenter } from '@partials'
import React, { ReactElement } from 'react'

const MessageCenterPage = () => {
    return <MessageCenter />
}

MessageCenterPage.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default MessageCenterPage
