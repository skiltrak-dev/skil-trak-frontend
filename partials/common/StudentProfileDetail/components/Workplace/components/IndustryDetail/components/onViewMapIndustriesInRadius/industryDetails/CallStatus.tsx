export const CallStatus = ({ callLogEntry, wasContacted }: any) => {
    if (!wasContacted) return null

    const getStatusConfig = () => {
        if (callLogEntry?.isAnswered === true) {
            return {
                text: 'Connected',
                bgColor: 'bg-green-100',
                textColor: 'text-green-800',
                dotColor: 'bg-green-500',
                borderColor: 'border-green-200',
            }
        } else if (callLogEntry?.isAnswered === false) {
            return {
                text: 'Not Answered',
                bgColor: 'bg-red-100',
                textColor: 'text-red-800',
                dotColor: 'bg-red-500',
                borderColor: 'border-red-200',
            }
        }
        return null
    }

    const statusConfig = getStatusConfig()
    if (!statusConfig) return null

    return (
        <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium border mt-1 ${statusConfig?.bgColor} ${statusConfig?.textColor} ${statusConfig.borderColor} w-fit`}
        >
            <div
                className={`w-2 h-2 rounded-full ${statusConfig?.dotColor} mr-2`}
            ></div>
            {statusConfig?.text}
        </div>
    )
}
