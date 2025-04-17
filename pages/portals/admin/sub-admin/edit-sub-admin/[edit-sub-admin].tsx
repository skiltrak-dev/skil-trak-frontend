import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect } from 'react'


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
        <div className="flex justify-center">
            {/* <SubAdminForm subAdmin={subAdmin?.data} onSubmit={setFormData} /> */}
        </div>
    )
}

EditRto.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
