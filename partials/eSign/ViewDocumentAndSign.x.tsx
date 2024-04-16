import {
    Card,
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
    Typography,
} from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { FaHamburger, FaSignature } from 'react-icons/fa'
import { PuffLoader } from 'react-spinners'
import { SVGView } from './components'
import { EsignSignatureModal, FinishSignModal } from './modal'
import { ellipsisText } from '@utils'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export const ViewDocumentAndSign = () => {
    const router = useRouter()

    const [showSignersField, setShowSignersField] = useState<boolean>(false)

    const [modal, setModal] = useState<ReactNode | null>(null)
    const [customFieldsData, setCustomFieldsData] = useState<any>([])
    const [selectedFillDataField, setSelectedFillDataField] =
        useState<any>(null)

    const { notification } = useNotification()

    const documentsTotalPages = CommonApi.ESign.useGetDocumentTotalPages(
        Number(router.query?.id),
        {
            skip: !router.query?.id,
        }
    )

    const tabs = CommonApi.ESign.useSignatureTabForTemplate(
        {
            template: documentsTotalPages?.data?.templateId,
            docId: Number(router.query?.id),
        },
        {
            skip: !documentsTotalPages?.data || !router.query?.id,
            refetchOnMountOrArgChange: true,
        }
    )
    const scrollTargetRef = useRef<any>([])

    const scrollToPage = (pageIndex: number) => {
        const targetElement = scrollTargetRef.current[pageIndex]
        const detailItem = document.getElementById(`tabs-view-${pageIndex}`)
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (tabs?.data && tabs.isSuccess && tabs?.data?.length > 0) {
            setCustomFieldsData(
                tabs?.data?.map((tab: any) => {
                    const response = tab?.responses?.reduce(
                        (accumulator: any, current: any) => {
                            // Convert timestamps to Date objects for comparison
                            const accumulatorDate = new Date(
                                accumulator.updatedAt
                            )
                            const currentDate = new Date(current.updatedAt)

                            // Return the item with the later updatedAt timestamp
                            return currentDate > accumulatorDate
                                ? current
                                : accumulator
                        },
                        tab?.responses[0]
                    )
                    return {
                        ...tab,
                        fieldValue: response ? response?.data : '',
                    }
                })
            )
        }
    }, [tabs])

    const onAddCustomFieldsData = (e: any) => {
        const updatedData = customFieldsData?.map((data: any) =>
            data?.id === e?.id ? e : data
        )
        setCustomFieldsData(updatedData)
    }

    const sign = tabs?.data?.find(
        (s: any) => s?.type === FieldsTypeEnum.Signature
    )

    const onCancelClicked = () => setModal(null)

    const onSelectAll = useCallback((e: any) => {
        setCustomFieldsData((customFields: any) =>
            customFields?.map((data: any) =>
                data?.type === FieldsTypeEnum.Checkbox
                    ? {
                          ...data,
                          fieldValue: e.target.checked,
                      }
                    : data
            )
        )
    }, [])

    const onFinishSignModal = () => {
        const customValues = customFieldsData?.filter(
            (data: any) => data?.isCustom && !data?.fieldValue && data?.required
        )

        if (
            customFieldsData
                ?.filter((s: any) => s?.type === FieldsTypeEnum.Signature)
                ?.filter((s: any) => !s?.responses?.length)?.length > 0
        ) {
            notification.warning({
                title: 'Sign',
                description: 'Please sign before finish signing',
            })
        } else if (customValues && customValues?.length > 0) {
            notification.warning({
                title: 'Please fill all required fields',
                description: 'Please fill all required fields',
            })
        } else {
            setModal(
                <FinishSignModal
                    onCancel={onCancelClicked}
                    customFieldsData={customFieldsData}
                />
            )
        }
    }

    const onSignatureClicked = (sign: any) => {
        setModal(
            <EsignSignatureModal
                tab={sign}
                onCancel={() => {
                    onCancelClicked()
                }}
                customFieldsData={customFieldsData}
            />
        )
    }

    const customFieldsAndSign = customFieldsData?.filter(
        (s: any) => s?.type === FieldsTypeEnum.Signature || s?.isCustom
    )

    const TabsView = () => {
        return (
            <Card noPadding>
                <div className="p-2 flex flex-col gap-y-2 h-[85vh] overflow-y-auto custom-scrollbar">
                    <div>
                        <Typography variant="small" semibold>
                            Click here to fill the data in form
                        </Typography>
                    </div>
                    {customFieldsAndSign?.map((fields: any, i: number) => {
                        if (fields?.type === FieldsTypeEnum.Signature) {
                            return (
                                <div
                                    onClick={() => {
                                        scrollToPage(Number(fields?.number - 1))
                                        // scrollToPage(Number(i))
                                    }}
                                    className="w-full ml-auto z-10 px-7 py-2 h-9 bg-red-600 rounded-md flex justify-center items-center gap-x-2 text-white"
                                >
                                    <FaSignature className="text-2xl" />
                                    <button className="text-sm whitespace-pre">
                                        {fields?.responses &&
                                        fields?.responses?.length > 0
                                            ? 'View Sign'
                                            : 'Go to Sign Section'}
                                    </button>
                                </div>
                            )
                        }
                        return (
                            <div>
                                <div
                                    onClick={() => {
                                        setSelectedFillDataField(fields?.id)
                                        scrollToPage(Number(fields?.number - 1))
                                        // scrollToPage(Number(i))
                                    }}
                                    className={`h-9 w-full ml-auto px-1 py-2 ${
                                        fields?.fieldValue
                                            ? 'bg-success'
                                            : 'bg-primary'
                                    } relative group text-white rounded-md flex justify-center items-center gap-x-2  cursor-pointer`}
                                >
                                    <Typography
                                        variant="label"
                                        medium
                                        color={'text-white'}
                                    >
                                        <span className="w-full flex items-center gap-x-0.5">
                                            <span className="cursor-pointer">
                                                {ellipsisText(
                                                    fields?.placeholder,
                                                    10
                                                )}
                                            </span>
                                            <span className="text-[10px]">
                                                ({fields?.number})
                                            </span>
                                            {fields?.fieldValue && (
                                                <span>
                                                    <IoIosCheckmarkCircle className="text-white text-lg" />
                                                </span>
                                            )}
                                        </span>
                                    </Typography>
                                    {fields?.fieldValue && (
                                        <div className="w-full flex justify-center absolute top-full left-0">
                                            <div className="hidden group-hover:block w-[90%] break-all  p-2 z-[1111] text-black shadow rounded-md bg-white">
                                                <Typography
                                                    variant="small"
                                                    semibold
                                                >
                                                    {fields?.fieldValue}
                                                </Typography>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        )
    }

    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div>
            {modal}
            <button
                onClick={() => {
                    // document.refetch()
                    tabs.refetch()
                    documentsTotalPages.refetch()
                }}
            >
                Re fetch
            </button>

            {documentsTotalPages.isError && <TechnicalError />}
            {documentsTotalPages.isLoading ? (
                <LoadingAnimation />
            ) : documentsTotalPages.isSuccess && documentsTotalPages?.data ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-2.5 relative">
                        <div className="block lg:hidden">
                            <div className=" flex justify-end items-center ">
                                <div
                                    onClick={() =>
                                        setShowSignersField(!showSignersField)
                                    }
                                >
                                    <Typography variant="small" semibold>
                                        Show Fields
                                    </Typography>
                                </div>
                                {showSignersField && (
                                    <div className="absolute top-5 z-20 w-3/4">
                                        <TabsView />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-5 flex flex-col gap-y-3 relative w-full">
                            {/* <div className="flex justify-end items-center gap-x-2">
                                <input
                                    type={'checkbox'}
                                    onChange={(e: any) => {
                                        onSelectAll(e)
                                    }}
                                    id={'selectAll'}
                                />
                                <label htmlFor="selectAll">Select All</label>
                            </div> */}

                            {[
                                ...Array(
                                    Number(documentsTotalPages?.data?.pageCount)
                                ),
                            ]?.map((_, i: number) => (
                                <div
                                    ref={(el) =>
                                        (scrollTargetRef.current[i] = el)
                                    }
                                >
                                    <Card key={i}>
                                        <div className="flex justify-center">
                                            <Typography
                                                variant="label"
                                                semibold
                                            >
                                                {i + 1}
                                            </Typography>
                                        </div>
                                        {/* <SVGView
                                            index={i}
                                            customFieldsData={customFieldsData}
                                            selectedFillDataField={
                                                selectedFillDataField
                                            }
                                            onSignatureClicked={
                                                onSignatureClicked
                                            }
                                            onAddCustomFieldsData={
                                                onAddCustomFieldsData
                                            }
                                            documentData={
                                                documentsTotalPages?.data
                                            }
                                        /> */}
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:block sticky top-0 h-[85vh]">
                            <TabsView />
                        </div>
                    </div>
                    <div className="flex justify-center bg-white px-5 py-2 shadow-md w-full rounded my-2">
                        <button
                            className="bg-primary text-white hover:bg-primary-dark border-transparent ring-primary-light text-[11px] 2xl:text-xs font-medium uppercase transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 rounded-md w-full md:w-96 h-12 md:h-[60px]"
                            onClick={() => {
                                onFinishSignModal()
                                // onSaveCustomFieldsValue()
                                // router.back()
                            }}
                        >
                            <div className="flex items-center justify-center gap-x-2 text-xl">
                                Finish Signing
                            </div>
                        </button>
                    </div>
                </>
            ) : (
                documentsTotalPages.isSuccess && <EmptyData />
            )}
        </div>
    )
}
