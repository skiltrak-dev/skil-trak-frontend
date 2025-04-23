import moment from 'moment'
import { NoData, Typography } from '@components'
import { useEffect, useRef, useState } from 'react'
import { InvoiceDateCard } from './InvoiceDateCard'
import { InvoiceTypeEnum } from '../../enum'

export const InvoiceDates = ({
    type,
    startDate,
    dateObjects,
    handleDatesChange,
}: {
    startDate: string
    type: InvoiceTypeEnum
    dateObjects: { startDate: string; endDate: string }[]
    handleDatesChange: (startDate: string, endDate: string) => void
}) => {
    const [width, setWidth] = useState<number | null>(null)

    const ref = useRef<any>(null)

    useEffect(() => {
        if (dateObjects && dateObjects?.length > 0) {
            if (ref?.current) {
                setWidth(ref?.current?.offsetWidth)
            }
        }
    }, [ref, dateObjects])
    return (
        <div ref={ref} className="">
            <Typography variant="label" semibold>
                <span className="capitalize">{type}</span> Invoice Dates
            </Typography>
            {dateObjects && dateObjects?.length > 0 ? (
                <div
                    className="flex items-center gap-x-2.5 overflow-x-auto custom-scrollbar"
                    style={{
                        width: `${width}px`,
                    }}
                >
                    {dateObjects?.reverse().map((dateObject: any) => (
                        <InvoiceDateCard
                            onClick={() => {
                                handleDatesChange(
                                    dateObject?.startDate,
                                    dateObject?.endDate
                                )
                            }}
                            key={dateObject?.startDate}
                            dateObject={dateObject}
                            active={
                                dateObject?.startDate ===
                                moment(startDate).format('YYYY-MM-DD')
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white">
                    <NoData text={'No Report Dates were found'} simple />
                </div>
            )}
        </div>
    )
}
