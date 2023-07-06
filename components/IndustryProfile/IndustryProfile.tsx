import { Typography } from '@components/Typography'
import Image from 'next/image'

import { AiFillEdit } from 'react-icons/ai'
import { BiRename } from 'react-icons/bi'

import { NoData } from '@components/ActionAnimations'
import { AuthorizedUserComponent } from '@components/AuthorizedUserComponent'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { ActionButton } from '@components/buttons'
import { UserRoles } from '@constants'
import { useActionModal, useNotification } from '@hooks'
import { CourseList } from '@partials/common'
import { AddToPartnerModal } from '@partials/sub-admin/Industries/modals/AddToPartnerModal'
import { SubAdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import { BsUnlockFill } from 'react-icons/bs'
import { FaAddressCard, FaRegHandshake } from 'react-icons/fa'
import { GiBackwardTime } from 'react-icons/gi'
import { IoLocation } from 'react-icons/io5'
import { MdAdminPanelSettings, MdPhone, MdVerified } from 'react-icons/md'
import { PulseLoader } from 'react-spinners'
import { Course, GetSectorsType, Industry } from '@types'
import { IoMdEye } from 'react-icons/io'
import { Tooltip } from '@components/Tooltip'
import { IndustryCallLogModal } from '@partials/sub-admin/Industries'

type Props = {
    data: Industry
}

export const IndustryProfile = ({ data }: Props) => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const { onUpdatePassword, passwordModal } = useActionModal()
    const { notification } = useNotification()

    const [addToPartner, addToPartnerResult] =
        SubAdminApi.Industry.useAddToPartner()
    const [callLog, callLogResult] = SubAdminApi.Industry.useIndustryCallLog()

    useEffect(() => {
        if (addToPartnerResult.isSuccess) {
            notification[
                addToPartnerResult?.data?.isPartner ? 'success' : 'error'
            ]({
                title: addToPartnerResult?.data?.isPartner
                    ? 'Industry Added to Partner'
                    : 'Industry Removed from Partner',
                description: addToPartnerResult?.data?.isPartner
                    ? 'Industry Added to Partner'
                    : 'Industry Removed from Partner',
            })
        }
    }, [addToPartnerResult])

    useEffect(() => {
        if (callLogResult.isSuccess) {
            notification.success({
                title: 'Called Industry',
                description: `Called Industry with Name: ${data?.user?.name}`,
            })
        }
    }, [callLogResult])

    const getSectors = (courses: Course[]) => {
        if (!courses) return {}
        const sectors: GetSectorsType = {}
        courses.forEach((c: Course) => {
            if (sectors[c.sector.name]) {
                sectors[c.sector.name].push(c)
            } else {
                sectors[c.sector.name] = []
                sectors[c.sector.name].push(c)
            }
        })
        return sectors
    }
    const sectorsWithCourses = getSectors(data?.courses)

    const role = getUserCredentials()?.role

    const onCancelClicked = () => {
        setModal(null)
    }

    const onAddPartner = () => {
        setModal(
            <AddToPartnerModal onCancel={onCancelClicked} industry={data?.id} />
        )
    }

    const onRemovePartner = () => {
        addToPartner({ industry: data?.id, studentCapacity: 0 })
    }

    const onViewCallLogs = () => {
        setModal(
            <IndustryCallLogModal
                industryId={data?.id}
                onCancel={onCancelClicked}
            />
        )
    }
    return (
        <>
            {modal}
            {passwordModal && passwordModal}
            <ShowErrorNotifications result={callLogResult} />
            <ShowErrorNotifications result={addToPartnerResult} />

            <div>
                {/* Avatar, Name and Email */}
                <div className="flex flex-col">
                    <div className="relative flex flex-col items-center">
                        <div className="flex items-center gap-x-2 absolute top-0 right-0">
                            <ActionButton
                                rounded
                                Icon={AiFillEdit}
                                variant={'info'}
                                onClick={() =>
                                    router.push(
                                        role === 'admin'
                                            ? `/portals/admin/industry/edit-industry/${router.query.id}`
                                            : `/portals/sub-admin/users/industries/${router.query.id}/edit-profile`
                                    )
                                }
                                title="Edit Profile"
                            />

                            <ActionButton
                                rounded
                                Icon={BsUnlockFill}
                                variant={'neutral'}
                                onClick={() => onUpdatePassword(data)}
                                title="Edit Password"
                            />
                        </div>
                        {data?.user.avatar ? (
                            <Image
                                src={data?.user?.avatar}
                                width={100}
                                height={100}
                                className="rounded-full shadow-inner-image"
                                alt=""
                            />
                        ) : (
                            <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                <span className="text-4xl text-gray-300">
                                    <MdAdminPanelSettings />
                                </span>
                            </div>
                        )}
                        <div
                            className={`${
                                data?.user?.avatar
                                    ? 'w-[100px] h-[100px]'
                                    : 'w-24 h-24'
                            } absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image`}
                        ></div>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold text-center">
                            {data?.user?.name || 'N/A'}
                        </p>
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm text-gray-400">
                                {data?.user?.email || 'N/A'}
                            </p>
                            <span className="text-blue-500">
                                <MdVerified />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Row 1 */}
                <div className="flex flex-col border-b mt-4">
                    <div className="border-b py-2">
                        <div className="text-gray-400 text-[11px] ml-4 text-left">
                            ABN
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <FaAddressCard />
                            </span>
                            <Typography variant={'small'} color={'text-black'}>
                                {data?.abn}
                            </Typography>
                        </div>
                    </div>

                    <div className="border-b py-2">
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-x-2 cursor-pointer group relative">
                                    {callLogResult.isLoading && (
                                        <div className="absolute top-0 left-0 w-full h-full bg-[#00000020] text-white flex justify-center items-center">
                                            <LoadingAnimation size={20} />
                                        </div>
                                    )}
                                    <span className="text-gray-300">
                                        <MdPhone size={12} />
                                    </span>
                                    <div
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                data?.phoneNumber
                                            )
                                            callLog({
                                                industry: data?.id,
                                                receiver: UserRoles.INDUSTRY,
                                            })
                                            notification.success({
                                                title: 'Cpoied',
                                                description: 'Phone Num Copied',
                                            })
                                        }}
                                    >
                                        <p className="text-xs font-medium">
                                            {data?.phoneNumber}
                                        </p>
                                        <div className="text-gray-400 text-[11px] flex justify-start -mt-0.5 text-right">
                                            Phone Number
                                        </div>
                                    </div>
                                    <div className="mt-3 ml-5">
                                        <Tooltip>Copy to Clipboard</Tooltip>
                                    </div>
                                </div>
                                <div
                                    className="text-white bg-info rounded-md px-1.5 py-1 cursor-pointer"
                                    onClick={() => {
                                        onViewCallLogs()
                                    }}
                                >
                                    <IoMdEye size={14} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="text-gray-400 text-[11px] ml-4">
                                Phone Number
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <MdPhone />
                                </span>
                                <Typography
                                    variant={'small'}
                                    color={'text-black'}
                                >
                                    {data?.phoneNumber}
                                </Typography>
                            </div> */}
                    </div>
                    <div className="mb-2">
                        <div className="text-gray-400 text-[11px] ml-4">
                            Last Login
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <GiBackwardTime />
                            </span>
                            <Typography variant={'small'} color={'text-black'}>
                                Yesterday
                            </Typography>
                        </div>
                    </div>
                </div>
                {/* Is Partner */}
                <Typography variant={'small'} color={'text-gray-500'}>
                    Partnership
                </Typography>
                <div className="flex justify-around items-center divide-x border-t border-b">
                    <div className="p-2">
                        <div className="flex items-center gap-x-2">
                            <FaRegHandshake className="text-gray-400" />
                            <Typography
                                variant={'small'}
                                color={'text-gray-400'}
                            >
                                Partner
                            </Typography>
                        </div>
                        <div className="text-center">
                            <Typography variant={'small'} color={'text-black'}>
                                {data?.isPartner === false
                                    ? 'No'
                                    : 'Yes' || 'N/A'}
                                <AuthorizedUserComponent
                                    roles={[UserRoles.SUBADMIN]}
                                >
                                    <div>
                                        -{' '}
                                        {data?.isPartner ? (
                                            <span
                                                className="text-info cursor-pointer"
                                                onClick={() => {
                                                    if (
                                                        !addToPartnerResult.isLoading
                                                    ) {
                                                        onRemovePartner()
                                                    }
                                                }}
                                            >
                                                Remove Partner{' '}
                                                {addToPartnerResult.isLoading && (
                                                    <PulseLoader size={3} />
                                                )}
                                            </span>
                                        ) : (
                                            <span
                                                className="text-info cursor-pointer"
                                                onClick={onAddPartner}
                                            >
                                                Make Partner
                                            </span>
                                        )}
                                    </div>
                                </AuthorizedUserComponent>
                            </Typography>
                        </div>
                    </div>
                </div>

                {/* Info Row 3 */}
                <div className="flex justify-around divide-x border-b">
                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <IoLocation />
                            </span>
                            <p className="text-sm font-medium">
                                {data?.addressLine1}, {data?.addressLine2},{' '}
                                {data?.state}, {data?.suburb}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Address
                        </div>
                    </div>
                </div>
                {/* contact person row 4 */}
                <Typography variant={'small'} color={'text-gray-500'}>
                    Contact Person
                </Typography>
                <div className="flex justify-around divide-x border-t border-b">
                    <div className="p-2">
                        <div className="flex items-center gap-x-2">
                            <BiRename className="text-gray-400" />
                            <Typography
                                variant={'small'}
                                color={'text-gray-400'}
                            >
                                Name
                            </Typography>
                        </div>
                        <Typography variant={'small'} color={'text-black'}>
                            {data?.contactPerson || 'N/A'}
                        </Typography>
                    </div>
                    <div className="p-2">
                        <div className="flex items-center gap-x-2">
                            <MdPhone className="text-gray-400" />
                            <Typography
                                variant={'small'}
                                color={'text-gray-400'}
                            >
                                Phone
                            </Typography>
                        </div>
                        <Typography variant={'small'} color={'text-black'}>
                            {data?.contactPersonNumber || 'N/A'}
                        </Typography>
                    </div>
                </div>

                {/* Eligible Sectors */}
                <div className="mt-4">
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Eligible Sectors
                    </Typography>

                    {sectorsWithCourses ? (
                        Object.keys(sectorsWithCourses).map((sector) => {
                            return (
                                <Fragment key={sector}>
                                    <Typography
                                        variant={'label'}
                                        color={'text-black'}
                                    >
                                        {sector}
                                    </Typography>

                                    <CourseList
                                        courses={
                                            (sectorsWithCourses as any)[sector]
                                        }
                                    />
                                </Fragment>
                            )
                        })
                    ) : (
                        <NoData text={'No Sectors Assigned'} />
                    )}
                </div>
            </div>
        </>
    )
}
