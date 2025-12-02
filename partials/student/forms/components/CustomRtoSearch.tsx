import { useEffect, useRef, useState } from 'react'

interface RtoOption {
    label: string
    value: number
}

type CustomRtoSelectType = RtoOption | { value: null; customText: string }

interface CustomRtoSearchProps {
    label: string
    onSearch: (query: string) => void
    options: RtoOption[]
    loading?: boolean
    onSelect: (option: CustomRtoSelectType) => void
    value?: RtoOption
    formMethods: any
    selectedRto: number | null | undefined
}

export const CustomRtoSearch = ({
    label,
    onSearch,
    options,
    loading,
    onSelect,
    value,
    formMethods,
    selectedRto,
}: CustomRtoSearchProps) => {
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const justSelectedRef = useRef(false)

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Sync input with external value
    useEffect(() => {
        if (value?.value) {
            setInput(value.label)
            formMethods.setValue('rto', value.value)
            formMethods.setValue('rtoInfo', '')
        }
    }, [value, formMethods])

    const hasMatch = options.some(
        (opt) => opt.label.toLowerCase() === input.toLowerCase()
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInput(newValue)
        setIsOpen(true)
        onSearch(newValue)
        onSelect({ value: null, customText: newValue })
    }

    const handleBlur = () => {
        setTimeout(() => {
            if (justSelectedRef.current) {
                justSelectedRef.current = false
                return
            }

            const trimmedInput = input.trim()
            if (!hasMatch && trimmedInput.length > 2) {
                onSelect({ value: null, customText: trimmedInput })
            }

            setIsOpen(false)
        }, 200)
    }

    const handleSelect = (option: RtoOption | string) => {
        justSelectedRef.current = true
        if (option === 'other') {
            onSelect({ value: null, customText: input })
        } else if (typeof option !== 'string') {
            setInput(option.label)
            onSelect({ value: option.value, label: option.label })
        }
        setIsOpen(false)
    }

    return (
        <div ref={dropdownRef} className="relative w-full">
            <label className="block mb-1 text-sm text-gray-700">{label}</label>
            <input
                {...formMethods.register('rto')}
                type="hidden"
                readOnly
            />
            <input
                {...formMethods.register('rtoInfo')}
                type="hidden"
                readOnly
            />
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={input}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                onBlur={selectedRto !== null && selectedRto !== undefined ? handleBlur : undefined}
                placeholder="Search or type RTO..."
                aria-label={label}
            />

            {isOpen && (
                <ul className="absolute z-10 bg-white border w-full shadow mt-1 max-h-60 overflow-auto rounded">
                    {loading ? (
                        <li className="px-4 py-2 text-sm text-gray-500">
                            Loading RTOs...
                        </li>
                    ) : options.length > 0 ? (
                        options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                role="option"
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-sm text-gray-500">
                            No RTOs found
                        </li>
                    )}
                    {!hasMatch && input.length > 2 && (
                        <li
                            onClick={() => handleSelect('other')}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-blue-600 border-t"
                            role="option"
                        >
                            Add Custom RTO: "{input}"
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}
