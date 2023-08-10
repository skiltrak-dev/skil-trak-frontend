import { ReactElement, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'

export interface TableActionOption {
    text: string | ReactElement
    onClick: Function
    Icon?: any
    color?: string
}

interface TableActionProps {
    text?: string
    options: TableActionOption[]
    rowItem: any
    lastIndex?: boolean
}
export const TableAction = ({
    text,
    options,
    rowItem,
    lastIndex,
}: TableActionProps) => {
    const [isOverButton, setIsOverButton] = useState(false)
    const [isOverList, setIsOverList] = useState(false)

    return (
        <div
            className="relative w-fit"
            onMouseEnter={() => {
                setIsOverButton(true)
            }}
            onMouseLeave={() => {
                setIsOverButton(false)
            }}
        >
            <button className="text-xs rounded px-4 py-2 uppercase font-medium bg-white hover:bg-gray-100 text-gray-800 flex gap-x-2 items-center">
                {text || 'More'}
                <FaChevronDown />
            </button>

            {options && (
                <ul
                    className={`bg-white rounded-xl shadow-xl min-w-[130px] max-w-[175px] ${
                        isOverButton || isOverList ? 'block' : 'hidden'
                    } absolute ${
                        lastIndex ? 'bottom-full' : 'top-full'
                    } right-0 z-10`}
                    onMouseEnter={() => {
                        setIsOverList(true)
                    }}
                    onMouseLeave={() => {
                        setIsOverList(false)
                    }}
                >
                    {options?.map((option, idx) => (
                        <>
                            <li
                                className={`${
                                    option.color
                                        ? option.color
                                        : 'text-gray-700 hover:bg-gray-100'
                                } text-xs cursor-pointer px-4 py-2 font-medium border-b whitespace-nowrap ${
                                    idx === 0 ? 'rounded-t-xl' : ''
                                } ${
                                    idx === options.length - 1
                                        ? 'rounded-b-xl'
                                        : ''
                                } flex items-center gap-x-1`}
                                onClick={() => option.onClick(rowItem)}
                                key={idx}
                            >
                                {option.Icon && (
                                    <span
                                        className={`${
                                            option.color
                                                ? option.color
                                                : 'text-gray-400'
                                        }`}
                                    >
                                        <option.Icon />
                                    </span>
                                )}
                                <div
                                    className="break-all"
                                    style={{
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {option.text}
                                </div>
                            </li>
                        </>
                    ))}
                </ul>
            )}
        </div>
    )
}
