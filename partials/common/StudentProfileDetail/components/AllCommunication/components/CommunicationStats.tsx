// import { Typography } from '@components'
// import { CommunicationStatsProps } from '../types'

import { Typography } from "@components";
import { CommunicationStatsProps } from "../types";

// export const CommunicationStats: React.FC<CommunicationStatsProps> = ({
//     visibleCount,
//     totalCount,
//     hasMoreItems,
// }) => (
//     <div className="px-4 mb-4">
//         <Typography variant="small" color="text-gray-600">
//             Showing {visibleCount} of {totalCount} communications
//             {hasMoreItems && (
//                 <span className="ml-2 text-blue-600">
//                     (Loading more...)
//                 </span>
//             )}
//         </Typography>
//     </div>
// )

export const CommunicationStats = ({
    visibleCount,
    totalCount,
    hasMoreItems,
    currentPage,
    totalPage,
}: any) => (
    <div className="px-4 mb-4">
        <Typography variant="small" color="text-gray-600">
            {/* Showing {visibleCount} of {totalCount} communications */}
            {`Page ${currentPage} of ${totalPage}`}
            {hasMoreItems && (
                <span className="ml-2 text-blue-600">
                    (Loading more...)
                </span>
            )}
        </Typography>
    </div>
)
