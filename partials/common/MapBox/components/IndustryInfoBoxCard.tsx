import {
    Badge,
    NoData,
    ShowErrorNotifications,
    Typography,
    useIsRestricted,
    useRestrictedData,
} from '@components'
import { useContextBar, useNotification, useWorkplace } from '@hooks'
import {
    MaxReqLimitReachModal,
    ShowIndustryNotesAndTHModal,
} from '@partials/common/StudentProfileDetail/components'
import { useAddExistingIndustriesMutation, SubAdminApi } from '@queries'
import { ellipsisText, getSectorsDetail } from '@utils'
import Image from 'next/image'
import { ReactElement, useEffect, useState } from 'react'
import { FaRegCopy, FaTimes } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'
import { IndustryDetailCB } from '../contextBar'
import { CopyInfoData } from './CopyInfoData'
import { useRouter } from 'next/router'
import { UserRoles } from '@constants'

type IndustryInfoBoxCardProps = {
    item: any
    selectedBox: any
    setSelectedBox: any
    industryId?: any
    workplace?: any
    appliedIndustry?: any
    workplaceMapCard?: boolean
    onCancel?: any
}

export const IndustryInfoBoxCard = ({
    item,
    selectedBox,
    setSelectedBox,
    industryId,
    workplace,
    appliedIndustry,
    workplaceMapCard = false,
    onCancel,
    industryContacted,
}: any) => {
    const workplaceId = workplace?.id
    const router = useRouter()

    const { notification } = useNotification()

    const canAssessData = useIsRestricted(UserRoles.INDUSTRY)


    const [modal, setModal] = useState<ReactElement | null>(null)

    const contextBar = useContextBar()
    const {
        workplaceData,
        setWorkplaceData,
        setStudentLocation,
        setIndustryLocation,
    } = useWorkplace()

    useEffect(() => {
        if (workplaceData?.type === 'limitExceed') {
            setModal(
                <MaxReqLimitReachModal
                    onCancel={() => setModal(null)}
                    industryName={workplaceData?.name}
                    industryCapacity={workplaceData?.industryCapacity}
                    // studentCapacity={workplaceData?.name}
                />
            )
            setWorkplaceData(null)
        }
    }, [workplaceData])

    // apply for industry
    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()
    const [contactWorkplaceIndustry, contactWorkplaceIndustryResult] =
        SubAdminApi.Workplace.contactWorkplaceIndustry()
    const [callLog, callLogResult] = SubAdminApi.Industry.useIndustryCallLog()

    const sectors = getSectorsDetail(selectedBox?.courses)

    const onModalCancelClicked = () => setModal(null)

    const onApplyIndustryModal = () => {
        setIndustryLocation(item?.data?.location)
        setStudentLocation(workplace?.student?.location)
        setModal(
            <ShowIndustryNotesAndTHModal
                industryUserId={item?.data?.user?.id}
                industryUserName={item?.data?.user?.name}
                industryCapacity={item?.data?.studentCapacity}
                industryId={industryId}
                workplaceId={workplaceId}
                onCancel={(cancel?: boolean) => {
                    onModalCancelClicked()
                    if (cancel) {
                        onCancel()
                    }
                }}
            />
        )
    }

    const onViewIndustryDetail = () => {
        contextBar.show(false)
        contextBar.setContent(
            <IndustryDetailCB
                id={selectedBox?.id}
                industryUserId={item?.data?.user?.id}
            />
        )
        contextBar.setTitle('Industry Details')
    }


    return (
        <>
            {modal}
            <ShowErrorNotifications result={addExistingIndustryResult} />
            <div className="min-w-80">
                {item.isError && <NoData text="Something is not right...!" />}
                {item?.isLoading ? (
                    <PulseLoader />
                ) : (
                    <>
                        <div className={'flex items-end relative z-50'}>
                            <div className="bg-white mt-2 relative z-50 w-12 rounded-full h-12 border border-gray-400 ml-3 p-1">
                                <Image
                                    src={'/images/icons/avatars/std-boy.png'}
                                    alt={'avatar'}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </div>
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
                                <div>
                                    {item?.data?.isSnoozed ? (
                                        <Badge
                                            variant="success"
                                            text="Industry Snoozed"
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                                {!workplaceMapCard ? (
                                    <div className="relative group w-fit">
                                        <Typography variant="title">
                                            {ellipsisText(
                                                item?.data?.user?.name,
                                                15
                                            )}
                                        </Typography>

                                        {/*  */}
                                        <CopyInfoData
                                            text={item?.data?.user?.name}
                                            type={'Name'}
                                        />
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
                                                    {item?.data?.user?.email}
                                                </Typography>

                                                {/*  */}
                                                <CopyInfoData
                                                    text={
                                                        item?.data?.user?.email
                                                    }
                                                    type={'Email'}
                                                />
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

                                            <div
                                                className="relative group w-fit"
                                                onClick={() => {
                                                    contactWorkplaceIndustry({
                                                        studentId: Number(
                                                            router?.query?.id
                                                        ),
                                                        industryId,
                                                        wpId: workplaceId,
                                                    })
                                                    if (canAssessData) {
                                                        if (
                                                            !item?.data
                                                                ?.isSnoozed &&
                                                            item?.data
                                                                ?.phoneNumber &&
                                                            item?.data
                                                                ?.contactPersonNumber
                                                        ) {
                                                            navigator.clipboard.writeText(
                                                                item?.data
                                                                    ?.contactPersonNumber
                                                            )
                                                            callLog({
                                                                industry:
                                                                    item?.data
                                                                        ?.id,
                                                                receiver:
                                                                    UserRoles.INDUSTRY,
                                                            }).then(
                                                                (res: any) => {
                                                                    if (
                                                                        res?.data
                                                                    ) {
                                                                        notification.success(
                                                                            {
                                                                                title: 'Called Industry',
                                                                                description: `Called Industry with Name: ${item?.data?.user?.name}`,
                                                                            }
                                                                        )
                                                                    }
                                                                }
                                                            )
                                                            notification.success(
                                                                {
                                                                    title: 'Copied',
                                                                    description:
                                                                        'Phone Number Copied',
                                                                }
                                                            )
                                                        }
                                                    }
                                                }}
                                            >
                                                {canAssessData && (
                                                    <div className="absolute w-full h-full left-0 top-0 hidden group-hover:block ">
                                                        <div className="w-full h-full flex items-center justify-center cursor-pointer bg-blue-500/50">
                                                            <FaRegCopy
                                                                className="text-white "
                                                                size={14}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {canAssessData
                                                    ? item?.data?.isSnoozed
                                                        ? '---'
                                                        : item?.data
                                                              ?.contactPersonNumber
                                                    : ''}

                                                {/*  */}
                                                {/* <CopyInfoData
                                                    text={
                                                        item?.data
                                                            ?.contactPersonNumber
                                                    }
                                                    type={
                                                        'Contact Person Number'
                                                    }
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/*  */}
                            <div>
                                <Typography
                                    variant="muted"
                                    color={'text-gray-400'}
                                >
                                    Sector
                                </Typography>

                                {sectors?.map((s: any) => (
                                    <div className="border-b border-gray-200 pb-2 mb-2">
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
                                {/* <div className="flex justify-center mt-1.5">
                                    <Link
                                        className="text-blue-400 text-xs"
                                        href={`/portals/sub-admin/users/industries/${item?.data?.id}?tab=students`}
                                    >
                                        View
                                    </Link>
                                </div> */}
                                <div
                                    onClick={() => {
                                        onViewIndustryDetail()
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
                                                onApplyIndustryModal()
                                                // addExistingIndustry({
                                                //     workplaceId,
                                                //     industryId: industryId,
                                                // })
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
