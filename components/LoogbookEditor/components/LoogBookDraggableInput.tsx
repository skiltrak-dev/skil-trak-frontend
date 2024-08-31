'use client'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

type InputData = {
    [key: string]: any
}
interface IDraggableInput {
    id: string
    data: InputData
    Icon: any
    text: string
    onClick: any
    setDraggableData: (data: InputData) => void
}

export const LoogBookDraggableInput = ({
    id,
    data,
    Icon,
    text,
    onClick,
    setDraggableData,
}: IDraggableInput) => {
    const dimRef = useRef<any>()
    const [clientRect, setClientRect] = useState<any>()

    useEffect(() => {
        if (dimRef.current && !clientRect) {
            setClientRect(dimRef.current.getBoundingClientRect())
        }
    }, [])

    return (
        <div ref={dimRef}>
            <button
                className="flex items-center justify-between gap-2 p-2.5 bg-primaryNew-dark w-full rounded-lg"
                onClick={onClick}
            >
                <div className="flex items-center gap-x-1.5">
                    <span className="text-xs rounded-md ">
                        <Image
                            alt={text}
                            width={24}
                            height={24}
                            src={data?.img}
                        />
                    </span>
                    <Typography variant="label" color="text-white">
                        {text}
                    </Typography>
                </div>
                <div className="p-1 rounded bg-[#FEEDE838]">
                    <AiOutlinePlus size={14} className="text-white" />
                </div>
            </button>
        </div>
    )
}
