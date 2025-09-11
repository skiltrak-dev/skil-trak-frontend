import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export const StatusBadge = ({ status = null }: { status: boolean | null }) => {
    if (status === null) return null

    return (
        <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-[9px] font-medium ${
                status
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
            }`}
        >
            {status ? (
                <>
                    <FaCheck className="w-2 h-2 mr-1" />
                    Interested
                </>
            ) : (
                <>
                    <IoClose className="w-2 h-2 mr-1" />
                    Not Interested
                </>
            )}
        </div>
    )
}
