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
            endDate: endDate.toISOString().slice(0, 10),
        },
        { skip: !isPdfDownload }
    )

    useEffect(() => {
        if (downloadAsPdf?.data?.file?.data && downloadAsPdf?.isSuccess) {
            const buffer = Buffer.from(downloadAsPdf.data.file.data)
            const blob = new Blob([buffer], { type: 'application/pdf' })
            saveAs(blob, rtoName)
            setIsPdfDownload(false)
        }
    }, [downloadAsPdf?.data, downloadAsPdf?.isSuccess])

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
    const handleDownloadPDF = () => {
        setIsPdfDownload(true)
    }

    return (
        <>
            <ShowErrorNotifications result={downloadAsPdf} />
            <Button
                onClick={() => {
                    setIsPdfDownload(true)
                }}
                loading={downloadAsPdf.isLoading}
                disabled={downloadAsPdf.isLoading}
                variant="dark"
                Icon={IoMdDownload}
                text={'Download'}
            />
        </>
    )
}
