import { IndustryApprovedSectorCard } from "./IndustryApprovedSectorCard"


export const IndustryRequestApproved = ({ requestList }: any) => {
    return (
        <div className="space-y-6">
            
            <IndustryApprovedSectorCard requestList={requestList} />
        </div>
    )
}
