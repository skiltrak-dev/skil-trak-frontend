import { Card, EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { AdminLayout } from '@layouts'
import {
    InvoiceDataListing,
    InvoiceDates,
    InvoiceRtoDetailData,
    InvoiceTypeEnum,
} from '@partials/admin/invoices'
import { AdminApi } from '@queries'
import {
    generateInvoiceDateRanges,
    generateMonthlyInvoiceDateRanges,
} from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'

const InvoiceRtoDetail = () => {
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)
    const [isUpdated, setIsUpdated] = useState<boolean>(false)

    const router = useRouter()

    console.log({ startDate })

    const detail = AdminApi.Invoice.invoiceRtoDetail(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )

    const handleDatesChange = useCallback(
        (startDate: string, endDate: string) => {
            setStartDate(startDate)
            setEndDate(endDate)
        },
        []
    )

    const dateObjects =
        detail?.data?.invoiceSettings?.[0]?.type === InvoiceTypeEnum.Monthly
            ? generateMonthlyInvoiceDateRanges()
            : generateInvoiceDateRanges(
                  detail?.data?.invoiceSettings?.[0]?.type,
                  detail?.data?.invoiceSettings?.[0]?.startDate
              )

    useEffect(() => {
        if (dateObjects && dateObjects?.length > 0 && !isUpdated) {
            setIsUpdated(true)
            handleDatesChange(
                dateObjects?.[0]?.startDate,
                dateObjects?.[0]?.endDate
            )
        }
    }, [dateObjects, isUpdated])

    return (
        <div className="p-3">
            {detail?.isError && <TechnicalError />}
            {detail?.isLoading ? (
                <LoadingAnimation />
            ) : detail?.data && detail?.isSuccess ? (
                <div className="flex flex-col gap-y-4 h-full">
                    <InvoiceRtoDetailData rto={detail?.data} />
                    <Card>
                        <InvoiceDates
                            dateObjects={dateObjects}
                            startDate={String(startDate)}
                            handleDatesChange={handleDatesChange}
                            type={detail?.data?.invoiceSettings?.[0]?.type}
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
