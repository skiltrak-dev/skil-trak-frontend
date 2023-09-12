import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { useState } from 'react'

const EditRto: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<any>('')

    const router = useRouter()
    const editSubAdminId = router.query.editSubAdminId
    const navBar = useNavbar()
    const contextBar = useContextBar()

    // const subAdmin = AdminApi.SubAdmins.useListQuery(Number(editSubAdminId), {
    //     skip: !editSubAdminId,
    // })

    useEffect(() => {
        navBar.setTitle('Edit SubAdmin')
        contextBar.hide()
    }, [])

    return (
        <div className="flex justify-center">
            {/* <SubAdminForm subAdmin={subAdmin?.data} onSubmit={setFormData} /> */}
        </div>
    )
}

EditRto.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
