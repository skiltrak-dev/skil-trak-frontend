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
import { FaSignature } from 'react-icons/fa'
import { PuffLoader } from 'react-spinners'
import { SVGView } from './components'
import { EsignSignatureModal } from './modal'
import { ellipsisText } from '@utils'

export const ViewDocumentAndSign = () => {
    const router = useRouter()

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

    const [addCustomFieldsData, addCustomFieldsDataResult] =
        CommonApi.ESign.addCustomFieldData()

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
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (tabs.isSuccess && tabs?.data && tabs?.data?.length > 0) {
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

    const onSaveCustomFieldsValue = () => {
        const customValues = customFieldsData?.filter(
            (data: any) => data?.isCustom && !data?.fieldValue
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
            addCustomFieldsData({
                documentId: Number(router.query?.id),
                tabsResponse: customFieldsData
                    ?.filter((data: any) => data?.isCustom)
                    ?.map((tab: any) => ({
                        tab: tab?.id,
                        data: tab?.fieldValue,
                    })),
            }).then((res: any) => {
                if (res?.data) {
                    router.back()
                }
            })
        }
    }

    const customFieldsAndSign = customFieldsData?.filter(
        (s: any) => s?.type === FieldsTypeEnum.Signature || s?.isCustom
    )

    return (
        <div>
            <ShowErrorNotifications result={addCustomFieldsDataResult} />
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
            {documentsTotalPages.isLoading || documentsTotalPages.isFetching ? (
                <LoadingAnimation />
            ) : documentsTotalPages.isSuccess && documentsTotalPages?.data ? (
                <>
                    <div className="grid grid-cols-6 gap-x-2.5">
                        <div className="col-span-5 flex flex-col gap-y-3 relative w-full">
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

                        <Card noPadding>
                            <div className="px-2 flex flex-col gap-y-2 h-[85vh] overflow-y-auto custom-scrollbar sticky top-0">
                                <div>
                                    <Typography variant="small" semibold>
                                        Click here to fill the data in form
                                    </Typography>
                                </div>
                                {customFieldsAndSign?.map(
                                    (fields: any, i: number) => {
                                        if (
                                            fields?.type ===
                                            FieldsTypeEnum.Signature
                                        ) {
                                            return (
                                                <div
                                                    onClick={() => {
                                                        scrollToPage(
                                                            Number(
                                                                fields?.number -
                                                                    1
                                                            )
                                                        )
                                                    }}
                                                    className="w-full ml-auto z-10 px-7 py-2 h-9 bg-red-600 rounded-md flex justify-center items-center gap-x-2 text-white"
                                                >
                                                    <FaSignature className="text-2xl" />
                                                    <button className="text-lg whitespace-pre">
                                                        {sign?.responses &&
                                                        sign?.responses
                                                            ?.length > 0
                                                            ? 'View Sign'
                                                            : 'Sign Here'}
                                                    </button>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div>
                                                <div
                                                    onClick={() => {
                                                        setSelectedFillDataField(
                                                            fields?.id
                                                        )
                                                        scrollToPage(
                                                            Number(
                                                                fields?.number -
                                                                    1
                                                            )
                                                        )
                                                    }}
                                                    className={`h-9 w-full ml-auto z-10 px-7 py-2 ${
                                                        i % 2 === 0
                                                            ? 'bg-primary'
                                                            : 'bg-success'
                                                    } relative group z-20 text-white rounded-md flex justify-center items-center gap-x-2  cursor-pointer`}
                                                >
                                                    <Typography
                                                        variant="label"
                                                        medium
                                                        color={'text-white'}
                                                    >
                                                        <span className="cursor-pointer">
                                                            {fields?.fieldValue
                                                                ? ellipsisText(
                                                                      fields?.fieldValue,
                                                                      10
                                                                  )
                                                                : `Fill ${fields?.placeholder}`}
                                                        </span>
                                                    </Typography>
                                                    {fields?.fieldValue && (
                                                        <div className="hidden group-hover:block w-[90%] h-96 mx-auto absolute top-5 left-0 p-2 z-[1111] text-black shadow rounded-md bg-white">
                                                            {fields?.fieldValue}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </Card>
                    </div>
                    <div className="flex justify-center bg-white px-5 py-2 shadow-md w-full rounded my-2">
                        <button
                            className="bg-primary text-white hover:bg-primary-dark border-transparent ring-primary-light text-[11px] 2xl:text-xs font-medium uppercase transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 rounded-md w-full md:w-96 h-12 md:h-[60px]"
                            onClick={() => {
                                onSaveCustomFieldsValue()
                                // router.back()
                            }}
                        >
                            {addCustomFieldsDataResult.isLoading ? (
                                <div className="flex items-center justify-center">
                                    <PuffLoader size={24} color={'white'} />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-x-2 text-xl">
                                    Finish Signing
                                </div>
                            )}
                        </button>
                    </div>
                </>
            ) : (
                documentsTotalPages.isSuccess && <EmptyData />
            )}
        </div>
    )
}
