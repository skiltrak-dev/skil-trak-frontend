import { FaBox, FaBoxOpen } from 'react-icons/fa'

interface NoDataProps {
    text?: string
    simple?: boolean
}
export const NoData = ({ text, simple }: NoDataProps) => {
    return (
        <div
            className={`border border-dashed rounded-md flex items-center justify-center flex-col ${
                simple ? 'p-3' : 'p-6'
            } gap-y-4 w-full`}
        >
            {!simple ? (
                <span className="text-4xl text-slate-300">
                    <FaBoxOpen />
                </span>
            ) : null}
            <p className="text-sm font-semibold text-slate-300">
                {text || 'No Data'}
            </p>
        </div>
    )
}
