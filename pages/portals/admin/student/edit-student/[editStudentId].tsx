import {
    ActionButton,
    BackButton,
    Button,
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

import { AdminApi, useUpdateStudentProfileMutation } from '@queries'
import { IoLogIn } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import Image from 'next/image'
import { DetailTabs } from '@partials/admin/rto/tabs'
import { PinnedNotes } from '@partials'
import { RtoForm } from '@partials/admin/rto/form'
import { useState } from 'react'
import { StudentForm } from '@partials/admin/student/form'
import { StudentProfileForm } from '@partials/common'

const EditStudent: NextPageWithLayout = () => {
    const router = useRouter()
    const editStudentId = Number(router.query.editStudentId)
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const student = AdminApi.Students.useProfile(editStudentId, {
        skip: !editStudentId,
    })

    const [updateProfile, updateProfileResult] =
        useUpdateStudentProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile({ id: student?.data?.user?.id, body: values })
    }

    useEffect(() => {
        navBar.setTitle('Edit Student')
        contextBar.hide()
    }, [])

    return (
        <div className="px-4">
            <StudentProfileForm
                onSubmit={onSubmit}
                profile={student}
                result={updateProfileResult}
            />
        </div>
    )
}

EditStudent.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default EditStudent
