import React, { ReactElement, useState } from 'react'
import { Button, Card, Typography } from '@components'
import { CircleOff, User, Calendar, BookOpen, Factory } from 'lucide-react'
import { ViewCancelledWpCommentModal } from '../modals'
import { CancelledWorkplaceCardDetail } from './CancelledWorkplaceCardDetail'
import { SiStatuspal } from 'react-icons/si'

export const CancelledWorkplaceCard = ({
    cancelledWp,
}: {
    cancelledWp: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onViewNote = () => {
        setModal(
            <ViewCancelledWpCommentModal
                onCancel={onCancel}
                comment={cancelledWp?.cancelledRequests?.[0]}
            />
        )
    }
    return (
        <>
            {modal}
            <Card noPadding>
                <div className="flex justify-between items-center border-b py-3 px-5">
                    <div className="flex gap-x-2 items-center">
                        <CircleOff className="mr-2 text-red-500" size={20} />
                        <Typography
                            variant="subtitle"
                            bold
                            color="text-slate-600"
                        >
                            Cancelled Workplace
                        </Typography>
                    </div>
                    {cancelledWp?.cancelledRequests &&
                    cancelledWp?.cancelledRequests?.length > 0 ? (
                        <div>
                            <Button
                                text="View Note"
                                onClick={() => onViewNote()}
                            />
                        </div>
                    ) : null}
                </div>

                <div className="grid grid-cols-2 gap-5 p-5">
                    <CancelledWorkplaceCardDetail
                        iconColor="text-orange-500"
                        Icon={User}
                        title="Cancelled By"
                        detail={cancelledWp?.cancelledBy ?? 'N/A'}
                    />
                    <CancelledWorkplaceCardDetail
                        iconColor="text-indigo-500"
                        Icon={BookOpen}
                        title="Course Information"
                        detail={`${cancelledWp?.courses?.[0]?.code ?? 'N/A'} - 
                                    ${
                                        cancelledWp?.courses?.[0]?.title ??
                                        'N/A'
                                    }`}
                    />

                    <CancelledWorkplaceCardDetail
                        Icon={Factory}
                        iconColor="text-teal-500"
                        title="Industry Details"
                    >
                        {' '}
                        <div className="flex items-center gap-x-2">
                            <Typography variant="muted" color="text-gray-500">
                                Name:
                            </Typography>
                            <Typography variant="muted" color="text-gray-500">
                                {cancelledWp?.industries?.[0]?.industry?.user
                                    ?.name ?? 'N/A'}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Typography variant="muted" color="text-gray-500">
                                Email:
                            </Typography>
                            <Typography variant="muted" color="text-gray-500">
                                {cancelledWp?.industries?.[0]?.industry?.user
                                    ?.email ?? 'N/A'}
                            </Typography>
                        </div>
                    </CancelledWorkplaceCardDetail>
                    <div className="flex gap-x-1">
                        <CancelledWorkplaceCardDetail
                            iconColor="text-red-500"
                            Icon={Calendar}
                            title="Cancellation Timeline"
                            detail={`Created: 
                                            ${
                                                cancelledWp?.createdAt?.slice(
                                                    0,
                                                    10
                                                ) ?? 'N/A'
                                            }`}
                        />
                        <div className="flex flex-col gap-x-2">
                            <Typography variant="muted" color="text-red-500">
                                Cancelled:{' '}
                            </Typography>
                            <Typography variant="muted" color="text-red-500">
                                {cancelledWp?.cancelledAt?.slice(0, 10) ??
                                    'N/A'}
                            </Typography>
                        </div>
                    </div>
                    <CancelledWorkplaceCardDetail
                        iconColor="text-orange-500"
                        Icon={SiStatuspal}
                        title="Previous Workplace Status"
                        detail={
                            cancelledWp?.cancelledRequests?.[0]
                                ?.workplaceCurrentStatus ?? 'Cancelled'
                        }
                    />
                </div>
            </Card>
        </>
    )
}
