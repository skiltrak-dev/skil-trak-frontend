import { GlobalModal, Typography } from '@components'
import Modal from '@modals/Modal'
import { MapStarRating, RateCoordinatorModal } from '@partials/common'
import { AdminApi, IndustryApi, CommonApi } from '@queries'
import React, { useState } from 'react'

export const FavByCoordinator = () => {
    const { data } = IndustryApi.Profile.useIndustryFavByCoordinator()
    const [modal, setModal] = useState<any | null>(null)
    const { data: averageRating } =
        CommonApi.Feedback.useUserReviewForCoordinator()
    const onCancel = () => {
        setModal(null)
    }
    const onClickFeedbackCoordinator = () => {
        setModal(
            <GlobalModal>
                <RateCoordinatorModal
                    userId={data?.favoriteBy?.user?.id}
                    onCloseModal={onCancel}
                />
            </GlobalModal>
        )
    }
    return (
        <>
            {modal && modal}
            <div className="flex items-start gap-x-4">
                <div className="">
                    <Typography variant="label">Coordinator</Typography>
                    <Typography variant="small">
                        {data?.favoriteBy?.user?.name ?? 'NA'}
                    </Typography>
                </div>
                {data && data?.favoriteBy && (
                    <>
                        {averageRating &&
                        Object?.keys(averageRating)?.length > 0 ? (
                            <MapStarRating rating={averageRating?.rating} />
                        ) : (
                            <button
                                onClick={onClickFeedbackCoordinator}
                                className="text-xs text-link border border-link rounded-md p-1"
                            >
                                Rate Coordinator
                            </button>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
