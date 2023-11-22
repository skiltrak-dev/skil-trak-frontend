import {
    LoadingAnimation,
    NoData,
    Select,
    ShowErrorNotifications,
    Table,
    TextInput,
} from '@components'

import { Button } from '@components/buttons'
import { RtoApi } from '@queries'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { getUserCredentials } from '@utils'
import { saveAs } from 'file-saver'
import { DownloadLoader } from './DownloadLoader'
import { IoMdDownload } from 'react-icons/io'

type Props = {
    startDate: Date
    setStartDate: (startDate: Date) => void
    endDate: Date
    setEndDate: (endDate: Date) => void
    user?: number
}

export const ReportListDownload = ({
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    user,
}: Props) => {
    let end = new Date(endDate)
    // end.setDate(end.getDate() + 1)

    const [filterReports, setFilterReports] = useState({
        label: 'Monthly',
        value: 'monthly',
    })
    const [isPdfDownload, setIsPdfDownload] = useState<boolean>(false)
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')

    const userId = user || getUserCredentials()?.id
    const rtoName = getUserCredentials()?.name

    const downloadAsPdf = RtoApi.Students.useReportDownloadLink(
        {
            userId,
            startDate: startDate.toISOString().slice(0, 10),
            endDate: end.toISOString().slice(0, 10),
        },
        {
            skip: !isPdfDownload,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    )
    let reportStart = startDate.toISOString().slice(0, 10)
    let reportEnd = end.toISOString().slice(0, 10)
    useEffect(() => {
        if (
            downloadAsPdf?.data?.file?.data &&
            downloadAsPdf?.isSuccess &&
            !downloadAsPdf.isLoading &&
            !downloadAsPdf.isFetching
        ) {
            const buffer = Buffer.from(downloadAsPdf.data.file.data)
            const blob = new Blob([buffer], { type: 'application/pdf' })
            saveAs(blob, rtoName)
            setIsPdfDownload(false)
        }
    }, [downloadAsPdf])

    useEffect(() => {
        if (downloadAsPdf?.isError) {
            setIsPdfDownload(false)
        }
    }, [downloadAsPdf?.isError])

    const filterOptions = [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Range', value: 'range' },
    ]

    // const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const dateValue = e.target.value.trim()
    //     setStartDate(dateValue)
    // }

    // const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const dateValue = e.target.value.trim()
    //     setEndDate(dateValue)
    // }

    return (
        <>
            <ShowErrorNotifications result={downloadAsPdf} />

            <a
                href={`${process.env.NEXT_PUBLIC_END_POINT}/statistics/rto/summary/${user}?startDate=${reportStart}&endDate=${reportEnd}`}
                target="_blank"
                rel="noreferrer"
                download
            >
                <Button
                    // onClick={() => {
                    //     setIsPdfDownload(true)
                    // }}
                    // loading={
                    //     downloadAsPdf.isLoading || downloadAsPdf.isFetching
                    // }
                    // disabled={
                    //     downloadAsPdf.isLoading || downloadAsPdf.isFetching
                    // }
                    variant="dark"
                    Icon={IoMdDownload}
                    text={'Download'}
                />
            </a>

            {/* <Button
                onClick={() => {
                    setIsPdfDownload(true)
                }}
                loading={downloadAsPdf.isLoading || downloadAsPdf.isFetching}
                disabled={downloadAsPdf.isLoading || downloadAsPdf.isFetching}
                variant="dark"
                Icon={IoMdDownload}
                text={'Download'}
            /> */}
        </>
    )
}
