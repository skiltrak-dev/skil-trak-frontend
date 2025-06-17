import { FaBoxOpen } from 'react-icons/fa'

interface NoDataProps {
    text?: string
    simple?: boolean
    isError?: boolean
}
export const NoData = ({ text, simple, isError }: NoDataProps) => {
    return (
        <div
            className={`border border-dashed rounded-md flex items-center justify-center flex-col ${
                simple ? 'p-3' : 'p-6'
            } ${isError ? 'bg-error' : ''} gap-y-4 w-full`}
        >
            {!simple ? (
                <span
                    className={`text-4xl ${
                        isError ? 'text-slate-50' : 'text-slate-400'
                    }`}
                >
                    <FaBoxOpen />
                </span>
            ) : null}
            <p
                className={`text-sm font-semibold ${
                    isError ? 'text-slate-50' : 'text-slate-400'
                }`}
            >
                {text || 'No Data'}
            </p>
        </div>
    )
}
