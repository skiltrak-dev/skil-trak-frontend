import {
    Card,
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
    Typography,
} from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { PageHeading } from '@components/headings'
import { useNotification } from '@hooks'
import { SiteLayout } from '@layouts'
import {
    EsignSignatureModal,
    FinishEmailSignModal,
    FinishShignInfoModal,
    SVGView,
    ScrollTabsView,
} from '@partials'
import { CommonApi } from '@queries'
import jwt from 'jwt-decode'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { PuffLoader } from 'react-spinners'

const ESign = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactNode | null>(null)
    const [customFieldsData, setCustomFieldsData] = useState<any>([])
    const [isSignature, setIsSignature] = useState<boolean>(false)
    const [customFieldsSelectedId, setCustomFieldsSelectedId] =
        useState<number>(-1)

    const [decodeData, setDecodeData] = useState<any>(null)
    const [selectedFillDataField, setSelectedFillDataField] =
        useState<any>(null)
    const [showSignersField, setShowSignersField] = useState<boolean>(false)

    const scrollTargetRef = useRef<any>([])

    const { notification } = useNotification()

    useEffect(() => {
        const jwtDecode = async () => {
            if (router?.query?.token) {
                const data = await jwt(String(router?.query?.token))
                setDecodeData(data)
            }
        }
        jwtDecode()
    }, [router])

    const checkIfUserSigned = CommonApi.ESign.checkIfUserSigned(
        {
            documentId: Number(router.query?.id),
            id: Number(decodeData?.id),
        },
        {
            skip: !router.query?.id || !decodeData?.id,
        }
    )
    const documentsTotalPages: any = CommonApi.ESign.useGetDocumentTotalPages(
        Number(router.query?.id),
        {
            skip: !router.query?.id || !checkIfUserSigned.isSuccess,
        }
    )
    const tabs = CommonApi.ESign.useGetTabs(
        {
            docId: Number(router.query?.id),
            token: String(router.query?.token),
        },
        {
            skip: !router.query?.id || !router.query?.token,
        }
    )

    useEffect(() => {
        if (tabs.isSuccess && tabs?.data && tabs?.data?.length > 0) {
            setCustomFieldsData(
                tabs?.data
                    // ?.filter((t: any) => !t?.responses?.length)
                    ?.map((tab: any) => {
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

    const sign = customFieldsData?.find(
        (s: any) => s?.type === FieldsTypeEnum.Signature
    )

    const onCancelClicked = () => setModal(null)

    const onSignatureCancelClicked = (cancel?: boolean) => {
        if (cancel) {
            setIsSignature(false)
        } else {
            if (tabs?.data && tabs.isSuccess && tabs?.data?.length > 0) {
                setTimeout(() => {
                    setModal(
                        <FinishShignInfoModal
                            emailSign
                            decodeData={decodeData}
                            onCancel={onCancelClicked}
                            customFieldsData={customFieldsData}
                        />
                    )
                }, 1000)
            }
        }
    }

    const extractAndConvert = (position: string) => {
        const [x, y] = position.split(',').map(parseFloat)
        return x + y
    }

    // Function to add the number with position
    const addNumberWithPosition = (item: any) => {
        const number = item.number
        const position = item.position
        const sum = extractAndConvert(position)
        return { id: item?.id, number, position, sum }
    }

    // Adding number with position and sorting in ascending order based on sum
    const sortedPositions = customFieldsData
        .map(addNumberWithPosition)
        .sort((a: any, b: any) => {
            // First, sort by number in ascending order
            if (a.number !== b.number) {
                return a.number - b.number
            }
            // If numbers are equal, sort by sum of position values
            return a.sum - b.sum
        })

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

    const scrollToPage = (pageIndex: number, currentPage: number) => {
        const targetElement = scrollTargetRef.current[currentPage]
        const detailItem = document.getElementById(`tabs-view-${pageIndex}`)

        if (detailItem) {
            detailItem.scrollIntoView({ behavior: 'smooth' })
        } else if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // useEffect(() => {
    //     scrollToPage(
    //         Number(sortedPositions?.[customFieldsSelectedId]?.id),
    //         sortedPositions?.[customFieldsSelectedId]?.number - 1
    //     )
    // }, [customFieldsSelectedId])

    const customFieldsAndSign = customFieldsData?.filter(
        (s: any) => s?.type === FieldsTypeEnum.Signature || s?.isCustom
    )

    const onSaveCustomFieldsValue = async () => {
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
                <FinishEmailSignModal
                    onCancel={onCancelClicked}
                    decodeDataId={decodeData?.id}
                    customFieldsData={customFieldsData}
                />
            )
        }
    }

    const onSignatureClicked = (sign: any) => {
        setIsSignature(true)
        // setModal(
        //     <EsignSignatureModal
        //         tab={sign}
        //         onCancel={() => {
        //             onSignatureCancelClicked()
        //         }}
        //         customFieldsData={customFieldsData}
        //         action={CommonApi.ESign.useAddSign}
        //     />
        // )
    }

    const onDocumentScrollArrow = () => {
        if (customFieldsSelectedId < sortedPositions?.length - 1) {
            setSelectedFillDataField(
                sortedPositions?.[customFieldsSelectedId + 1]?.id
            )
            setCustomFieldsSelectedId(customFieldsSelectedId + 1)
        } else {
            setSelectedFillDataField(sortedPositions?.[0]?.id)
            setCustomFieldsSelectedId(0)
        }
    }

    return (
        <SiteLayout title={'E Sign'}>
            {modal}
            {isSignature ? (
                <EsignSignatureModal
                    tab={sign}
                    onCancel={(cancel?: boolean) => {
                        onSignatureCancelClicked(cancel)
                    }}
                    customFieldsData={customFieldsData}
                    action={CommonApi.ESign.useAddSign}
                />
            ) : null}
            <ShowErrorNotifications result={checkIfUserSigned} />
            <div className="max-w-7xl mx-auto py-10">
                <PageHeading title="E-Sign" subtitle="E Sign" />

                {(documentsTotalPages.isError || checkIfUserSigned.isError) && (
                    <TechnicalError
                        title={documentsTotalPages?.error?.data?.message as any}
                    />
                )}
                {documentsTotalPages.isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : documentsTotalPages.data ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-2.5 relative">
                            {/* {sign && (
                            <div
                                onClick={() => {
                                    scrollToPage(Number(sign?.number - 1))
                                }}
                                className="w-fit mt-4 ml-auto z-10 px-7 py-2 h-full bg-red-600 flex justify-center items-center gap-x-2 text-white"
                            >
                                <FaSignature className="text-2xl" />
                                <button className="text-lg">
                                    {sign?.responses &&
                                    sign?.responses?.length > 0
                                        ? 'View Sign'
                                        : 'Sign Here'}
                                </button>
                            </div>
                        )} */}
                            <div className="block lg:hidden">
                                <div className=" flex justify-end items-center ">
                                    <div
                                        onClick={() =>
                                            setShowSignersField(
                                                !showSignersField
                                            )
                                        }
                                    >
                                        <Typography variant="small" semibold>
                                            Show Fields
                                        </Typography>
                                    </div>
                                    {showSignersField && (
                                        <div className="absolute top-5 z-20 w-3/4">
                                            <ScrollTabsView
                                                onClick={() =>
                                                    setShowSignersField(false)
                                                }
                                                customFieldsAndSign={
                                                    customFieldsAndSign
                                                }
                                                scrollToPage={scrollToPage}
                                                setSelectedFillDataField={
                                                    setSelectedFillDataField
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="lg:col-span-5 flex flex-col gap-y-3">
                                {/* <div className="flex justify-end items-center gap-x-2">
                                    <input
                                        type={'checkbox'}
                                        onChange={(e: any) => {
                                            onSelectAll(e)
                                        }}
                                        id={'selectAll'}
                                    />
                                    <label htmlFor="selectAll">
                                        Select All
                                    </label>
                                </div> */}
                                {[
                                    ...Array(
                                        Number(
                                            documentsTotalPages?.data?.pageCount
                                        )
                                    ),
                                ]?.map((doc: any, i: number) => (
                                    <div
                                        key={i}
                                        ref={(el) =>
                                            (scrollTargetRef.current[i] = el)
                                        }
                                    >
                                        <Card>
                                            <div className="flex justify-center">
                                                <Typography
                                                    variant="label"
                                                    semibold
                                                >
                                                    {i + 1}
                                                </Typography>
                                            </div>
                                            <SVGView
                                                customFieldsAndSign={
                                                    customFieldsAndSign
                                                }
                                                scrollToPage={scrollToPage}
                                                customFieldsSelectedId={
                                                    customFieldsSelectedId
                                                }
                                                onDocumentScrollArrow={() => {
                                                    onDocumentScrollArrow()
                                                }}
                                                sortedPositions={
                                                    sortedPositions
                                                }
                                                index={i}
                                                customFieldsData={
                                                    customFieldsData
                                                }
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
                                            />
                                        </Card>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden lg:block sticky top-0 h-[85vh]">
                                <ScrollTabsView
                                    onClick={() => setShowSignersField(false)}
                                    customFieldsAndSign={customFieldsAndSign}
                                    scrollToPage={scrollToPage}
                                    setSelectedFillDataField={
                                        setSelectedFillDataField
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-center bg-white px-5 py-2 shadow-md w-full rounded my-2">
                            <button
                                className={`${
                                    tabs?.isSuccess &&
                                    customFieldsData &&
                                    customFieldsData?.length > 0
                                        ? 'bg-primary text-white hover:bg-primary-dark'
                                        : 'bg-secondary-dark text-gray-400'
                                }   border-transparent ring-primary-light text-[11px] 2xl:text-xs font-medium uppercase transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 rounded-md w-full md:w-96 h-12 md:h-[60px]`}
                                onClick={() => {
                                    if (
                                        tabs?.isSuccess &&
                                        customFieldsData &&
                                        customFieldsData?.length > 0
                                    ) {
                                        onSaveCustomFieldsValue()
                                        // router.back()
                                    }
                                }}
                            >
                                <div className="flex items-center justify-center gap-x-2 text-xl">
                                    Finish Signing
                                </div>
                            </button>
                        </div>
                    </>
                ) : (
                    (documentsTotalPages.isSuccess ||
                        checkIfUserSigned.isSuccess) && (
                        <EmptyData
                            title={'No E-Sign Found!'}
                            description={'You have not any Esign Document yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </div>
        </SiteLayout>
    )
}

export default ESign
