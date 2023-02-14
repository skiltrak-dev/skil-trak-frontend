import { Typography, ShowErrorNotifications, InitialAvatar } from '@components'
import React, { useEffect } from 'react'
import { BsDot } from 'react-icons/bs'

// query
import { useSubAdminApplyStudentWorkplaceMutation } from '@queries'
import { useNotification } from '@hooks'
import { PulseLoader } from 'react-spinners'

export const IndustryCard = ({ industry, appliedIndustry, workplace }: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useSubAdminApplyStudentWorkplaceMutation()

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (applyForWorkplaceResult.isSuccess) {
            notification.success({
                title: 'Applied to Industry',
                description: 'Applied to Industry Successfully',
            })
        }
    }, [applyForWorkplaceResult])

    const loading = ''

    return (
        <>
            <ShowErrorNotifications result={applyForWorkplaceResult} />
            <div className="bg-secondary py-1 px-2 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    <InitialAvatar
                        name={industry?.industry?.user?.name}
                        imageUrl={industry?.industry?.user?.avatar}
                    />
                    <div>
                        <div className="flex items-center gap-x-0.5">
                            <Typography variant={'label'}>
                                {industry?.industry?.user?.name}
                            </Typography>
                            <BsDot />
                            {/* <Typography variant={'xs'} color={'text-gray-400'}>
                            5km away
                        </Typography> */}
                        </div>
                        <Typography variant={'muted'} color={'gray'}>
                            {industry?.industry?.addressLine1},{' '}
                            {industry?.industry?.addressLine2}
                        </Typography>
                    </div>
                </div>

                {industry.applied &&
                    industry.industryResponse !== 'noResponse' &&
                    industry.industryResponse !== 'rejected' && (
                        <Typography
                            variant={'xs'}
                            color={'text-red-800'}
                            center
                        >
                            APPLIED
                        </Typography>
                    )}
                {industry.industryResponse === 'noResponse' && (
                    <Typography variant={'xs'} color={'text-red-500'} center>
                        No Response
                    </Typography>
                )}
                {industry.industryResponse === 'rejected' && (
                    <Typography variant={'xs'} color={'text-red-500'} center>
                        Rejected
                    </Typography>
                )}
                {industry.applied &&
                    industry.industryResponse === 'approved' && (
                        <Typography variant={'xs'}>
                            <span className="bg-success px-2 py-0.5 text-white rounded-full">
                                Approved
                            </span>
                        </Typography>
                    )}
                {!appliedIndustry &&
                    !industry.applied &&
                    industry.industryResponse !== 'noResponse' &&
                    industry.industryResponse !== 'rejected' && (
                        <Typography
                            variant={'xs'}
                            color={'text-red-800'}
                            center
                        >
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    if (!appliedIndustry) {
                                        applyForWorkplace({
                                            industry: industry?.id,
                                            id: workplace?.id,
                                        })
                                    } else {
                                        notification.error({
                                            title: 'Already Applied',
                                            description:
                                                'Already Applied to another Industry',
                                        })
                                    }
                                }}
                            >
                                {applyForWorkplaceResult.isLoading ? (
                                    <PulseLoader size={4} />
                                ) : (
                                    'APPLY HERE'
                                )}
                            </span>
                        </Typography>
                    )}

                {/* {industry.industryResponse !== 'approved' && industry.applied ? (
            <Typography variant={'xs'} color={'text-red-800'} center>
               APPLIED
            </Typography>
         ) : industry.industryResponse &&
           !industry.applied &&
           industry.industryResponse === 'noResponse' ? (
            <Typography variant={'xs'} color={'text-red-500'} center>
               No Response
            </Typography>
         ) : industry.industryResponse === 'approved' ? (
            <Typography variant={'xs'}>
               <span className="bg-success px-2 py-0.5 text-white rounded-full">
                  Approved
               </span>
            </Typography>
         ) : (
            !appliedIndustry && (
               <Typography variant={'xs'} color={'text-red-800'} center>
                  <span
                     className="cursor-pointer"
                     onClick={() => {
                        applyForWorkplace(industry?.id)
                     }}
                  >
                     APPLY HERE
                  </span>
               </Typography>
            )
         )} */}
            </div>
        </>
    )
}
