import {
    ActionButton,
    Badge,
    Button,
    Card,
    InitialAvatar,
    Switch,
    TextInput,
    Typography,
} from '@components'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { maskText } from '@utils'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const InvoiceRtoDetailData = ({ rto }: { rto: Rto }) => {
    const router = useRouter()
    const [rtoId, setRtoId] = useState<number | null>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [useRange, setUseRange] = useState<boolean>(false)

    const downloadReport = AdminApi.Invoice.invoiceRtoDataDownload(
        {
            id: Number(rtoId),
            // search: `startDate:${moment(startDate).format(
            //     'YYYY-MM-DD'
            // )},endDate:${moment(endDate).format('YYYY-MM-DD')}`,
            search: '',
        },
        {
            skip: !rtoId,
        }
    )

    // useEffect(() => {
    //     if (downloadReport?.isError) {
    //         const blob = new Blob([(downloadReport as any)?.error?.data], {
    //             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //         })

    //         // Create a link element
    //         const objectUrl = URL.createObjectURL(blob)

    //         // Create a temporary link element to trigger the download
    //         const link = document.createElement('a')
    //         link.href = objectUrl
    //         link.download = 'download'
    //         document.body.appendChild(link)

    //         // Trigger the download
    //         link.click()

    //         // Clean up
    //         document.body.removeChild(link)
    //         URL.revokeObjectURL(objectUrl)
    //         setRtoId(null)
    //     }
    //     if (downloadReport.isSuccess) {
    //         setRtoId(null)
    //     }
    // }, [downloadReport])

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleDownload = () => {
        // Implement your download logic here
        // Close the dropdown after download

        window.open(
            `${process.env.NEXT_PUBLIC_END_POINT}/invoice-setting/rto/${rto?.id}/data/download?startDate=${startDate}&endDate=${endDate}`
        )
        setIsOpen(false)
        setUseRange(false)
    }

    return (
        <div className="grid grid-cols-4 gap-x-3">
            <Card shadowType="profile">
                <div className=" gap-x-7">
                    <div className="flex flex-col gap-y-3">
                        <div className="flex justify-between items-center ">
                            <Typography variant="label" semibold>
                                RTO
                            </Typography>
                            <ActionButton
                                variant="info"
                                onClick={() =>
                                    router.push(`/portals/admin/rto/${rto?.id}`)
                                }
                            >
                                View Profile
                            </ActionButton>
                        </div>
                        <div className="flex  gap-x-2.5 items-center">
                            <div className="">
                                {rto && (
                                    <InitialAvatar
                                        large
                                        imageUrl={rto?.user?.avatar + ''}
                                        name={rto?.user?.name + ''}
                                    />
                                )}
                            </div>
                            <div className="">
                                <Typography semibold>
                                    <span className="text-[15px]">
                                        {rto?.user?.name}
                                    </span>
                                </Typography>

                                <Typography variant="xs" color="text-[#6B7280]">
                                    {maskText(rto?.user?.email)}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                </div>
            </Card>
            <Card shadowType="profile" fullHeight>
                <div className="flex flex-col gap-y-3">
                    <Typography variant="label" semibold>
                        Student Count
                    </Typography>
                    <Typography variant="h1" semibold>
                        {rto?.studentsCount}
                    </Typography>
                </div>
            </Card>
            <div className="col-span-2">
                <Card shadowType="profile" fullHeight>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            <Typography variant="label" semibold>
                                Invoice Type :
                            </Typography>
                            <div>
                                <Badge text={rto?.invoiceSettings?.[0]?.type} />
                            </div>
                        </div>

                        {/*  */}

                        <div className="flex items-center gap-x-2">
                            <div className="relative inline-block text-left date-range-dropdown">
                                {/* Main Button */}
                                <Button
                                    outline
                                    text="Download Report"
                                    loading={downloadReport?.isLoading}
                                    disabled={downloadReport?.isLoading}
                                    // onClick={() => {
                                    //     window.open(
                                    //         `${process.env.NEXT_PUBLIC_END_POINT}/invoice-setting/rto/${rto?.id}/data/download`
                                    //     )
                                    //     // setRtoId(rto?.id)
                                    // }}
                                    onClick={toggleDropdown}
                                />

                                {/* Dropdown Panel */}
                                {isOpen && (
                                    <div className="absolute right-0 z-10 w-64 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none date-range-dropdown">
                                        <div className="p-4">
                                            <div className="mb-2">
                                                <Switch
                                                    name="range"
                                                    label={'Use Range'}
                                                    defaultChecked={useRange}
                                                    customStyleClass="profileSwitch"
                                                    onChange={(e: any) => {
                                                        setUseRange(
                                                            e?.target?.checked
                                                        )
                                                    }}
                                                />
                                            </div>
                                            {useRange && (
                                                <>
                                                    <TextInput
                                                        label={'Start Date'}
                                                        name={'startDate'}
                                                        type="date"
                                                        onChange={(e: any) =>
                                                            setStartDate(
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={!useRange}
                                                        showError={false}
                                                    />
                                                    <TextInput
                                                        label={'End Date'}
                                                        name={'endDate'}
                                                        type="date"
                                                        onChange={(e: any) =>
                                                            setEndDate(
                                                                e.target.value
                                                            )
                                                        }
                                                        disabled={!useRange}
                                                        showError={false}
                                                    />
                                                </>
                                            )}

                                            <Button
                                                text="Download"
                                                loading={
                                                    downloadReport?.isLoading
                                                }
                                                disabled={
                                                    downloadReport?.isLoading
                                                }
                                                variant="success"
                                                // onClick={() => {
                                                //     window.open(
                                                //         `${process.env.NEXT_PUBLIC_END_POINT}/invoice-setting/rto/${rto?.id}/data/download`
                                                //     )
                                                //     // setRtoId(rto?.id)
                                                // }}
                                                onClick={handleDownload}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Button
                                text={'Add Custom Invoice'}
                                onClick={() => {
                                    router.push({
                                        pathname: `/portals/admin/invoices/add-custom-invoice`,
                                        query: {
                                            rto: rto?.id,
                                        },
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Typography variant="label" semibold>
                            Invoice Categories :
                        </Typography>
                        <div className="flex items-center gap-3 flex-wrap">
                            {rto?.invoiceSettings?.map((invoiceSetting) => (
                                <Badge
                                    text={invoiceSetting?.invoiceAction?.name}
                                    variant="secondary"
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
