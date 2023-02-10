import { BackButton, Card } from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { PageHeading } from '@components/headings'
import { AdminApi } from '@queries'
import { useState } from 'react'

const EditRto: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<any>('')

    const router = useRouter()
    const editSubAdminId = router.query.editSubAdminId
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const subAdmin = AdminApi.SubAdmins.useListQuery(editSubAdminId, {
        skip: !editSubAdminId,
    })

    useEffect(() => {
        navBar.setTitle('Edit SubAdmin')
        contextBar.hide()
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
