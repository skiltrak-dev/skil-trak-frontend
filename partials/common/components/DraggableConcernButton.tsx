import { useState, useRef, useEffect } from 'react'
import { HiHandRaised } from 'react-icons/hi2'
import { PiDotsSixBold } from 'react-icons/pi'
import Modal from '@modals/Modal'
import { RaiseConcernModal } from './RaiseConcernModal'

export const DraggableConcernButton = () => {
    const [position, setPosition] = useState({
        x: 20,
        y: window.innerHeight - 120, // a little higher to account for both buttons
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const offset = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return
            const newX = e.clientX - offset.current.x
            const newY = e.clientY - offset.current.y
            setPosition({ x: newX, y: newY })
        }

        const handleMouseUp = () => {
            isDragging.current = false
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    console.log('DraggableConcernButton rendered', position)

    const handleDragMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        isDragging.current = true
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
            offset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }
    }

    return (
        <div
            ref={containerRef}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
            }}
            className="fixed z-50 flex flex-col items-center "
        >
            <Modal>
                <Modal.Open opens="raiseConcern">
                    <button className="cursor-pointer flex justify-center items-center rounded-full whitespace-pre-wrap w-16 h-16 text-xs text-center p-4 bg-red-500 hover:bg-red-600 transition-colors text-white font-medium shadow-lg">
                        <div className="flex flex-col items-center">
                            <HiHandRaised size={24} className="text-white" />
                            <span className="text-[10px] mt-1">Concern</span>
                        </div>
                    </button>
                </Modal.Open>
                <Modal.Window name="raiseConcern">
                    <RaiseConcernModal />
                </Modal.Window>
            </Modal>

            {/* Drag Handle Below */}
            <button
                onMouseDown={handleDragMouseDown}
                className="h-4 px-4 text-gray-700 flex shadow items-center justify-center cursor-grab bg-white rounded py-2"
                title="Drag"
            >
                <PiDotsSixBold size={20} />
            </button>
        </div>
    )
}
