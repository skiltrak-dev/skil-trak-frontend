import { Typography } from '@components'

export const CommunicationStats = ({
    itemPerPage,
    totalCount,
    currentPage,
    loading,
}: any) => {
    const shownCount = Math.min(currentPage * itemPerPage, totalCount)
    console.log({ itemPerPage })

    return (
        <div className="px-4 mb-2">
            <Typography variant="small" color="text-gray-600">
                {`${itemPerPage} of ${totalCount} communications`}
                {loading && (
                    <span className="ml-2 text-blue-600">
                        (Loading more...)
                    </span>
                )}
            </Typography>
        </div>
    )
}
