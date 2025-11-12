import {
    Card,
    Collapsible,
    CollapsibleContent,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { AssessmentSummary, CoordinatorFinalComment, IndustryInfo, InfoCardsData, PlacementTopSection, ShowMoreAction, WorkplaceDetailAndService, WorkplaceMatchScore, WorkplaceStatus, WorkplaceType, WpEligibilityAssessment } from '@partials/rto-v2/approve-placement/components'
import { RtoApi, SubAdminApi } from '@queries'
import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


type MatchingType = 'automation' | 'manual'

interface WorkplaceEligibility {
    approvalStatus: 'Approved' | 'Pending' | 'Conditional'
    approvedBy: string
    approvedByRole: string
    approvedDate: string
    workplaceType: string
    requiredIndustryChecks: string[]
    courseHours: number
    checklistAttached: boolean
    websiteLink: string
    supervisorName: string
    supervisorQualifications: string[]
    workplaceFullAddress: string
    assessmentSummary: string
    programsAndServices: string[]
    branchesAndLocations: string[]
    activitiesOffered: string[]
    eligibilityJustification: string
    hodFinalComment: string
    combinedWorkplaceDetails?: string // Combined details for all programs, branches, activities
}

export interface PlacementApproval {
    id: string
    studentName: string
    studentId: string
    course: string
    courseCode: string
    industry: string
    location: string
    workplaceSupervisor: string
    supervisorEmail: string
    startDate: string
    duration: string
    hours: number
    submittedDate: string
    daysWaiting: number
    matchScore: number
    matchingType: MatchingType
    studentApprovedDate: string
    requirements: string[]
    studentExpectations: string[]
    eligibilityCriteria: {
        criterion: string
        met: boolean
    }[]
    workplaceEligibility: WorkplaceEligibility
}

export const PendingWpRequest = () => {
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const wpApprovalRequests = SubAdminApi.Workplace.useRtoWpApprovalRequestPendingList(
        {
            limit: itemPerPage,
            skip: itemPerPage * page - itemPerPage,
        },
        {
            refetchOnMountOrArgChange: 30,
        }
    )

    const toggleCardExpansion = (id: string) => {
        const newExpanded = new Set(expandedCards)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedCards(newExpanded)
    }

    return (
        <div className="space-y-4 animate-fade-in">
            {wpApprovalRequests?.isError && <TechnicalError />}
            {wpApprovalRequests?.isLoading || wpApprovalRequests?.isFetching ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : wpApprovalRequests?.data &&
                wpApprovalRequests?.data?.data.length &&
                wpApprovalRequests?.isSuccess ? (
                wpApprovalRequests?.data?.data?.map((approval: any) => {
                    const isExpanded = expandedCards.has(approval.id)

                    console.log({ mainApp: approval })

                    return (
                        <Card
                            key={approval.id}
                            className="border border-border/60 shadow-sm hover:shadow-xl hover:border-primaryNew/30 transition-all overflow-hidden"
                        >
                            {/* Top Section - Always Visible */}
                            <PlacementTopSection approval={approval} />
                            {/* Quick Actions */}

                            {/* Key Info Row */}
                            <div className="p-4 bg-background border-t border-border/50">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    {/* Industry */}
                                    <IndustryInfo
                                        industry={approval?.industry}
                                    />

                                    {/* Match Score */}
                                    <WorkplaceMatchScore approval={approval} />

                                    {/* Workplace Status */}
                                    <WorkplaceStatus
                                        workplaceRequest={
                                            approval?.workplaceRequest
                                        }
                                    />
                                </div>

                                {/* Expandable Section Toggle */}
                                <Collapsible
                                    open={isExpanded}
                                    onOpenChange={() =>
                                        toggleCardExpansion(approval.id)
                                    }
                                >
                                    <ShowMoreAction isExpanded={isExpanded} />

                                    <CollapsibleContent>
                                        {/* <Separator className="my-4" /> */}
                                        <div className="my-4 border border-gray-300" />

                                        {/* Comprehensive Workplace Eligibility Assessment */}
                                        <div className="space-y-4">
                                            {/* Header with Status */}
                                            <WpEligibilityAssessment
                                                approval={approval}
                                                courseInfo={
                                                    approval?.industry
                                                        ?.industryCourseApprovals?.[0]
                                                }
                                            />

                                            {/* Workplace Type & Address */}
                                            <WorkplaceType
                                                industry={approval?.industry}
                                            />

                                            {/* Quick Stats Grid */}
                                            <InfoCardsData
                                                courseInfo={
                                                    approval?.industry
                                                        ?.industryCourseApprovals?.[0]
                                                }
                                                supervisor={
                                                    approval?.industry
                                                        ?.supervisors?.[0]
                                                }
                                            />

                                            {/* Assessment Summary */}
                                            <AssessmentSummary
                                                course={
                                                    approval?.industry
                                                        ?.industryCourseApprovals?.[0]
                                                        ?.course
                                                }
                                            />

                                            {/* Combined Workplace Details or Separate Sections */}
                                            <WorkplaceDetailAndService
                                                description={
                                                    approval?.industry
                                                        ?.industryCourseApprovals?.[0]
                                                        ?.description
                                                }
                                            />

                                            {/* Coordinator Final Comment */}
                                            <CoordinatorFinalComment
                                                hodComment={
                                                    approval?.industry
                                                        ?.industryCourseApprovals?.[0]
                                                        ?.hodComment
                                                }
                                            />
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        </Card>
                    )
                })
            ) : (
                !wpApprovalRequests?.isError && (
                    <Card className="border-border/60">
                        <div className="p-12 text-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-8 w-8 text-success" />
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">
                                        All caught up! 🎉
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        No placements pending approval
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            )}
        </div>
    )
}
