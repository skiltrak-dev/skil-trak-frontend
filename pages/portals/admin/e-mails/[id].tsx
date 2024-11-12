import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { MailDetail } from '@partials/common/MailsListing'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect } from 'react'

const EmailDetail: NextPageWithLayout = () => {
    const navbar = useNavbar()

    useEffect(() => {
        navbar.setTitle('Mail Detail')

        return () => {
            navbar.setTitle('Mail Detail')
        }
    }, [])

    return (
        <div className="p-6">
            <MailDetail />
        </div>
    )
}

EmailDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EmailDetail
