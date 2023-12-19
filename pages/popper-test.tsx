import React, { useState, useRef } from 'react'
import { usePopper } from 'react-popper'

const PopperExample: React.FC = () => {
    const [referenceElement, setReferenceElement] =
        useState<HTMLElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: 'arrow',
                options: { element: arrowElement },
            },
        ],
    })

    const generateBigData = (size: number) => {
        const data: React.ReactNode[] = []
        for (let i = 1; i <= size; i++) {
            data.push(
                <div
                    key={i}
                    style={{ padding: '8px', borderBottom: '1px solid #ccc' }}
                >
                    Item {i}
                </div>
            )
        }
        return data
    }

    const bigData = generateBigData(100)

    return (
        <div className="h-96 overflow-hidden">
            <button
                ref={setReferenceElement}
                onClick={() => setIsOpen(!isOpen)}
            >
                Click me
            </button>

            {isOpen && (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="h-full"
                >
                    {bigData}
                    <div ref={setArrowElement} style={styles.arrow} />
                </div>
            )}
        </div>
    )
}

export default PopperExample
