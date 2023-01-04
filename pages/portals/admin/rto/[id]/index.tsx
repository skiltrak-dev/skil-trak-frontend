import { ReactElement, useState, useEffect } from 'react'
import {
  ActionButton,
  BackButton,
  Button,
  DescriptiveInfo,
  InitialAvatar,
  InitialAvatarContainer,
  Typography,
  LoadingAnimation,
  EmptyData,
  TechnicalError,
  RtoProfileSidebar,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, Rto } from '@types'
import { useRouter } from 'next/router'
import {
  AiFillCodeSandboxCircle,
  AiOutlineBarcode,
  AiOutlineLogin,
  AiTwotonePhone,
} from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan, FaChevronDown, FaFileImport, FaPhoneAlt, FaUserGraduate } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { IoLogIn } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import Image from 'next/image'
import { DetailTabs } from '@partials/admin/rto/tabs'
import { PinnedNotes } from '@partials'
import { ArchiveModal, BlockModal } from '@partials/admin/rto/modals'

const RtoDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const navBar = useNavbar()
  const contextBar = useContextBar()

  const [modal, setModal] = useState<ReactElement | null>(null)

  const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
    skip: !router.query?.id,
  })
  useEffect(() => {
    navBar.setTitle('RTO Detail')
    navBar.setSubTitle(rto?.data?.user?.name)
    // contextBar.hide()
  }, [rto.data])
  useEffect(() => {
    if (rto.isSuccess) {
      contextBar.setContent(<RtoProfileSidebar data={rto.data} />)
      contextBar.show(false)
    }
  }, [rto.data])


  const onModalCancelClicked = () => {
    setModal(null)
  }
  const onArchiveClicked = (rto: Rto | undefined) => {
    setModal(
      <ArchiveModal item={rto} onCancel={() => onModalCancelClicked()} />
    )
  }

  const onBlockClicked = (rto: Rto | undefined) => {
    setModal(
      <BlockModal rto={rto} onCancel={() => onModalCancelClicked()} />
    )
  }
  const [showDropDown, setShowDropDown] = useState(false)


  return (
    <>
      {modal && modal}
      {rto.isError && <TechnicalError />}
      {rto?.isLoading ? (
        <LoadingAnimation />
      ) : rto.data ? (
        <div className="p-6 mb-32 flex flex-col gap-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <BackButton text="RTOs" />
            <div className="flex gap-x-2">
              {/* <Button
                onClick={() => {
                  router.push(`${rto?.data?.id}/student-list`)
                }}
              >
                Import Students
              </Button> */}
              <div className="flex items-center gap-x-3">
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropDown(true)}
                  onMouseLeave={() => setShowDropDown(false)}
                >
                  <Button>
                    <span
                      id="add-students"
                      className="flex items-center gap-x-2"
                    >
                      <span>Add Students</span>
                      <FaChevronDown />
                    </span>
                  </Button>

                  {showDropDown ? (
                    <ul className="bg-white shadow-xl rounded-xl overflow-hidden absolute">
                      <li>
                        <button
                          onClick={() => {
                            router.push(
                              `${rto?.data?.id}/student-list`
                            )
                          }}
                          className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                        >
                          <span className="text-gray-500">
                            <FaFileImport />
                          </span>
                          <span className="whitespace-nowrap">
                            {' '}
                            Import Students
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            router.push(
                              `${rto?.data?.id}/add-individual-student`
                            )
                          }}
                          className="w-full flex items-center gap-x-2 text-sm px-2 py-2 hover:bg-gray-200"
                        >
                          <span className="text-gray-500">
                            <FaUserGraduate />
                          </span>
                          <span> Add Individual</span>
                        </button>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
              <Button variant="dark">Summary Report</Button>
              <ActionButton
                Icon={FaArchive}
                onClick={() => onArchiveClicked(rto?.data)}
              >
                Archive
              </ActionButton>
              <ActionButton
                Icon={FaBan}
                variant={'error'}
                onClick={() => onBlockClicked(rto?.data)}
              >
                Block
              </ActionButton>
            </div>
          </div>



          <DetailTabs id={router.query?.id} rto={rto} />
          <PinnedNotes id={rto?.data?.user?.id} />
        </div>
      ) : (
        !rto.isError && rto.isSuccess && <EmptyData />
      )}
    </>
  )
}

RtoDetail.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default RtoDetail
