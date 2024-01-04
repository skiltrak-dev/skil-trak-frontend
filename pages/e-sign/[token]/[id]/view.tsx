import {
    Card,
    EmptyData,
    LoadingAnimation,
    PageTitle,
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
    EsignSignatureModalForUser,
    SVGView,
} from '@partials'
import { CommonApi } from '@queries'
import jwt from 'jwt-decode'
import { useRouter } from 'next/router'
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { FaSignature } from 'react-icons/fa'
import { PuffLoader } from 'react-spinners'

const ESign = () => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactNode | null>(null)
    const [customFieldsData, setCustomFieldsData] = useState<any>([])
    const [decodeData, setDecodeData] = useState<any>(null)
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

    const [addCustomFieldsData, addCustomFieldsDataResult] =
        CommonApi.ESign.addEmailCustomFieldData()

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
                action={CommonApi.ESign.useAddSign}
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

    const scrollToPage = (pageIndex: number) => {
        const targetElement = scrollTargetRef.current[pageIndex]
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const onSaveCustomFieldsValue = async () => {
        const customValues = customFieldsData?.filter(
            (data: any) => data?.isCustom && !data?.fieldValue
        )
        if (!sign?.responses?.length) {
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
                id: Number(decodeData?.id),
            }).then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Document Sign',
                        description:
                            'Document signed has been Finished successfully',
                    })
                    router.push('/')
                }
            })
        }
    }

    console.log(
        'documentsTotalPages?.error?.data?.message',
        documentsTotalPages?.error
    )
    return (
        <SiteLayout title={'E Sign'}>
            {modal}
            <ShowErrorNotifications result={checkIfUserSigned} />
            <ShowErrorNotifications result={addCustomFieldsDataResult} />
            <div className="max-w-7xl mx-auto py-10">
                <PageHeading title="E-Sign" subtitle="E Sign" />

                {(documentsTotalPages.isError || checkIfUserSigned.isError) && (
                    <TechnicalError
                        title={documentsTotalPages?.error?.data?.message as any}
                    />
                )}
                {documentsTotalPages.isLoading ||
                documentsTotalPages.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : documentsTotalPages.data ? (
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

                        {sign && (
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
                        )}
                        <div className="flex flex-col gap-y-3">
                            {[
                                ...Array(
                                    Number(documentsTotalPages?.data?.pageCount)
                                ),
                            ]?.map((doc: any, i: number) => (
                                <div
                                    key={i}
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
                                            // doc={doc}
                                            sign={sign}
                                            customFieldsData={customFieldsData}
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
                    </div>
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
