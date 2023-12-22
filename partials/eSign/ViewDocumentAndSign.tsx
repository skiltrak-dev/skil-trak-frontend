import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { FaSignature } from 'react-icons/fa'
import { EsignSignatureModal } from './modal'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { SVGView } from './components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { isBrowser } from '@utils'
import Skeleton from 'react-loading-skeleton'

export const ViewDocumentAndSign = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactNode | null>(null)
    const [customFieldsData, setCustomFieldsData] = useState<any>([])

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
        const updatedData = customFieldsData
            ?.filter((data: any) => data?.type !== FieldsTypeEnum.Signature)
            ?.map((data: any) => (data?.id === e?.id ? e : data))
        setCustomFieldsData(updatedData)
    }

    const sign = tabs?.data?.find(
        (s: any) => s?.type === FieldsTypeEnum.Signature
    )

    const onCancelClicked = () => setModal(null)

    const onSignatureClicked = () => {
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
        addCustomFieldsData({
            documentId: Number(router.query?.id),
            tabsResponse: customFieldsData?.map((tab: any) => ({
                tab: tab?.id,
                data: tab?.fieldValue,
            })),
        }).then((res: any) => {
            if (res?.data) {
                router.back()
            }
        })
    }

    console.log({ sign })

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
            {/* {[...Array(10)].map((_, i) => (
                <div key={i}>
                    <Skeleton className="w-full h-[700px] rounded-lg" />
                </div>
            ))} */}

            {documentsTotalPages.isError && <TechnicalError />}
            {documentsTotalPages.isLoading || documentsTotalPages.isFetching ? (
                <LoadingAnimation />
            ) : documentsTotalPages.isSuccess && documentsTotalPages?.data ? (
                <div className="flex flex-col gap-y-3 relative">
                    <div className="flex justify-end sticky top-1 bg-white px-5 py-2 shadow-md w-fit rounded ml-auto">
                        <Button
                            text="Finish Signing"
                            onClick={() => {
                                onSaveCustomFieldsValue()
                                // router.back()
                            }}
                            loading={addCustomFieldsDataResult.isLoading}
                            disabled={addCustomFieldsDataResult.isLoading}
                        />
                    </div>

                    <div className="flex justify-end items-center gap-x-2">
                        <input
                            type={'checkbox'}
                            onChange={(e: any) => {
                                onSelectAll(e)
                            }}
                            id={'selectAll'}
                        />
                        <label htmlFor="selectAll">Select All</label>
                    </div>

                    {sign && (
                        <div
                            onClick={() => {
                                scrollToPage(Number(sign?.number - 1))
                            }}
                            className="ml-auto z-10 px-7 py-2 h-full bg-red-600 flex justify-center items-center gap-x-2 text-white"
                        >
                            <FaSignature className="text-2xl" />
                            <button className="text-lg">
                                {sign?.responses && sign?.responses?.length > 0
                                    ? 'View Sign'
                                    : 'Sign Here'}
                            </button>
                        </div>
                    )}

                    {[
                        ...Array(Number(documentsTotalPages?.data?.pageCount)),
                    ]?.map((_, i: number) => (
                        <div ref={(el) => (scrollTargetRef.current[i] = el)}>
                            <Card key={i}>
                                <div className="flex justify-center">
                                    <Typography variant="label" semibold>
                                        {i + 1}
                                    </Typography>
                                </div>
                                <SVGView
                                    index={i}
                                    sign={sign}
                                    customFieldsData={customFieldsData}
                                    onSignatureClicked={onSignatureClicked}
                                    onAddCustomFieldsData={
                                        onAddCustomFieldsData
                                    }
                                    documentData={documentsTotalPages?.data}
                                />
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                documentsTotalPages.isSuccess && <EmptyData />
            )}
        </div>
    )
}
