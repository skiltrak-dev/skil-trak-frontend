import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import React, { useEffect, useState } from 'react'
import { FaSignature } from 'react-icons/fa'

export const SVGView = ({
    doc,
    index,
    sign,
    customFieldsData,
    onSignatureClicked,
    onAddCustomFieldsData,
}: {
    doc: any
    sign: any
    index: number
    customFieldsData: any
    onSignatureClicked: any
    onAddCustomFieldsData: any
}) => {
    const [viewport, setViewport] = useState<string | null>('')

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

    return (
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
                            ?.replace(/width="([\d.]+)pt"/, 'width="$1"')
                            .replace(/height="([\d.]+)pt"/, 'height="$1"')
                    )}`}
                />

                {customFieldsData &&
                    customFieldsData?.length > 0 &&
                    customFieldsData?.map((s: any) => {
                        const [x, y] = s ? s?.position?.split(',') : []
                        const [width, height] = s ? s?.size?.split(',') : []

                        return s?.number === index + 1 ? (
                            <foreignObject
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                            >
                                {s?.type === FieldsTypeEnum.Signature ? (
                                    sign?.responses &&
                                    sign?.responses?.length > 0 &&
                                    !latestResponse?.reSignRequested ? (
                                        ''
                                    ) : (
                                        <div
                                            onClick={() => onSignatureClicked()}
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
                                    s?.type === FieldsTypeEnum.Text &&
                                    s?.isCustom ? (
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            value={s?.fieldValue}
                                            className="w-full h-full border rounded-md border-gray-500 text-sm p-1 outline-none"
                                            placeholder={s?.label}
                                            onChange={(e: any) => {
                                                onAddCustomFieldsData({
                                                    ...s,
                                                    fieldValue:
                                                        e?.target?.value,
                                                })
                                            }}
                                        />
                                    ) : s?.type === FieldsTypeEnum.Checkbox ? (
                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type={FieldsTypeEnum.Checkbox}
                                                name={s?.columnName}
                                                id=""
                                                defaultChecked={s?.fieldValue}
                                                checked={s?.fieldValue}
                                                value={s?.fieldValue}
                                                className="noDefault border !w-full !h-full rounded-md border-gray-500 text-sm p-1 outline-none"
                                                placeholder={s?.label}
                                                onChange={(e: any) => {
                                                    onAddCustomFieldsData({
                                                        ...s,
                                                        fieldValue:
                                                            e?.target?.checked,
                                                    })
                                                }}
                                            />
                                            {/* <label className="text-xs capitalize">
                                        {s?.label}
                                    </label> */}
                                        </div>
                                    ) : s?.type === FieldsTypeEnum.Radio ? (
                                        <div className="flex items-center gap-x-2">
                                            <input
                                                type={FieldsTypeEnum.Radio}
                                                name={s?.columnName}
                                                id=""
                                                value={s?.fieldValue}
                                                className="border rounded-md border-gray-500 text-sm p-1 outline-none"
                                                placeholder={s?.label}
                                                onChange={(e: any) => {
                                                    onAddCustomFieldsData({
                                                        ...s,
                                                        fieldValue:
                                                            e?.target?.checked,
                                                    })
                                                }}
                                            />
                                            {/* <label className="text-xs capitalize">
                                        {s?.label}
                                    </label> */}
                                        </div>
                                    ) : s?.type === FieldsTypeEnum.Dropdown ? (
                                        <select
                                            value={s?.fieldValue}
                                            onChange={(e: any) => {
                                                onAddCustomFieldsData({
                                                    ...s,
                                                    fieldValue:
                                                        e?.target?.value,
                                                })
                                            }}
                                            className="w-full h-4 border border-gray-600 rounded text-xs"
                                        >
                                            <option>Select</option>
                                            {s?.option &&
                                                s?.option
                                                    ?.split(',')
                                                    ?.map((data: string) => (
                                                        <option
                                                            key={data}
                                                            value={data}
                                                        >
                                                            {data}
                                                        </option>
                                                    ))}
                                        </select>
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
                {/* {sign?.number === i + 1 && (
            <foreignObject
                x={x}
                y={y}
                width={width}
                height={height}
            >
                {sign?.responses &&
                sign?.responses?.length > 0 &&
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
                )}
            </foreignObject>
        )} */}
            </g>
        </svg>
    )
}
