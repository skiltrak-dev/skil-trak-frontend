import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import { RtoForm } from '@partials/admin/rto/form'
import { AdminApi } from '@queries'
import { useState } from 'react'

const EditRto: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<any>('')

    const router = useRouter()
    const editRtoId = Number(router.query.editRtoId) || -1
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const rto = AdminApi.Rtos.useDetailQuery(editRtoId, {
        skip: !editRtoId,
    })

    useEffect(() => {
        navBar.setTitle('Edit Rto')
        contextBar.hide()
    }, [])

    return (
        <div className="flex justify-center">
            <RtoForm onSubmit={rto} />
        </div>
    )
}

EditRto.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
