export const ContactStatusBadge: React.FC<{
    status: string
    type: 'email' | 'call'
}> = ({ status, type }) => {
    const getStatusConfig = () => {
        if (type === 'call') {
            switch (status) {
                case 'answered':
                    return {
                        bg: 'bg-green-100',
                        text: 'text-green-800',
                        label: 'connected',
                    }
                case 'no_answer':
                    return {
                        bg: 'bg-red-100',
                        text: 'text-red-800',
                        label: 'no answer',
                    }
                case 'voicemail':
                    return {
                        bg: 'bg-yellow-100',
                        text: 'text-yellow-800',
                        label: 'voicemail',
                    }
                default:
                    return {
                        bg: 'bg-gray-100',
                        text: 'text-gray-800',
                        label: 'pending',
                    }
            }
        } else {
            switch (status) {
                case 'completed':
                    return {
                        bg: 'bg-green-100',
                        text: 'text-green-800',
                        label: 'completed',
                    }
                case 'seen':
                    return {
                        bg: 'bg-green-100',
                        text: 'text-green-800',
                        label: 'completed',
                    }
                default:
                    return {
                        bg: 'bg-gray-100',
                        text: 'text-gray-800',
                        label: 'pending',
                    }
            }
        }
    }

    const config = getStatusConfig()

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
        >
            <span className="w-2 h-2 rounded-full bg-current mr-1.5"></span>
            {config.label}
        </span>
    )
}
