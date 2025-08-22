import {
    AuthorizedUserComponent,
    Badge,
    GlobalModal,
    HideRestrictedData,
    StudentAvatar,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useMaskText } from '@hooks'
import { Student } from '@types'
import { ellipsisText, getUserCredentials } from '@utils'
import { WPInvoiceStatus } from '../components'
import { MdOutlinePaid } from 'react-icons/md'

import {
    AssignToMeStudent,
    ContactStatus,
    EmergencyContact,
    ProblamaticStudent,
    ProfileLinks,
    ProfilePriority,
    StudentDetail,
    StudentExpireTime,
    StudentStatus,
} from '../ContextBarComponents'
import { IndustryRequestsActions } from '@partials/sub-admin/ManagerApprovalList/enum'
import { ViewPaymentDetailsModal } from '../modals'
import Modal from '@modals/Modal'
import { FeedbackForm } from '../feedbackForm/FeedbackForm'
import { useState } from 'react'
import { CommonApi } from '@queries'
import stepsConfig from '../feedbackForm/config'
import { processSubmission } from '../feedbackForm/utils/getAnswersWithQuestions'
import { ViewPlacementFeedbackModal } from '../feedbackForm'
import { FeedbackButton } from '../feedbackForm/components'

export const ProfileViewCB = ({ profile }: { profile: Student }) => {
    const [modal, setModal] = useState<any>(null)
    const role = getUserCredentials()?.role
    const { data, isLoading, isError, isSuccess } =
        CommonApi.Feedback.useGetCourseSchedules(
            { userId: profile?.user?.id },
            {
                skip: !profile?.user?.id,
            }
        )
    const getPlacementFeedback = CommonApi.Feedback.useGetPlacementFeedback(
        { userId: profile?.user?.id },
        {
            skip: !profile?.user?.id,
        }
    )

    const processedFeedback = processSubmission(getPlacementFeedback?.data)
    console.log('processedFeedback', processedFeedback)
    const eligibleCourses =
        data?.courses?.filter(
            (course: any) => course.message === 'eligible for feedback'
        ) || []

    const onClose = () => {
        setModal(null)
    }
    const onPlacementFeedback = (courseId: any) => {
        setModal(
            <GlobalModal>
                <FeedbackForm
                    stdUserId={profile?.user?.id}
                    onClose={onClose}
                    courseId={courseId}
                />
            </GlobalModal>
        )
    }

    return (
        <>
            {modal && modal}
            <div>
                <div className="flex justify-between">
                    <div>
                        <StudentAvatar
                            name={profile?.user.name}
                            imageUrl={profile?.user?.avatar}
                            gender={profile?.gender}
                        />
                    </div>
                    <AuthorizedUserComponent
                        excludeRoles={[UserRoles.OBSERVER]}
                    >
                        <ProfileLinks profile={profile} />
                    </AuthorizedUserComponent>
                </div>

                {/* User */}
                <div className="flex items-center justify-between">
                    <div className="flex justify-between">
                        <div className="mt-2">
                            <div className="flex items-center gap-x-2">
                                <Typography semibold>
                                    <span className="text-[15px]">
                                        {profile?.user?.name}{' '}
                                        {profile?.familyName || ''}
                                    </span>
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {profile?.hasPaid && (
                        <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                            <Modal>
                                <Modal.Open opens="viewPaymentDetails">
                                    <div className=" cursor-pointer mx-4 mt-2 flex items-center gap-x-1 p-2">
                                        <Typography
                                            color="text-link"
                                            variant="muted"
                                        >
                                            Payment Details
                                        </Typography>
                                    </div>
                                </Modal.Open>
                                <Modal.Window name="viewPaymentDetails">
                                    <ViewPaymentDetailsModal />
                                </Modal.Window>
                            </Modal>
                        </AuthorizedUserComponent>
                    )}
                </div>

                <div className="flex justify-between">
                    <AuthorizedUserComponent
                        roles={[
                            UserRoles.ADMIN,
                            UserRoles.RTO,
                            UserRoles.SUBADMIN,
                        ]}
                    >
                        <HideRestrictedData type={UserRoles.STUDENT}>
                            <Typography variant="xs" color="text-[#6B7280]">
                                {process.env.NEXT_PUBLIC_NODE_ENV === 'local'
                                    ? profile?.user?.email
                                    : useMaskText({
                                          key: profile?.user?.email,
                                      })}
                            </Typography>
                        </HideRestrictedData>
                    </AuthorizedUserComponent>
                    <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                        <AssignToMeStudent student={profile} />
                    </AuthorizedUserComponent>
                </div>

                <div className="">
                    {profile?.rtoInfo && (
                        <div className="flex items-center gap-x-2 my-2">
                            <Typography variant="small" semibold>
                                RTO Info:
                            </Typography>
                            <Typography variant="small">
                                {profile?.rtoInfo}
                            </Typography>
                        </div>
                    )}
                    {profile?.courseDescription && (
                        <div className="flex items-center gap-x-2 my-2">
                            <Typography variant="small" semibold>
                                Course Info:
                            </Typography>
                            <Typography variant="small">
                                {profile?.courseDescription}
                            </Typography>
                        </div>
                    )}
                </div>
                <WPInvoiceStatus />

                {/* Expiry Date */}
                <div className="inline-flex flex-col gap-y-2">
                    {processedFeedback && processedFeedback?.length > 0 && (
                        <AuthorizedUserComponent
                            roles={[
                                UserRoles.ADMIN,
                                UserRoles.RTO,
                                UserRoles.SUBADMIN,
                            ]}
                        >
                            <Modal>
                                <Modal.Open opens="viewPlacementFeedback">
                                    <Badge
                                        text="View Placement Feedback"
                                        variant="info"
                                    />
                                </Modal.Open>
                                <Modal.Window name="viewPlacementFeedback">
                                    <ViewPlacementFeedbackModal
                                        feedbackData={processedFeedback}
                                    />
                                </Modal.Window>
                            </Modal>
                        </AuthorizedUserComponent>
                    )}
                    <AuthorizedUserComponent
                        roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                        isAssociatedWithRto={false}
                    >
                        {eligibleCourses && eligibleCourses?.length > 0 && (
                            <FeedbackButton
                                eligibleCourses={eligibleCourses}
                                onPlacementFeedback={onPlacementFeedback}
                            />
                        )}
                    </AuthorizedUserComponent>
                </div>
                <div className="flex items-center gap-x-5 mt-3">
                    <StudentExpireTime
                        studentId={profile?.user?.id}
                        date={profile?.expiryDate}
                        oldExpiry={profile?.oldExpiry}
                    />
                </div>

                {/* Profile Priority */}
                <ProfilePriority
                    studentId={profile?.id}
                    isHighPriority={profile?.isHighPriority}
                    disabled={role === UserRoles.OBSERVER}
                />

                {/* Contact Status */}
                <ContactStatus
                    studentId={profile?.id}
                    nonContactable={profile?.nonContactable}
                    disabled={role === UserRoles.OBSERVER}
                    studentUpdateRequest={profile?.studentUpdateRequests?.find(
                        (r) =>
                            r?.action === IndustryRequestsActions.NonContactable
                    )}
                    nonContactableAt={profile?.nonContactableAt}
                />

                <ProblamaticStudent
                    studentId={profile?.id}
                    hasIssue={profile?.hasIssue}
                    disabled={role === UserRoles.OBSERVER}
                    isReported={profile?.isReported}
                    studentUpdateRequest={profile?.studentUpdateRequests?.find(
                        (r) => r?.action === IndustryRequestsActions.Flagged
                    )}
                    studentUnFlaggedRequest={profile?.studentUpdateRequests?.find(
                        (r) => r?.action === IndustryRequestsActions.UnFlagged
                    )}
                />

                <StudentDetail profile={profile} />
                <EmergencyContact profile={profile} />

                {/* Student Status */}
                <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                    <StudentStatus
                        studentUserId={profile?.user?.id}
                        studentStatus={profile?.studentStatus}
                    />
                </AuthorizedUserComponent>
            </div>
        </>
    )
}
