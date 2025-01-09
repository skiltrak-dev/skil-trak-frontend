import React, { useState, useRef, useEffect } from 'react'
import { createPopper } from '@popperjs/core'
import { HiOutlineDotsVertical } from 'react-icons/hi'

interface Action {
    text: string
    Icon?: any
    onClick?: () => void
    className?: string
}

interface MoreActionsButtonProps {
    actions: Action[]
    buttonText?: string
}

export const MoreActionsButton = ({
    actions,
    buttonText = 'More',
}: MoreActionsButtonProps) => {
    const [showPopper, setShowPopper] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const popperRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (buttonRef.current && popperRef.current) {
            const popper = createPopper(buttonRef.current, popperRef.current, {
                placement: 'bottom-end',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                    {
                        name: 'preventOverflow',
                        options: {
                            boundary: 'viewport',
                        },
                    },
                ],
            })

            return () => {
                popper.destroy()
            }
        }
    }, [showPopper])

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setShowPopper(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowPopper(false)
        }, 100)
    }

    return (
        <div className="relative" onMouseLeave={handleMouseLeave}>
            <button
                ref={buttonRef}
                className="bg-gray-200 text-sm hover:bg-gray-300 text-primaryNew font-medium py-2 px-3 rounded flex gap-x-1.5 items-center"
                onMouseEnter={handleMouseEnter}
            >
                <span className="">{buttonText}</span>
                <div className="">
                    <HiOutlineDotsVertical />
                </div>
            </button>

            {showPopper && (
                <div
                    ref={popperRef}
                    className="bg-white border border-gray-200 rounded shadow-lg z-10"
                    onMouseEnter={handleMouseEnter}
                    style={{
                        minWidth: '150px',
                    }}
                >
                    <div className="py-1">
                        {actions?.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setShowPopper(false)
                                    if (action?.onClick) {
                                        action?.onClick()
                                    }
                                }}
                                className={`block whitespace-nowrap w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                                    action?.className || ''
                                }`}
                            >
                                {action.Icon && (
                                    <action.Icon className="inline mr-2" />
                                )}
                                {action?.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
