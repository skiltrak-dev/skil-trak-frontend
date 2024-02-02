import React from 'react'
import { IndustryApi } from '@queries'
import { Card } from '@components/cards'
import { VolunteerRequestsListCard } from './VolunteerRequestsListCard'
import { Typography } from '@components/Typography'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { NoData } from '@components/ActionAnimations'

export const VolunteerRequestsList = () => {
    const volunteerRequests = IndustryApi.Volunteer.requestsList(null)
    return (
        <Card>
            <Typography variant="label" semibold>
                My Volunteer Requests
            </Typography>
            {volunteerRequests.isLoading ? (
                <LoadingAnimation size={80} />
            ) : volunteerRequests?.data &&
              volunteerRequests?.data?.length > 0 ? (
                <>
                    <div className="p-2 rounded-md grid grid-cols-5">
                        <Typography variant="label">Course</Typography>
                        <div className="col-span-2">
                            <Typography variant="label">Note</Typography>
                        </div>
                        <Typography variant="label">Status</Typography>
                        <Typography variant="label">Created At</Typography>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        {volunteerRequests?.data?.map((volunteer: any) => (
                            <VolunteerRequestsListCard
                                key={volunteer?.id}
                                volunteer={volunteer}
                            />
                        ))}
                    </div>
                </>
            ) : (
                volunteerRequests?.isSuccess && (
                    <NoData text={'You have no any volunteer request'} />
                )
            )}
        </Card>
    )
}
