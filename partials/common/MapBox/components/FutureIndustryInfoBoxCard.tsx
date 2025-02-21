import {
    AuthorizedUserComponent,
    Badge,
    GlobalModal,
    MailForm,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useContextBar, useNotification, useSubadminProfile } from '@hooks'
import {
    CommonApi,
    SubAdminApi,
    useAddExistingIndustriesMutation,
} from '@queries'
import { IndustryStatus, SubAdmin } from '@types'
import { ellipsisText, getUserCredentials, maskText } from '@utils'
import Image from 'next/image'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'
import { IndustryListingCB } from '../contextBar'
import { CopyInfoData } from './CopyInfoData'
import { useRouter } from 'next/router'
import { ComposeListingIndustryMail } from '@partials/common/FindWorkplaces'
import { UserRoles } from '@constants'

type FutureIndustryInfoBoxCardProps = {
    item: any
    selectedBox: any
    setSelectedBox: any
    industryId?: any
    workplace?: any
    appliedIndustry?: any
    workplaceMapCard?: boolean
    onCancel?: any
}

export const FutureIndustryInfoBoxCard = ({
    item,
    selectedBox,
    setSelectedBox,
    industryId,
    workplace,
    appliedIndustry,
    workplaceMapCard = false,
    onCancel,
}: FutureIndustryInfoBoxCardProps) => {
    const workplaceId = workplace?.id
    industryId = selectedBox?.id

    const contextBar = useContextBar()
    const [isComposeMail, setIsComposeMail] = useState<boolean>(false)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const subadmin = useSubadminProfile()

    // apply for industry
    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()
    // const [addToContacted, addToContactedResult] =
    //     CommonApi.FindWorkplace.useFutureIndustryContacted()
    const [addToContacted, addToContactedResult] =
        SubAdminApi.Workplace.contactWorkplaceIndustry()

    const sectors = selectedBox?.sector

    const { notification } = useNotification()
    const router = useRouter()

    useEffect(() => {
        if (addToContactedResult.isSuccess) {
            notification.success({
                title: 'Industry Contacted',
                description: 'Industry Contacted Successfully',
            })
        }
    }, [addToContactedResult.isSuccess])

    useEffect(() => {
        if (addExistingIndustryResult.isSuccess) {
            notification.success({
                title: 'Industry Added Successfully',
                description: 'Industry Added Successfully',
            })
            onCancel()
        }
    }, [addExistingIndustryResult])

    const onViewIndustryListingDetail = () => {
        contextBar.show(false)
        contextBar.setContent(<IndustryListingCB id={selectedBox?.id} />)
        contextBar.setTitle('Industry Listing Details')
    }

    const statusData = () => {
        switch (selectedBox?.status) {
            case IndustryStatus.FAVOURITE:
                return <Badge variant="success" text={selectedBox?.status} />
            case IndustryStatus.DO_NOT_DISTURB:
                return <Badge variant="error" text={selectedBox?.status} />
            case IndustryStatus.BLOCKED:
                return <Badge variant="error" text={selectedBox?.status} />
            case IndustryStatus.DEFAULT:
                return <Badge variant="info" text={selectedBox?.status} />

            default:
                return <p>---</p>
        }
    }

    const onComposeMail = () => {
        setModal(
            <GlobalModal>
                <div>
                    <ComposeListingIndustryMail
                        industry={selectedBox}
                        onCancelComposeMail={onCancelComposeMail}
                    />
                </div>
            </GlobalModal>
        )
    }

    const onCancelComposeMail = useCallback(() => {
        setModal(null)
    }, [])

    const rolesIncludes = [UserRoles.ADMIN, UserRoles.RTO]

    const role = getUserCredentials()?.role

    return (
        <>
            {modal}
            <ShowErrorNotifications
                result={addExistingIndustryResult ?? addToContactedResult}
            />
            <div className="min-w-80">
                {item.isError && <NoData text="Something is not right...!" />}
                {item?.isLoading ? (
                    <PulseLoader />
                ) : (
                    <>
                        <div className="w-10 rounded-full h-10 relative z-50 border border-gray-200 ml-3">
                            <Image
                                src={'/images/icons/avatars/std-boy.png'}
                                alt={'avatar'}
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        <div className="relative min-w-72 bg-white px-2.5 py-5 rounded-lg shadow-lg -mt-5">
                            <FaTimes
                                size={18}
                                className="cursor-pointer absolute top-2 right-2"
                                onClick={() => {
                                    setSelectedBox(null)
                                }}
                            />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-b-8 border-b-white border-x-8 border-x-transparent"></div>
                            <div className="mt-2">
                                {!workplaceMapCard ? (
                                    <div className="flex items-center gap-x-2">
                                        <div className="relative group w-fit">
                                            <Typography variant="title">
                                                {ellipsisText(
                                                    selectedBox?.businessName ??
                                                        'NA',
                                                    25
                                                )}
                                            </Typography>
                                            <CopyInfoData
                                                text={selectedBox?.businessName}
                                                type={'Business Name'}
                                            />
                                        </div>
                                        {statusData()}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between gap-x-4 border-b pb-2">
                                        <div className="flex flex-col gap-y-1">
                                            <Typography
                                                variant="muted"
                                                color={'text-gray-400'}
                                            >
                                                Industry
                                            </Typography>

                                            <div className="relative group w-fit">
                                                <Typography variant="muted">
                                                    {ellipsisText(
                                                        item?.data?.user?.name,
                                                        15
                                                    )}
                                                </Typography>

                                                {/*  */}
                                                <CopyInfoData
                                                    text={
                                                        item?.data?.user?.name
                                                    }
                                                    type={'Name'}
                                                />
                                            </div>

                                            <div className="relative group w-fit">
                                                <Typography variant="muted">
                                                    {maskText(
                                                        selectedBox?.email
                                                    )}
                                                </Typography>
                                                {/*  */}
                                                {(rolesIncludes?.includes(
                                                    role
                                                ) ||
                                                    subadmin?.departmentMember
                                                        ?.isHod) && (
                                                    <CopyInfoData
                                                        text={
                                                            selectedBox?.email
                                                        }
                                                        type={'Email'}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-1 whitespace-nowrap">
                                            <Typography
                                                variant="muted"
                                                color={'text-gray-400'}
                                            >
                                                Contact Person
                                            </Typography>
                                            <Typography variant="muted">
                                                {ellipsisText(
                                                    item?.data?.contactPerson,
                                                    15
                                                ) ?? 'NA'}
                                            </Typography>

                                            <div className="relative group w-fit">
                                                <Typography variant="xs">
                                                    {item?.data
                                                        ?.contactPersonNumber ??
                                                        'NA'}
                                                </Typography>

                                                {/*  */}
                                                <CopyInfoData
                                                    text={
                                                        item?.data
                                                            ?.contactPersonNumber
                                                    }
                                                    type={
                                                        'Contact Person Number'
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/*  */}
                            <div>
                                <div className="flex flex-col gap-y-1 my-1.5">
                                    <div className="relative group w-fit">
                                        <Typography variant="muted">
                                            {maskText(
                                                selectedBox?.email,
                                                rolesIncludes?.includes(role) ||
                                                    subadmin?.departmentMember
                                                        ?.isHod
                                                    ? selectedBox?.email
                                                          ?.length || 0
                                                    : 4
                                            )}
                                        </Typography>

                                        {/*  */}
                                        {(rolesIncludes?.includes(role) ||
                                            subadmin?.departmentMember
                                                ?.isHod) && (
                                            <CopyInfoData
                                                text={selectedBox?.email}
                                                type={'Email'}
                                            />
                                        )}
                                    </div>
                                    <div
                                        onClick={() =>
                                            // addToContacted({
                                            //     receiver:
                                            //         industryId ??
                                            //         selectedBox?.id,
                                            // })
                                            addToContacted({
                                                studentId: Number(
                                                    router?.query?.id
                                                ),
                                                industryId,
                                                wpId: workplaceId,
                                                isListing: true,
                                            })
                                        }
                                        className="relative group w-fit"
                                    >
                                        <Typography variant="xs">
                                            {selectedBox?.phone ?? 'NA'}
                                        </Typography>

                                        {/*  */}
                                        <div className="py-1">
                                            <CopyInfoData
                                                text={selectedBox?.phone}
                                                type={'Phone Number'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Typography
                                    variant="muted"
                                    color={'text-gray-400'}
                                >
                                    Sector
                                </Typography>

                                {sectors?.map((s: any) => (
                                    <div
                                        key={s?.id}
                                        className="border-b border-gray-200 pb-2 mb-2"
                                    >
                                        {/* <Typography variant="xxs">
                                            {s?.code || 'N/A'}
                                        </Typography> */}
                                        <Typography variant="xs">
                                            {s?.name || 'N/A'}
                                        </Typography>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center gap-x-12">
                                <div className="flex justify-center mt-1.5">
                                    {/* <Link
                                        className="text-blue-400 text-xs"
                                        href={`/portals/sub-admin/tasks/industry-listing?tab=all&page=1&pageSize=50&${
                                            selectedBox?.email
                                                ? 'email'
                                                : 'phone'
                                        }=${
                                            selectedBox?.email
                                                ? selectedBox?.email
                                                : selectedBox?.phone
                                        }`}
                                    >
                                        View
                                    </Link> */}
                                    <div className="flex items-center gap-x-2">
                                        <div
                                            onClick={() => {
                                                onViewIndustryListingDetail()
                                            }}
                                        >
                                            <Typography
                                                variant="small"
                                                color="text-info"
                                                cursorPointer
                                            >
                                                View
                                            </Typography>
                                        </div>
                                        <div
                                            onClick={() => {
                                                onComposeMail()
                                            }}
                                        >
                                            <Typography
                                                variant="small"
                                                color="text-success"
                                                cursorPointer
                                            >
                                                Compose Email
                                            </Typography>
                                        </div>
                                    </div>
                                </div>

                                {!appliedIndustry && workplaceMapCard && (
                                    // !industry?.applied &&
                                    // industry?.industryResponse !== 'noResponse' &&
                                    // industry?.industryResponse !== 'rejected' &&
                                    <Typography
                                        variant={'xs'}
                                        color={'text-red-800'}
                                        center
                                    >
                                        <span
                                            className="cursor-pointer whitespace-pre"
                                            // onClick={() => {
                                            //     if (!appliedIndustry) {
                                            //         applyForWorkplace({
                                            //             industry:
                                            //                 industryId,
                                            //             id: workplace?.id,
                                            //         })
                                            //     } else {
                                            //         notification.error({
                                            //             title: 'Already Applied',
                                            //             description:
                                            //                 'Already Applied to another Industry',
                                            //         })
                                            //     }
                                            // }}
                                            onClick={() => {
                                                addExistingIndustry({
                                                    workplaceId,
                                                    industryId: industryId,
                                                })
                                            }}
                                        >
                                            {addExistingIndustryResult.isLoading ? (
                                                <PulseLoader size={4} />
                                            ) : (
                                                'APPLY HERE'
                                            )}
                                        </span>
                                    </Typography>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
