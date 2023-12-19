import {
    Card,
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
    Typography,
} from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { PageHeading } from '@components/headings'
import { SiteLayout } from '@layouts'
import { EsignSignatureModal, SVGView } from '@partials'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

const ESign = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactNode | null>(null)
    const [customFieldsData, setCustomFieldsData] = useState<any>([])

    const tabs = CommonApi.ESign.useGetTabs(
        {
            docId: Number(router.query?.docId),
            token: String(router.query?.token),
        },
        {
            skip: !router.query?.docId || !router.query?.token,
        }
    )
    const getDocument = CommonApi.ESign.useGetDocument(
        Number(router.query?.docId),
        {
            skip: !router.query?.docId,
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
    return (
        <SiteLayout title={'E Sign'}>
            <div className="max-w-7xl mx-auto py-10">
                <PageHeading title="E-Sign" subtitle="E Sign" />

                {getDocument.isError && <TechnicalError />}
                {getDocument.isLoading || getDocument.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : getDocument.data?.data && getDocument?.data.data?.length ? (
                    <div>
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
                        <div className="flex flex-col gap-y-3">
                            {getDocument?.data?.data?.map(
                                (doc: any, i: number) => (
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
                                            doc={doc}
                                            sign={sign}
                                            customFieldsData={customFieldsData}
                                            onSignatureClicked={
                                                onSignatureClicked
                                            }
                                            onAddCustomFieldsData={
                                                onAddCustomFieldsData
                                            }
                                        />
                                    </Card>
                                )
                            )}
                        </div>
                    </div>
                ) : (
                    !getDocument.isError && (
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
