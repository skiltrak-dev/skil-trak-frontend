import { RtoApprovalWorkplaceRequest } from '@types'

export const latestWpApprovalRequest = (
    workplaceApprovaleRequest: RtoApprovalWorkplaceRequest[]
) => {
    return workplaceApprovaleRequest?.reduce(
        (latest: any, current: any) =>
            new Date(current?.createdAt) > new Date(latest?.createdAt)
                ? current
                : latest,
        workplaceApprovaleRequest?.[0]
    )
}
