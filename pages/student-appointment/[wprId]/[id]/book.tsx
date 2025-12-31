import { LoadingAnimation, NoData } from '@components'
import { SiteLayout } from '@layouts'
import { AppointmentBookingModal } from '@partials/rto-v2/placement-request-detail/modal'
import { RtoV2Api } from '@queries'
import { useRouter } from 'next/router'
import React from 'react'

const Book = () => {
    const router = useRouter()
    const id = router?.query?.id
    const { data, isLoading, isError } =
        RtoV2Api.Industries.useIndustryAvailabilityV2(Number(id), { skip: !id })

    const [bookAppointment, resultBookAppointment] =
        RtoV2Api.Students.useBookAppointmentExternally()
    return (
        <SiteLayout>
            {isError && <NoData isError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <AppointmentBookingModal
                    isOpen={true}
                    onClose={() => 'hello'}
                    availability={data}
                    resultBookAppointment={resultBookAppointment}
                    bookAppointment={bookAppointment}
                />
            ) : (
                !isError && <NoData text="No industry availability found" />
            )}
        </SiteLayout>
    )
}
export default Book
