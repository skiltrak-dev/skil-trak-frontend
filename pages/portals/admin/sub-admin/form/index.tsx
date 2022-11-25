import {
    ActionButton,
    BackButton,
    Button,
    Card,
    DescriptiveInfo,
    InitialAvatar,
    InitialAvatarContainer,
    Typography,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import {
    AiFillCodeSandboxCircle,
    AiOutlineBarcode,
    AiOutlineLogin,
    AiTwotonePhone,
} from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan, FaPhoneAlt } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { IoLogIn } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import Image from 'next/image'
import { DetailTabs } from '@partials/admin/rto/tabs'
import { PinnedNotes } from '@partials'
import { RtoForm } from '@partials/admin/rto/form'
import { useState } from 'react'
import { SubAdminForm } from '@partials/admin/sub-admin/form'
import { PageHeading } from '@components/headings'

const EditRto: NextPageWithLayout = () => {
    const [formData, setFormData] = useState<any>('')

    const router = useRouter()
    const editSubAdminId = router.query.editSubAdminId
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const subAdmin = AdminApi.SubAdmins.useListQuery(editSubAdminId, {
        skip: !editSubAdminId,
    })
    console.log('rto', editSubAdminId, subAdmin)

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
                <Card>
                    <SubAdminForm subAdmin={subAdmin} onSubmit={setFormData} />
                </Card>
            </div>
        </div>
    )
}

EditRto.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
