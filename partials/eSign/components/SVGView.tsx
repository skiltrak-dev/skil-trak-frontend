import { Button, TechnicalError, Typography } from '@components'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint'
import { TabsView } from './TabsView'
import { DocumentScrollArrow } from './DocumentScrollArrow'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'

export const SVGView = ({
    scrollToPage,
    sortedPositions,
    index,
    documentData,
    customFieldsData,
    onSignatureClicked,
    onAddCustomFieldsData,
    onDocumentScrollArrow,
    selectedFillDataField,
    customFieldsSelectedId,
    customFieldsAndSign,
    setIsDocumentLoaded,
    onFinishSignModal,
    onGoToSignFieldIfRemaining,
}: {
    onGoToSignFieldIfRemaining: any
    scrollToPage: any
    sortedPositions: any
    onDocumentScrollArrow: () => void
    customFieldsAndSign: any
    customFieldsSelectedId: number
    index: number
    onFinishSignModal: any
    documentData: any
    customFieldsData: any
    setIsDocumentLoaded: any
    onSignatureClicked: any
    onAddCustomFieldsData: any
    selectedFillDataField?: any
}) => {
    const router = useRouter()
    const [viewport, setViewport] = useState<string | null>('')
    const [showEndDocument, setShowEndDocument] = useState(true)
    const [showStartDocument, setShowStartDocument] = useState<boolean>(true)

    const [loadSvg, setLoadSvg] = useState(false)

    const [x, y, width, height] = viewport?.split(' ') || []

    const document = CommonApi.ESign.useTemplateDocumentForSign(
        { id: Number(router.query?.id), pageNumber: index },
        {
            skip: !router?.query?.id || !loadSvg,
        }
    )

    const doc = document?.data?.data

    useEffect(() => {
        if (customFieldsSelectedId < sortedPositions?.length) {
            scrollToPage(
                Number(sortedPositions?.[customFieldsSelectedId]?.id),
                sortedPositions?.[customFieldsSelectedId]?.number - 1
            )
        }
    }, [
        customFieldsSelectedId,
        customFieldsSelectedId < sortedPositions?.length - 1 ? doc : null,
    ])

    useEffect(() => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(doc, 'image/svg+xml')

        const root = xmlDoc.documentElement
        const svgViewport = root.getAttribute('viewBox')

        setViewport(svgViewport)
    }, [doc])

    useEffect(() => {
        const signData = customFieldsData?.filter(
            (a: any) =>
                a?.type === FieldsTypeEnum.Signature && !a?.responses?.length
        )

        if (
            sortedPositions &&
            sortedPositions?.length > 0 &&
            sortedPositions?.[0]?.number === index + 1
        ) {
            if (setIsDocumentLoaded) {
                setIsDocumentLoaded(document)
            }
        }
    }, [doc, index, customFieldsData])

    const [timerId, setTimerId] = useState<any>(null)

    useEffect(() => {
        // Clear the timeout when the component unmounts or when currentPage changes
        return () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        }
    }, [timerId])

    const handleEnter = () => {
        if (timerId) {
            clearTimeout(timerId)
        }

        // Set a timeout to make the API call after 1 second of inactivity
        const id = setTimeout(() => {
            setLoadSvg(true)
        }, 1000)

        setTimerId(id)
    }

    const remainingFields = sortedPositions?.filter(
        (field: any) => !field?.fieldValue && field?.required
    )

    return (
        <>
            {document.isError && (
                <Button
                    text={'Refetch'}
                    variant={'action'}
                    onClick={() => {
                        document?.refetch()
                    }}
                />
            )}
            <Waypoint
                onEnter={handleEnter}
                onLeave={() => {
                    setLoadSvg(false)
                    if (timerId) {
                        clearTimeout(timerId)
                    }
                }}
                // bottomOffset="-50%"
                // topOffset="50%"
            >
                <div className="relative">
                    {(index === 0 ? !showStartDocument : true)
                        ? ((sortedPositions &&
                              sortedPositions?.[customFieldsSelectedId]
                                  ?.number -
                                  1 ===
                                  index) ||
                              customFieldsSelectedId === -1) && (
                              <div
                                  className={`absolute -left-14 lg:-left-24 z-[111111111] ${
                                      customFieldsSelectedId < 0
                                          ? 'rotate-90'
                                          : ''
                                  } transition-all duration-500`}
                                  style={{
                                      top:
                                          customFieldsSelectedId >= 0
                                              ? `${
                                                    (Number(
                                                        sortedPositions?.[
                                                            customFieldsSelectedId
                                                        ]?.position?.split(
                                                            ','
                                                        )?.[1]
                                                    ) *
                                                        100) /
                                                    Number(height)
                                                }%`
                                              : 0,
                                      // top: '24%',
                                  }}
                                  onClick={() => {
                                      onDocumentScrollArrow()
                                  }}
                              >
                                  <DocumentScrollArrow />
                              </div>
                          )
                        : null}
                    {index === 0 && showStartDocument ? (
                        <div className="w-full absolute h-full bg-[#00000050]">
                            <div className="flex flex-col gap-y-2 bg-white w-[500px] p-5 rounded-md top-6 lg:top-24 absolute left-1/2 -translate-x-1/2">
                                <Typography center variant="label">
                                    To begin, please sign the document
                                    initially. Next, proceed to fill in the
                                    necessary fields. Finally, conclude the
                                    e-signature process by clicking the button
                                    located at the end of the document. Let's
                                    commence with the document.
                                </Typography>
                                <div
                                    onClick={() => {
                                        onDocumentScrollArrow()
                                        setShowStartDocument(false)
                                    }}
                                    className="cursor-pointer bg-primary w-60 h-12 mx-auto shadow-lg flex items-center justify-center rounded  "
                                >
                                    <Typography color="text-white" center>
                                        Start With Document
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {index === documentData?.pageCount - 1 &&
                    customFieldsSelectedId === sortedPositions?.length - 1 &&
                    showEndDocument ? (
                        <div
                            id={'finishSign'}
                            className="w-full absolute h-full bg-[#00000050]"
                        >
                            <div className="flex flex-col gap-y-2 bg-white w-[500px] p-5 rounded-md bottom-6 lg:bottom-16 absolute left-1/2 -translate-x-1/2">
                                {remainingFields?.length > 0 ? (
                                    <Typography center variant="label">
                                        <span className="text-[13px]">
                                            It appears you did not fill in all
                                            the required fields. Please ensure
                                            all fields are completed before
                                            finalizing your e-signature.
                                        </span>
                                    </Typography>
                                ) : (
                                    <>
                                        <Typography center variant="label">
                                            <span className="text-[13px]">
                                                Thank you for completing all the
                                                required fields. To finalize
                                                your e-signature, please click
                                                the button below
                                            </span>
                                        </Typography>
                                        <Typography center variant="label">
                                            <span className="text-[13px]">
                                                <span className="font-semibold">
                                                    Important Note:
                                                </span>{' '}
                                                Once you click "Finish," your
                                                e-signature will be legally
                                                binding, and you will not be
                                                able to make further changes to
                                                the document.
                                            </span>
                                        </Typography>
                                    </>
                                )}

                                <div className="flex items-center gap-x-3">
                                    <div className="w-full h-11">
                                        <Button
                                            variant={
                                                customFieldsData &&
                                                customFieldsData?.length > 0
                                                    ? 'primary'
                                                    : 'secondary'
                                            }
                                            disabled={
                                                remainingFields?.length > 0
                                            }
                                            fullHeight
                                            fullWidth
                                            onClick={() => {
                                                if (
                                                    customFieldsData &&
                                                    customFieldsData?.length > 0
                                                ) {
                                                    onFinishSignModal()
                                                }
                                            }}
                                            text={'Finish Signing'}
                                        />
                                    </div>
                                    {remainingFields?.length > 0 ? (
                                        <div className="w-full h-11">
                                            <Button
                                                onClick={() => {
                                                    const r0 =
                                                        remainingFields?.[0]
                                                    onGoToSignFieldIfRemaining(
                                                        r0
                                                    )
                                                }}
                                                fullHeight
                                                fullWidth
                                                outline
                                                text={'Fill Required Fields'}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    {document.isError && <TechnicalError />}
                    {document?.data ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            // width="596"
                            width="100%"
                            // height="842"
                            height="100%"
                            viewBox={viewport || '0 0 596 842'}
                            // dangerouslySetInnerHTML={{ __html: svgContent }}
                            // onClick={handleSvgClick}
                        >
                            <g>
                                {/* <g
dangerouslySetInnerHTML={{
__html: svgContent,
}}
/> */}
                                <image
                                    className="w-full "
                                    href={`data:image/svg+xml,${encodeURIComponent(
                                        doc
                                            ?.replace(
                                                /width="([\d.]+)pt"/,
                                                'width="$1"'
                                            )
                                            .replace(
                                                /height="([\d.]+)pt"/,
                                                'height="$1"'
                                            )
                                    )}`}
                                />

                                {/* <foreignObject
                                    x={-1}
                                    y={
                                        customFieldsSelectedId >= 0
                                            ? Number(
                                                  customFieldsAndSign?.[
                                                      customFieldsSelectedId
                                                  ]?.position?.split(',')?.[1]
                                              )
                                            : 0
                                    }
                                    width={100}
                                    height={100}
                                ></foreignObject> */}

                                <TabsView
                                    index={index}
                                    customFieldsData={customFieldsData}
                                    onSignatureClicked={onSignatureClicked}
                                    onAddCustomFieldsData={
                                        onAddCustomFieldsData
                                    }
                                    selectedFillDataField={
                                        selectedFillDataField
                                    }
                                />
                            </g>
                        </svg>
                    ) : (
                        !document.isError && (
                            <div className="relative w-full">
                                <Skeleton
                                    className="w-full rounded-lg"
                                    style={{
                                        height: `${documentData?.size?.height}px`,
                                    }}
                                />
                                <div className="absolute top-5 left-0 z-10 flex justify-center w-full">
                                    <p className="text-2xl md:text-4xl lg:text-7xl font-bold text-center text-gray-300">
                                        Loading...
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </Waypoint>
        </>
    )
}
