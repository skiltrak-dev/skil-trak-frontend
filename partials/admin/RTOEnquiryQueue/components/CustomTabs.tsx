import { ReactNode } from 'react'
interface TabsProps {
    value: string
    onValueChange: (value: string) => void
    children: ReactNode
    className?: string
}

interface TabsListProps {
    children: ReactNode
    className?: string
}

interface TabsTriggerProps {
    value: string
    children: ReactNode
    className?: string
}

interface TabsContentProps {
    value: string
    children: ReactNode
    className?: string
}

export const Tabs = ({
    value,
    onValueChange,
    children,
    className,
}: TabsProps) => {
    return <div className={className}>{children}</div>
}

export const TabsList = ({ children, className }: TabsListProps) => {
    return (
        <div className={`flex bg-gray-100 rounded-lg p-1 ${className}`}>
            {children}
        </div>
    )
}

export const TabsTrigger = ({
    value,
    children,
    className,
}: TabsTriggerProps) => {
    return (
        <button
            type="button"
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        >
            {children}
        </button>
    )
}

export const TabsContent = ({
    value,
    children,
    className,
}: TabsContentProps) => {
    return <div className={`mt-4 ${className}`}>{children}</div>
}
