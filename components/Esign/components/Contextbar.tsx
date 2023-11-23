'use client'

import { DraggableInput } from './DraggableInput'

export const Contextbar = ({
    content,
    onSetContextBar,
    onSetCoordinates,
}: {
    content: any
    onSetContextBar: (e: any) => void
    onSetCoordinates: (content: any, cordinate: any, key: string) => void
}) => {
    console.log({ content })
    return (
        <div className="w-[250px] h-[100vh] bg-white px-4 py-2">
            <div className="text-sm font-medium">
                {content?.type || 'Select Input'}
            </div>
            <hr />
            <div>
                <p className="text-sm font-medium">Location</p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                        <p className="text-xs">x:</p>
                        <input
                            type="number"
                            onChange={(e: any) => {
                                onSetCoordinates(content, e, 'x')
                            }}
                            value={content?.location?.x}
                            className="border p-0 w-full"
                        />
                    </div>
                    <div className="flex items-center ">
                        <p className="text-xs">y:</p>
                        <input
                            type="number"
                            onChange={(e: any) => {
                                onSetCoordinates(content, e, 'y')
                            }}
                            value={content?.location?.y}
                            className="border p-0 w-full"
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <p className="text-sm font-medium">Data Label</p>
                <input
                    type="text"
                    onChange={(e: any) => {
                        onSetContextBar({ content, e })
                    }}
                    value={content?.data?.dataLabel}
                    className="border p-0 w-full"
                />
            </div>
        </div>
    )
}
