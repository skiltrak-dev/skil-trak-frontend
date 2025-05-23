import { GlobalModal, Typography } from '@components'
import { CourseCard } from '@partials/common/IndustryProfileDetail/components/CourseManagement'
import { RtoApprovalWorkplaceRequest } from '@types'
import { FaRegTimesCircle } from 'react-icons/fa'

export const WPApprovalCourseRequirementModal = ({
    wpAppReq,
    onCancel,
}: {
    wpAppReq: RtoApprovalWorkplaceRequest
    onCancel: () => void
}) => {
    const industryCourseApprovals = [
        {
            courses: [],
            industryCourseApprovals:
                wpAppReq?.industry?.industryCourseApprovals,
        },
    ]

    return (
        <>
            <GlobalModal>
                <div className="flex justify-between items-center px-5 py-2">
                    <Typography variant="title">Course Requirements</Typography>
                    <FaRegTimesCircle
                        size={25}
                        onClick={onCancel}
                        className="cursor-pointer"
                    />
                </div>
                <div className="max-h-[70vh] overflow-auto custom-scrollbar">
                    {industryCourseApprovals?.map((item: any) => (
                        <CourseCard key={item.id} data={item} />
                    ))}
                </div>
            </GlobalModal>
        </>
    )
}
