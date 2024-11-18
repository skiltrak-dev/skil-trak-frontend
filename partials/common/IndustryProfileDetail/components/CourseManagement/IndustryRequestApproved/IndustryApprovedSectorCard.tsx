import { Typography } from '@components'
import { IndustryApprovedCourseList } from './IndustryApprovedCourseList'
import { CiCircleInfo } from 'react-icons/ci'

export const IndustryApprovedSectorCard = ({
    course,
    requestList,
}: {
    course?: any
    requestList: any
}) => {
    return (
        <div className="overflow-hidden">
            <div className="p-4 bg-gray-50 flex items-center gap-x-2">
                <h2 className="text-sm font-medium">
                    Sector: {requestList?.courses?.[0]?.sector?.name ?? 'N/A'}
                </h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                    {requestList?.industryApproval?.[0]?.status ===
                        'approved' && 'Approved'}
                </span>
                <div className="flex gap-x-1">
                    <Typography variant="xxs" color="text-emerald-500">
                        Approved by:
                    </Typography>
                    {requestList?.industryApproval?.map((item: any) => (
                        <Typography variant="muted" color="text-emerald-500">
                            {item?.status ?? 'N/A'}
                        </Typography>
                    ))}
                </div>
                {/* <CiCircleInfo className="text-gray-400 w-5 h-5" /> */}
            </div>
            <IndustryApprovedCourseList requestList={requestList} />
        </div>
    )
}
