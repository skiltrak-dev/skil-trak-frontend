'use client'
import { ReactNode } from 'react'
import { useDropdown } from './Dropdown'

export const DropdownItem = ({
    children,
    onSelect,
    className = '',
}: {
    children: ReactNode
    onSelect?: () => void
    className?: string
}) => {
    const { setOpen } = useDropdown()

    return (
        <button
            onClick={() => {
                onSelect?.()
                setOpen(false)
            }}
            className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition rounded-md ${className} flex items-center`}
        >
            {children}
        </button>
    )
}
