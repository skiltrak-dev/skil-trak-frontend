import { LuSearch } from 'react-icons/lu'

interface TableHeaderProps {
    title?: string
    titleIcon?: React.ReactNode
    showSearch: boolean
    searchPlaceholder: string
    onSearch: (query: string) => void
    searchQuery: string
}

export const TableHeader = ({
    title,
    titleIcon,
    showSearch,
    searchPlaceholder,
    onSearch,
    searchQuery,
}: TableHeaderProps) => {
    return (
        <div className="flex justify-between items-center mb-4">
            {title && (
                <div className="flex justify-center items-center">
                    {titleIcon && (
                        <p className="bg-white p-3 border border-[#1436B033] rounded-xl">
                            {titleIcon}
                        </p>
                    )}
                    <h1 className="pl-3 py-3 font-medium text-base font-inter">
                        {title}
                    </h1>
                </div>
            )}

            {showSearch && (
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        placeholder={searchPlaceholder}
                        className="pl-10 pr-4 text-sm py-2 border border-[#1436b05b] rounded-lg"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LuSearch className="text-[#1436B0] text-sm" />
                    </div>
                </div>
            )}
        </div>
    )
}
