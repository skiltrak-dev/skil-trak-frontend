import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
    InitialAvatar,
    InitialAvatarContainer,
    LoadingAnimation,
    EmptyData,
    Typography,
    Card,
    TechnicalError,
} from '@components'

import {
    Sectors,
    Workplaces,
    Appointments,
    CourseFolders,
    RequiredDocs,
    DetailTabs,
} from '@partials/admin/student'

import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, Student } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import {
    AiFillCodeSandboxCircle,
    AiOutlineBarcode,
    AiOutlineLogin,
    AiTwotonePhone,
} from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan, FaPhoneAlt, FaUniversity } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { IoLogIn } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import Image from 'next/image'
import { GoPrimitiveDot } from 'react-icons/go'
import { BlockModal, ArchiveModal } from '@partials/admin/student/modals'
import { PinnedNotes } from '@partials'
import { StudentProfile } from '@partials/student/pages'

const Detail: NextPageWithLayout = () => {
    return (
        <div className="px-8">
            <StudentProfile noTitle />
        </div>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Detail
