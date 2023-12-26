'use client'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useEffect, useRef, useState } from 'react'

type InputData = {
    [key: string]: any
}
interface IDraggableInput {
    id: string
    data: InputData
    Icon: any
    text: string
}

export const DraggableInput = ({ id, data, Icon, text }: IDraggableInput) => {
    const dimRef = useRef<any>()
    const [clientRect, setClientRect] = useState<any>()
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: {
            ...data,
            clientX: clientRect?.x ?? 0,
            clientY: clientRect?.y ?? 0,
        },
        // data,
    })

    const style = {
        transform: CSS.Translate.toString(transform),
    }
    useEffect(() => {
        if (dimRef.current && !clientRect) {
            setClientRect(dimRef.current.getBoundingClientRect())
        }
    }, [])

    return (
        <div ref={dimRef}>
            <button
                ref={setNodeRef}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full"
                style={style}
                {...listeners}
                {...attributes}
            >
                {/* <span className="bg-blue-100 text-xs p-2 rounded-md border border-blue-400 text-blue-800"> */}
                <span
                    className="text-xs p-2 rounded-md border"
                    style={{
                        backgroundColor: `${data?.color}26`,
                        borderColor: data?.color,
                        color: data?.color,
                    }}
                >
                    <Icon />
                </span>
                <p className="text-sm">{text}</p>
            </button>
        </div>
    )
}
