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

export const ReportListModal = ({
    onClose,
    user,
}: {
    onClose: () => void
    user?: number
}) => {
    const [filterReports, setFilterReports] = useState({
        label: 'Monthly',
        value: 'monthly',
    })
    const [isPdfDownload, setIsPdfDownload] = useState<boolean>(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const userId = user || getUserCredentials()?.id
    const rtoName = getUserCredentials()?.name

    const downloadAsPdf = RtoApi.Students.useReportDownloadLink(
        {
            userId,
            startDate,
            endDate,
        },
        { skip: !isPdfDownload }
    )

    useEffect(() => {
        if (downloadAsPdf?.data?.file?.data && downloadAsPdf?.isSuccess) {
            const buffer = Buffer.from(downloadAsPdf.data.file.data)
            const blob = new Blob([buffer], { type: 'application/pdf' })
            saveAs(blob, rtoName)
            setIsPdfDownload(false)
            onClose()
        }
    }, [downloadAsPdf?.data, downloadAsPdf?.isSuccess, onClose])

    useEffect(() => {
        if (downloadAsPdf?.isError) {
            setIsPdfDownload(false)
        }
    }, [downloadAsPdf?.isError])

    const filterOptions = [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Range', value: 'range' },
    ]

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value.trim()
        setStartDate(dateValue)
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value.trim()
        setEndDate(dateValue)
    }
    const handleDownloadPDF = () => {
        setIsPdfDownload(true)
    }

    return (
        <>
            <ShowErrorNotifications result={downloadAsPdf} />
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white  h-[60vh] overflow-auto custom-scrollbar rounded-2xl flex flex-col items-center gap-y-2 shadow-xl min-w-[450px] px-4 py-4">
                    {downloadAsPdf?.isLoading ? (
                        <DownloadLoader />
                    ) : (
                        <>
                            <div className="flex justify-end w-full">
                                <FaTimes
                                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                                    onClick={() => {
                                        onClose && onClose()
                                    }}
                                />
                            </div>
                            <div className="flex flex-col items-start mr-auto">
                                <div className="flex gap-x-2">
                                    <div>
                                        <TextInput
                                            placeholder="YYYY-MM-DD"
                                            name="startDate"
                                            label={'Start Date'}
                                            onChange={handleStartDateChange}
                                            disabled={
                                                filterReports?.value ===
                                                'monthly'
                                            }
                                            type="date"
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            placeholder="YYYY-MM-DD"
                                            name="endDate"
                                            label={'End Date'}
                                            onChange={handleEndDateChange}
                                            disabled={
                                                filterReports?.value ===
                                                'monthly'
                                            }
                                            type="date"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <Select
                                        name="filter"
                                        label="Select filter"
                                        options={filterOptions}
                                        placeholder="Select reports filter by"
                                        value={filterReports}
                                        onChange={(e: any) => {
                                            setFilterReports(e)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-x-4 items-center justify-end mt-auto">
                                <div className="flex items-center gap-x-2">
                                    <Button
                                        text="Download as PDF"
                                        variant="dark"
                                        onClick={handleDownloadPDF}
                                        loading={downloadAsPdf?.isLoading}
                                        disabled={downloadAsPdf?.isLoading}
                                    />

                                    {/* <Button
                                        text="Download as CSV"
                                        variant="dark"
                                        onClick={() => {
                                        }}
                                    /> */}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
