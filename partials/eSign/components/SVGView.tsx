import { Button, TechnicalError } from '@components'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint'
import { TabsView } from './TabsView'

export const SVGView = ({
    index,
    documentData,
    customFieldsData,
    onSignatureClicked,
    onAddCustomFieldsData,
    selectedFillDataField,
}: {
    index: number
    documentData: any
    customFieldsData: any
    onSignatureClicked: any
    onAddCustomFieldsData: any
    selectedFillDataField?: any
}) => {
    const router = useRouter()
    const [viewport, setViewport] = useState<string | null>('')

    const [loadSvg, setLoadSvg] = useState(false)

    const document = CommonApi.ESign.useTemplateDocumentForSign(
        { id: Number(router.query?.id), pageNumber: index },
        {
            skip: !router?.query?.id || !loadSvg,
        }
    )

    const doc = document?.data?.data

    useEffect(() => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(doc, 'image/svg+xml')

        const root = xmlDoc.documentElement
        const svgViewport = root.getAttribute('viewBox')

        setViewport(svgViewport)
    }, [doc])

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
                <div>
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
                                    <p className="text-7xl font-bold text-center text-gray-300">
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
