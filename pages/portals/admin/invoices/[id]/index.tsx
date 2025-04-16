import { AdminApi } from '@queries'
import { AdminLayout } from '@layouts'
import React, { ReactElement, useCallback, useState } from 'react'
import {
    InvoiceDataListing,
    InvoiceRtoDetailData,
} from '@partials/admin/invoices'
import { useRouter } from 'next/router'
import { Card, EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { WeekFilter } from '@partials/common'
import { Moment } from 'moment'

const InvoiceRtoDetail = () => {
    const [startDate, setStartDate] = useState<Moment | null>(null)
    const [endDate, setEndDate] = useState<Moment | null>(null)

    const router = useRouter()

    const detail = AdminApi.Invoice.invoiceRtoDetail(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )

    const handleDatesChange = useCallback(
        (startDate: Moment, endDate: Moment) => {
            setStartDate(startDate)
            setEndDate(endDate)
        },
        []
    )
    return (
        <div className="p-3">
            {detail?.isError && <TechnicalError />}
            {detail?.isLoading ? (
                <LoadingAnimation />
            ) : detail?.data && detail?.isSuccess ? (
                <div className="flex flex-col gap-y-4 h-full">
                    <InvoiceRtoDetailData rto={detail?.data} />
                    <Card>
                        <WeekFilter
                            handleDatesChange={handleDatesChange}
                            showDefaultFilter={false}
                        />
                    </Card>
                    <InvoiceDataListing
                        startDate={startDate}
                        endDate={endDate}
                    />
                </div>
            ) : detail?.isSuccess ? (
                <EmptyData />
            ) : null}
        </div>
    )
}

InvoiceRtoDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default InvoiceRtoDetail
