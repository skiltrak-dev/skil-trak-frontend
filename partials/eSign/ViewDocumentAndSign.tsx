import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import { EsignSignatureModal } from './modal'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { SVGView } from './components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'

export const ViewDocumentAndSign = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactNode | null>(null)
    const [customFieldsData, setCustomFieldsData] = useState<any>([])

    const document = CommonApi.ESign.useTemplateDocumentForSign(
        Number(router.query?.id),
        {
            skip: !router?.query?.id,
        }
    )
    const [addCustomFieldsData, addCustomFieldsDataResult] =
        CommonApi.ESign.addCustomFieldData()

    const tabs = CommonApi.ESign.useSignatureTabForTemplate(
        { template: document?.data?.template, docId: Number(router.query?.id) },
        {
            skip: !document?.data || !router.query?.id,
            refetchOnMountOrArgChange: true,
        }
    )

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

    return (
        <div>
            {modal}
            <button
                onClick={() => {
                    document.refetch()
                    tabs.refetch()
                }}
            >
                Re fetch
            </button>
            {document.isError && <TechnicalError />}
            {document.isLoading || document.isFetching ? (
                <LoadingAnimation />
            ) : document.isSuccess && document?.data?.data ? (
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

                    {document?.data?.data?.map((doc: any, i: number) => (
                        <Card key={i}>
                            <div className="flex justify-center">
                                <Typography variant="label" semibold>
                                    {i + 1}
                                </Typography>
                            </div>
                            <SVGView
                                index={i}
                                doc={doc}
                                sign={sign}
                                customFieldsData={customFieldsData}
                                onSignatureClicked={onSignatureClicked}
                                onAddCustomFieldsData={onAddCustomFieldsData}
                            />
                        </Card>
                    ))}
                </div>
            ) : (
                document.isSuccess && <EmptyData />
            )}
        </div>
    )
}
