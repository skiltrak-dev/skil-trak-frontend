import { ClipLoader } from 'react-spinners'

export const LoadingSpinner = ({
    loading = false,
}: {
    loading: boolean | undefined
}) =>
    loading ? (
        <div className="absolute -right-1 -bottom-2 bg-white p-1 rounded-full shadow-sm flex items-center justify-center">
            <ClipLoader size={16} />
        </div>
    ) : null
