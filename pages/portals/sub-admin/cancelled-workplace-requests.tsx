import { ReactElement } from 'react'

import { SubAdminApi } from '@queries'
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { WpCancelationRequestSA } from '@partials/common'
import { EmptyData, LoadingAnimation, Typography } from '@components'
import { IoWarning } from 'react-icons/io5'

const CancelledWorkplaceRequests: NextPageWithLayout = () => {
    const profile = SubAdminApi.SubAdmin.useProfile()
    console.log(
        'profile',
        profile?.isLoading
            ? 'loading'
            : profile?.data?.canCancelWorkPlaceRequest
            ? 'Banka'
            : 'Empty'
    )

    return (
        <div>
            {profile?.isLoading ? (
                <LoadingAnimation />
            ) : profile?.data ? (
                <div>
                    {profile?.data?.canCancelWorkPlaceRequest ? (
                        <WpCancelationRequestSA />
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-y-4 p-14 bg-white border-2 border-dashed rounded-lg">
                            <div>
                                <IoWarning
                                    className="text-yellow-500"
                                    size={70}
                                />
                            </div>
                            <div className="px-48 text-center">
                                <Typography
                                    variant="body"
                                    semibold
                                    color="text-gray-400"
                                    center
                                >
                                    The creation of Workplace Cancelation
                                    requires prior approval from an
                                    administrator. To expedite processing,
                                    please submit your request to{' '}
                                    <a
                                        href={`mailto:admin@skiltrak.com.au`}
                                        className="italic font-thin text-blue-400"
                                    >
                                        admin@skiltrak.com.au
                                    </a>
                                </Typography>
                            </div>
                        </div>
                    )}
                </div>
            ) : profile?.isSuccess ? (
                <EmptyData />
            ) : null}
        </div>
    )
}

CancelledWorkplaceRequests.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default CancelledWorkplaceRequests
