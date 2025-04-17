import { BackButton, Card } from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect } from 'react'

import { PageHeading } from '@components/headings'

const EditRto: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    useEffect(() => {
        navBar.setTitle('Edit SubAdmin')
        contextBar.hide()

        return () => {
            navBar.setTitle('')
        }
    }, [])

    return (
        <div className="p-6 flex flex-col gap-y-4 mb-20">
            <BackButton text="Sectors" />
            <PageHeading
                title={'Add Sub Admin'}
                subtitle={`You are creating a sector`}
            />
            <div className="w-3/4">
                <Card>{/* <SubAdminForm subAdmin={subAdmin} /> */}</Card>
            </div>
        </div>
    )
}

EditRto.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
