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

import { AdminApi } from '@queries'
import { IoLogIn } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import Image from 'next/image'
import { DetailTabs } from '@partials/admin/rto/tabs'
import { PinnedNotes } from '@partials'
import { RtoForm } from '@partials/admin/rto/form'
import { useState } from 'react'
import { IndustriesForm } from '@partials/admin/industry/form'

const EditRto: NextPageWithLayout = () => {
  const [formData, setFormData] = useState<any>('');

  const router = useRouter()
  const editIndustryId = router.query.editIndustryId
  const navBar = useNavbar()
  const contextBar = useContextBar()

  const industry = AdminApi.Industries.useDetail(editIndustryId, {
    skip: !editIndustryId,
  })
  // console.log("rto", editIndustryId, industry);

  useEffect(() => {
    navBar.setTitle('Edit Industry')
    contextBar.hide()
  }, [])

  return (
    <div className='flex justify-center'><IndustriesForm onSubmit={industry} /></div>
  )
}

EditRto.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default EditRto
