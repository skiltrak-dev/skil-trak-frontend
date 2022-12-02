import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { AdminApi } from '@queries'
import { BackButton, PageTitle } from '@components'
import { PageHeading } from '@components/headings'

const RtoStudentLists: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
    })

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])

    return (
        <div className="p-6">
            <div className="">
                <BackButton text="Profile" />
                <PageHeading
                    title={'Student List'}
                    subtitle={'Students you have imported using lists'}
                ></PageHeading>
            </div>
        </div>
    )
}

RtoStudentLists.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoStudentLists
