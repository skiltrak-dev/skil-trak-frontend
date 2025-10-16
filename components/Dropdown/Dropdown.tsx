'use client'
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useRef,
    useEffect,
} from 'react'

interface DropdownContextType {
    open: boolean
    setOpen: (value: boolean) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

export const useDropdown = () => {
    const context = useContext(DropdownContext)
    if (!context)
        throw new Error('Dropdown components must be used inside <Dropdown>')
    return context
}

export const Dropdown = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div className="relative inline-block text-left" ref={dropdownRef}>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}
