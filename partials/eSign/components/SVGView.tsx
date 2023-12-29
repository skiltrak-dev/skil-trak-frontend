import { AuthorizedUserComponent, Checkbox } from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { UserRoles } from '@constants'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint'

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

                                {customFieldsData &&
                                    customFieldsData?.length > 0 &&
                                    customFieldsData?.map((s: any) => {
                                        const [x, y] = s
                                            ? s?.position?.split(',')
                                            : []
                                        const [width, height] = s
                                            ? s?.size?.split(',')
                                            : []

                                        return s?.number === index + 1 ? (
                                            <foreignObject
                                                x={x}
                                                y={y}
                                                width={
                                                    s?.type ===
                                                    FieldsTypeEnum.Date
                                                        ? String(
                                                              Number(width) + 10
                                                          )
                                                        : width
                                                }
                                                height={
                                                    s?.type ===
                                                    FieldsTypeEnum.Date
                                                        ? String(
                                                              Number(height) +
                                                                  10
                                                          )
                                                        : height
                                                }
                                            >
                                                {s?.type ===
                                                FieldsTypeEnum.Signature ? (
                                                    sign?.responses &&
                                                    sign?.responses?.length >
                                                        0 &&
                                                    !latestResponse?.reSignRequested ? (
                                                        ''
                                                    ) : (
                                                        <div
                                                            onClick={() =>
                                                                onSignatureClicked()
                                                            }
                                                            className="z-10 w-full h-full bg-red-600 flex justify-center items-center gap-x-2 text-white"
                                                        >
                                                            <FaSignature className="text-xs" />
                                                            <button className="text-[8px]">
                                                                Sign Here
                                                            </button>
                                                        </div>
                                                    )
                                                ) : null}
                                                {!s?.responses?.length ? (
                                                    s?.type ===
                                                        FieldsTypeEnum.Text &&
                                                    s?.isCustom ? (
                                                        <input
                                                            type="text"
                                                            name=""
                                                            id=""
                                                            value={
                                                                s?.fieldValue
                                                            }
                                                            className="w-full h-full border rounded-md border-gray-500 text-sm p-1 outline-none"
                                                            placeholder={
                                                                s?.label
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                onAddCustomFieldsData(
                                                                    {
                                                                        ...s,
                                                                        fieldValue:
                                                                            e
                                                                                ?.target
                                                                                ?.value,
                                                                    }
                                                                )
                                                            }}
                                                        />
                                                    ) : s?.type ===
                                                      FieldsTypeEnum.Checkbox ? (
                                                        <div className="flex items-center gap-x-2">
                                                            <input
                                                                type={
                                                                    FieldsTypeEnum.Checkbox
                                                                }
                                                                name={
                                                                    s?.columnName
                                                                }
                                                                id=""
                                                                defaultChecked={
                                                                    s?.fieldValue
                                                                }
                                                                checked={
                                                                    s?.fieldValue
                                                                }
                                                                value={
                                                                    s?.fieldValue
                                                                }
                                                                className="noDefault border !w-full !h-full rounded-md border-gray-500 text-sm p-1 outline-none"
                                                                placeholder={
                                                                    s?.label
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) => {
                                                                    onAddCustomFieldsData(
                                                                        {
                                                                            ...s,
                                                                            fieldValue:
                                                                                e
                                                                                    ?.target
                                                                                    ?.checked,
                                                                        }
                                                                    )
                                                                }}
                                                            />
                                                            {/* <label className="text-xs capitalize">
                                {s?.label}
                            </label> */}
                                                        </div>
                                                    ) : s?.type ===
                                                      FieldsTypeEnum.Radio ? (
                                                        <div className="flex items-center gap-x-2">
                                                            <input
                                                                type={
                                                                    FieldsTypeEnum.Radio
                                                                }
                                                                name={
                                                                    s?.columnName
                                                                }
                                                                id=""
                                                                value={
                                                                    s?.fieldValue
                                                                }
                                                                className="border rounded-md border-gray-500 text-sm p-1 outline-none"
                                                                placeholder={
                                                                    s?.label
                                                                }
                                                                onChange={(
                                                                    e: any
                                                                ) => {
                                                                    onAddCustomFieldsData(
                                                                        {
                                                                            ...s,
                                                                            fieldValue:
                                                                                e
                                                                                    ?.target
                                                                                    ?.checked,
                                                                        }
                                                                    )
                                                                }}
                                                            />
                                                            {/* <label className="text-xs capitalize">
                                {s?.label}
                            </label> */}
                                                        </div>
                                                    ) : s?.type ===
                                                      FieldsTypeEnum.Dropdown ? (
                                                        <select
                                                            value={
                                                                s?.fieldValue
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                onAddCustomFieldsData(
                                                                    {
                                                                        ...s,
                                                                        fieldValue:
                                                                            e
                                                                                ?.target
                                                                                ?.value,
                                                                    }
                                                                )
                                                            }}
                                                            className="w-full h-4 border border-gray-600 rounded text-xs"
                                                        >
                                                            <option>
                                                                Select
                                                            </option>
                                                            {s?.option &&
                                                                s?.option
                                                                    ?.split(',')
                                                                    ?.map(
                                                                        (
                                                                            data: string
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    data
                                                                                }
                                                                                value={
                                                                                    data
                                                                                }
                                                                            >
                                                                                {
                                                                                    data
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                        </select>
                                                    ) : s?.type ===
                                                          FieldsTypeEnum.Date &&
                                                      s?.responses &&
                                                      s?.responses?.length >
                                                          0 ? (
                                                        <AuthorizedUserComponent
                                                            roles={[
                                                                UserRoles.SUBADMIN,
                                                            ]}
                                                        >
                                                            <div className="bg-white flex flex-col ">
                                                                <label
                                                                    htmlFor=""
                                                                    className="text-[8px]"
                                                                >
                                                                    {
                                                                        s?.placeholder
                                                                    }
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    name=""
                                                                    id=""
                                                                    value={
                                                                        s?.fieldValue
                                                                    }
                                                                    className="w-full h-5 border rounded-md border-gray-500 text-sm p-1 outline-none"
                                                                    placeholder={
                                                                        s?.label
                                                                    }
                                                                    onChange={(
                                                                        e: any
                                                                    ) => {
                                                                        onAddCustomFieldsData(
                                                                            {
                                                                                ...s,
                                                                                fieldValue:
                                                                                    e
                                                                                        ?.target
                                                                                        ?.value,
                                                                            }
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                        </AuthorizedUserComponent>
                                                    ) : (
                                                        ''
                                                    )
                                                ) : null}
                                                {/* {sign?.responses &&
                sign?.responses?.length >
                    0 &&
                !latestResponse?.reSignRequested ? (
                    // <img
                    //     src={
                    //         sign?.responses?.[0]
                    //             ?.signature
                    //     }
                    //     className="w-full h-full"
                    // />
                    ''
                ) : (
                    <div
                        onClick={() =>
                            onSignatureClicked()
                        }
                        className="w-full h-full bg-red-600 flex justify-center items-center gap-x-2 text-white"
                    >
                        <FaSignature className="text-xs" />
                        <button className="text-[8px]">
                            Sign Here
                        </button>
                    </div>
                )} */}
                                            </foreignObject>
                                        ) : null
                                    })}
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
