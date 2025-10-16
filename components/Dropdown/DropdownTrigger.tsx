'use client'
import { ReactNode } from 'react'
import { useDropdown } from './Dropdown'

export const DropdownTrigger = ({ children }: { children: ReactNode }) => {
    const { open, setOpen } = useDropdown()

    return (
        <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer select-none"
        >
            {children}
        </div>
    )
}
