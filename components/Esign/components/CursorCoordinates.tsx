import { useEffect, useState } from 'react'

export const CursorCoordinates = ({
    element,
    setTabDropCoordinates,
    viewport,
}: {
    viewport: any
    setTabDropCoordinates: (coordinates: { x: number; y: number }) => void
    element: any
}) => {
    const [viewPortData, setViewPortData] = useState<string[]>([])
    console.log('viewport', viewport)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 })

    useEffect(() => {
        if (viewport) {
            setViewPortData(viewport?.split(' '))
        }
    }, [viewport])

    const [a, b, width, height] = viewPortData

    useEffect(() => {
        const handleWindowMouseMove = (event: any) => {
            const clientRect = element.getBoundingClientRect()

            const clientX = event.clientX - clientRect.x
            const clientY = event.clientY - clientRect.y

            // setCoords({
            //     x: clientX * (842.04 / clientRect.width),
            //     y: clientY * (596.96 / clientRect.height),
            // })

            setCoords({
                x: clientX * (Number(width) / clientRect.width),
                y: clientY * (Number(height) / clientRect.height),
            })

            if (width && height) {
                setTabDropCoordinates({
                    x: clientX * (Number(width) / clientRect.width),
                    y: clientY * (Number(height) / clientRect.height),
                })
            }

            setCursorCoords({
                x: clientX,
                y: clientY,
            })
        }
        window.addEventListener('mousemove', handleWindowMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove)
        }
    }, [width, height])

    return (
        <div
            className={`absolute bg-gray-100 shadow rounded text-gray-800 text-[11px] z-[999]`}
            style={{
                top: `${cursorCoords.y + 10}px`,
                left: `${cursorCoords.x + 10}px`,
            }}
        >
            [{coords.x.toFixed(2)}, {coords.y.toFixed(2)}]
        </div>
    )
}
