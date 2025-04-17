import { ReactElement, useEffect } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query

// components
import { PageHeading } from '@components/headings'

import { Button } from '@components'
import { useNavbar } from '@hooks'
import { InvoiceRtoList } from '@partials/admin/invoices'
import { useRouter } from 'next/router'

type Props = {}

const Invoices: NextPageWithLayout = (props: Props) => {
    const navBar = useNavbar()

    const router = useRouter()

    useEffect(() => {
        navBar.setTitle('Invoices')
    }, [])

    return (
        <div className="p-6">
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading title={'Invoices'} subtitle={'List of Invoices'}>
                    <div className="flex items-center gap-x-3">
                        <Button
                            text={'Add Categories'}
                            variant="info"
                            onClick={() => {
                                router.push(
                                    `/portals/admin/invoices/add-categories`
                                )
                            }}
                        />
                    </div>
                </PageHeading>

                <InvoiceRtoList />
            </div>
        </div>
    )
}
Invoices.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default Invoices
