import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CollapsibleContextValue {
    open: boolean
    onOpenChange: () => void
}

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(
    undefined
)

interface CollapsibleProps {
    open?: boolean
    onOpenChange?: () => void
    children: ReactNode
}

export const Collapsible = ({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
    children,
}: CollapsibleProps) => {
    const [internalOpen, setInternalOpen] = useState(false)

    const open = controlledOpen !== undefined ? controlledOpen : internalOpen
    const onOpenChange =
        controlledOnOpenChange || (() => setInternalOpen((prev) => !prev))

    return (
        <CollapsibleContext.Provider value={{ open, onOpenChange }}>
            {children}
        </CollapsibleContext.Provider>
    )
}

interface CollapsibleTriggerProps {
    asChild?: boolean
    children: ReactNode
    className?: string
}

export const CollapsibleTrigger = ({
    asChild,
    children,
    className,
}: CollapsibleTriggerProps) => {
    const context = useContext(CollapsibleContext)

    if (!context) {
        throw new Error(
            'CollapsibleTrigger must be used within a Collapsible component'
        )
    }

    const { onOpenChange } = context

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: onOpenChange,
            className: className,
        })
    }

    return (
        <div onClick={onOpenChange} className={className}>
            {children}
        </div>
    )
}

interface CollapsibleContentProps {
    children: ReactNode
    className?: string
}

export const CollapsibleContent = ({
    children,
    className = '',
}: CollapsibleContentProps) => {
    const context = useContext(CollapsibleContext)

    if (!context) {
        throw new Error(
            'CollapsibleContent must be used within a Collapsible component'
        )
    }

    const { open } = context

    return (
        <div
            className={`transition-all duration-300 ease-in-out ${
                open
                    ? 'max-h-[9999px] opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
            } ${className}`}
            style={{
                display: open ? 'block' : 'none',
            }}
        >
            {open && children}
        </div>
    )
}
