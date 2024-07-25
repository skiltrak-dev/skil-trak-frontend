import { NoData, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import {
    useAddExistingIndustriesMutation,
    useSubAdminApplyStudentWorkplaceMutation,
} from '@queries'
import { ellipsisText } from '@utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'

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
    const [applyForWorkplace, applyForWorkplaceResult] =
        useSubAdminApplyStudentWorkplaceMutation()
    // apply for industry
    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()
    const sectors = selectedBox?.sector

    const { notification } = useNotification()

    useEffect(() => {
        if (addExistingIndustryResult.isSuccess) {
            notification.success({
                title: 'Industry Added Successfully',
                description: 'Industry Added Successfully',
            })
            onCancel()
        }
    }, [addExistingIndustryResult])
    // const url =
    //     selectedBox.photos &&
    //     selectedBox?.photos[0]?.html_attributions?.map((attribution: any) => {
    //         const anchorTagRegex =
    //             /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i
    //         const match = attribution.match(anchorTagRegex)
    //         return match ? match[1] : null
    //     })
    // const urlString = url && url[0]

    return (
        <>
            <ShowErrorNotifications result={addExistingIndustryResult} />
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
                                    <Typography variant="title">
                                        {ellipsisText(
                                            selectedBox?.businessName ?? 'NA',
                                            25
                                        )}
                                    </Typography>
                                ) : (
                                    <div className="flex items-center justify-between gap-x-4 border-b pb-2">
                                        <div className="flex flex-col gap-y-1">
                                            <Typography
                                                variant="muted"
                                                color={'text-gray-400'}
                                            >
                                                Industry
                                            </Typography>
                                            <Typography variant="muted">
                                                {ellipsisText(
                                                    item?.data?.user?.name,
                                                    15
                                                )}
                                            </Typography>

                                            <Typography variant="muted">
                                                {selectedBox.email}
                                            </Typography>
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
                                            <Typography variant="xs">
                                                {item?.data
                                                    ?.contactPersonNumber ??
                                                    'NA'}
                                            </Typography>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/*  */}
                            <div>
                                <div className="flex flex-col gap-y-1 my-1.5">
                                    <Typography variant="muted">
                                        {selectedBox?.email}
                                    </Typography>
                                    <Typography variant="xs">
                                        {selectedBox?.phone ?? 'NA'}
                                    </Typography>
                                </div>
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
                                <div className="flex justify-center mt-1.5">
                                    <Link
                                        className="text-blue-400 text-xs"
                                        href={`/portals/sub-admin/tasks/industry-listing?tab=all&page=1&pageSize=50&email=${selectedBox?.email}`}
                                    >
                                        View
                                    </Link>
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
                            {/* <div className="mt-1">
                            <Typography variant="muted" color={'text-gray-400'}>
                                Address
                            </Typography>
                            <Typography variant="small">
                                {item?.data?.addressLine1 || 'N/A'}
                            </Typography>
                        </div> */}
                            {/* <div className="flex justify-center mt-1.5">
                                <Link
                                    className="text-blue-400 font-medium text-sm"
                                    href={`/portals/sub-admin/users/industries/${item?.data?.id}?tab=students`}
                                >
                                    View Profile
                                </Link>
                            </div> */}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
