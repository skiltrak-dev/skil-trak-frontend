import { LoadingAnimation, NoData, Select, Table, TextInput } from '@components'
import { Button } from '@components/buttons'
import { RtoApi } from '@queries'
import { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'
import { FilterReport } from '../report'
import { DownChevron } from 'react-select/dist/declarations/src/components/indicators'
import { getUserCredentials } from '@utils'
import { saveAs } from 'file-saver'

export const ReportListModal = ({ onClose }: any) => {
    const [filterReports, setFilterReports] = useState({
        label: 'Weekly',
        value: 'weekly',
    })
    const [startDateProvided, setStartDateProvided] = useState(false)
    const [endDateProvided, setEndDateProvided] = useState(false)
    const [startDateValid, setStartDateValid] = useState(true)
    const [endDateValid, setEndDateValid] = useState(true)
    const [isPdfDownload, setIsPdfDownload] = useState<boolean>(false)

    const currentDate = new Date()
    const weekStart = formatDate(currentDate)
    const weekEnd = new Date(currentDate)
    weekEnd.setDate(weekEnd.getDate() - 6)
    const formattedWeekEnd = formatDate(weekEnd)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    function formatDate(date: any) {
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${month}-${day}-${year}`
    }
    console.log('weekStart', weekStart)
    const userId = getUserCredentials()?.id
    console.log('startDate', startDate)
    console.log('endDate', endDate)
    const { data, isError, isLoading, isSuccess } =
        RtoApi.Students.useReportDownloadLink(
            {
                userId,
                startDate,
                endDate,
            },
            { skip: !isPdfDownload }
        )

    useEffect(() => {
        if (data?.file?.data && isSuccess) {
            const buffer = Buffer.from(data.file.data)
            const blob = new Blob([buffer], { type: 'application/pdf' })
            saveAs(blob, 'report.pdf')
            setIsPdfDownload(false)
        }
    }, [data, isSuccess])

    useEffect(() => {
        if (isError) {
            setIsPdfDownload(false)
        }
    }, [isError])

    // let buffer = undefined;
    // if(data && data?.length > 0){
    //      buffer = Buffer.from(data)
    // }
    console.log('downloadAsPdf', data)
    // const sDate = new getDate

    const filterOptions = [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Range', value: 'range' },
    ]

    const isDateValid = (dateString: string): boolean => {
        const regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/
        return regex.test(dateString)
    }

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value.trim()
        setStartDateProvided(dateValue !== '')
        setStartDateValid(dateValue === '' || isDateValid(dateValue))
        setStartDate(dateValue)
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value.trim()
        setEndDateProvided(dateValue !== '')
        setEndDateValid(dateValue === '' || isDateValid(dateValue))
        setEndDate(dateValue)
    }
    const handleDownloadPDF = () => {
        setIsPdfDownload(true)
    }

    return (
        <>
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white  h-[60vh] overflow-auto custom-scrollbar rounded-2xl flex flex-col items-center gap-y-2 shadow-xl min-w-[450px] px-4 py-4">
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
                                    disabled={filterReports?.value === 'weekly'}
                                />
                                {/* {!startDateValid && (
                                    <div className="text-red-400 text-xs mb-3 -mt-5">
                                        Invalid date format
                                    </div>
                                )} */}
                            </div>
                            <div>
                                <TextInput
                                    placeholder="YYYY-MM-DD"
                                    name="endDate"
                                    label={'End Date'}
                                    onChange={handleEndDateChange}
                                    disabled={filterReports?.value === 'weekly'}
                                />
                                {/* {!endDateValid && (
                                    <div className="text-red-400 text-xs mb-3 -mt-5">
                                        Invalid date format
                                    </div>
                                )} */}
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
                                loading={isLoading}
                                disabled={isLoading}
                            />
                            <Button
                                text="Download as CSV"
                                variant="dark"
                                onClick={() => {
                                    console.log('downloading')
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
