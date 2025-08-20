export const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-amber-100 text-amber-800 border-amber-200'
        case 'completed':
            return 'bg-green-100 text-green-800 border-green-200'
        case 'rejected':
            return 'bg-red-100 text-red-800 border-red-200'
        case 'in-progress':
            return 'bg-blue-100 text-blue-800 border-blue-200'
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}
