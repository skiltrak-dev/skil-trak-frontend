import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { useAlert, useContextBar, useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import {
    IoMdArrowDropleftCircle,
    IoMdArrowDroprightCircle,
} from 'react-icons/io'
import { SVGView, ScrollTabsView } from './components'
import { EsignSignatureModal, FinishSignModal } from './modal'

export const ViewDocumentAndSign = () => {
    const router = useRouter()

    const { alert } = useAlert()

    const contextBar = useContextBar()

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

    useEffect(() => {
        if (tabs?.data && tabs?.data?.length > 0) {
            alert.warning({
                title: 'Make a Sign first',
                description: 'Make a Sign before to fill your fields data',
            })
        }
    }, [tabs])

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

    const onSignatureClicked = (sign: any) => {
        setModal(
            <EsignSignatureModal
                tab={sign}
                onCancel={() => {
                    onCancelClicked()
                }}
            />
        )
    }

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

    const customFieldsAndSign = customFieldsData?.filter(
        (s: any) => s?.type === FieldsTypeEnum.Signature || s?.isCustom
    )

    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    const setContextBarData = () => {
        contextBar.show()
        contextBar.setContent(
            <ScrollTabsView
                customFieldsAndSign={customFieldsAndSign}
                scrollToPage={scrollToPage}
                setSelectedFillDataField={setSelectedFillDataField}
                onClick={() => {
                    contextBar.setContent(null)
                    contextBar.hide()
                    contextBar.setTitle('')
                    setShowSignersField(false)
                }}
            />
        )
        contextBar.setTitle('Signer Tabs')
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

            {documentsTotalPages.isSuccess && (
                <div className="flex justify-end items-center">
                    <ActionButton
                        onClick={() => {
                            setContextBarData()
                        }}
                        Icon={GiHamburgerMenu}
                        simple
                        variant="info"
                    >
                        Show Sign or Text Fields
                    </ActionButton>
                </div>
            )}

            {documentsTotalPages.isSuccess && (
                <div
                    onClick={() => {
                        setContextBarData()
                    }}
                    className="fixed top-[35%] right-0 opacity-70"
                >
                    <IoMdArrowDropleftCircle size={25} />
                </div>
            )}

            {documentsTotalPages.isError && <TechnicalError />}
            {documentsTotalPages.isLoading ? (
                <LoadingAnimation />
            ) : documentsTotalPages.isSuccess && documentsTotalPages?.data ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-2.5 relative">
                        <div className="block lg:hidden">
                            <div className=" flex justify-end items-center ">
                                {showSignersField && (
                                    <div className="absolute top-5 z-20 w-3/4">
                                        <ScrollTabsView
                                            onClick={() => {
                                                setShowSignersField(false)
                                            }}
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
                        <div className="lg:col-span-6 flex flex-col gap-y-3 relative w-full">
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
                                        <SVGView
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
                                        />
                                    </Card>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`hidden lg:block right-0 shadow-lg w-auto fixed top-[20%] h-[75vh]`}
                        >
                            {showSignersField && (
                                <div
                                    className="absolute top-10 -left-4"
                                    onClick={() => {
                                        setShowSignersField(false)
                                    }}
                                >
                                    <IoMdArrowDroprightCircle size={27} />
                                </div>
                            )}
                            <div
                                className={`overflow-auto h-full ${
                                    showSignersField ? 'w-auto' : 'w-0'
                                }`}
                            >
                                <ScrollTabsView
                                    customFieldsAndSign={customFieldsAndSign}
                                    scrollToPage={scrollToPage}
                                    setSelectedFillDataField={
                                        setSelectedFillDataField
                                    }
                                    onClick={() => {
                                        setShowSignersField(false)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center bg-white px-5 py-2 shadow-md w-full rounded my-2">
                        <button
                            className="bg-primary text-white hover:bg-primary-dark border-transparent ring-primary-light text-[11px] 2xl:text-xs font-medium uppercase transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 rounded-md w-full md:w-96 h-12 md:h-[60px]"
                            onClick={() => {
                                onFinishSignModal()
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
