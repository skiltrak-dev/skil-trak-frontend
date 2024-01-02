import { AuthorizedUserComponent, ShowErrorNotifications } from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint'
import DatePicker from 'react-datepicker'
import debounce from 'lodash/debounce'
import { LoadingSpinner } from '@components/inputs/components'
import { TabsView } from './TabsView'

export const SVGView = ({
    sign,
    index,
    documentData,
    customFieldsData,
    onSignatureClicked,
    onAddCustomFieldsData,
}: {
    sign: any
    index: number
    documentData: any
    customFieldsData: any
    onSignatureClicked: any
    onAddCustomFieldsData: any
}) => {
    const router = useRouter()
    const [viewport, setViewport] = useState<string | null>('')

    const { notification } = useNotification()

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

    const latestResponse = sign?.responses?.reduce(
        (accumulator: any, current: any) => {
            // Convert timestamps to Date objects for comparison
            const accumulatorDate = new Date(accumulator.updatedAt)
            const currentDate = new Date(current.updatedAt)

            // Return the item with the later updatedAt timestamp
            return currentDate > accumulatorDate ? current : accumulator
        },
        sign?.responses[0]
    )

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
                                    sign={sign}
                                    index={index}
                                    latestResponse={latestResponse}
                                    customFieldsData={customFieldsData}
                                    onSignatureClicked={onSignatureClicked}
                                    onAddCustomFieldsData={
                                        onAddCustomFieldsData
                                    }
                                />
                            </g>
                        </svg>
                    ) : (
                        <Skeleton
                            className="w-full rounded-lg"
                            style={{
                                height: `${documentData?.size?.height}px`,
                            }}
                        />
                    )}
                </div>
            </Waypoint>
        </>
    )
}
