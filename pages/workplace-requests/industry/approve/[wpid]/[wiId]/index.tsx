import moment from 'moment'
import { SiteLayout } from '@layouts'
import { SubAdminApi } from '@queries'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { WorkplaceCurrentStatus } from '@utils'
import { CgLock, CgMail } from 'react-icons/cg'
import { FaGraduationCap } from 'react-icons/fa'
import { BiUserCheck, BiUserX } from 'react-icons/bi'
import { Button, Card, LoadingAnimation, TechnicalError } from '@components'

const ApproveRequestPage = () => {
    const router = useRouter()

    const checkIsIndustryPerformedAction =
        SubAdminApi.Workplace.checkIsIndustryPerformedAction(
            {
                wpId: Number(router?.query?.wpid),
                wiId: Number(router?.query?.wiId),
            },
            {
                skip: !router?.query?.wpid,
            }
        )

    SubAdminApi.Workplace.approveStudentFromIndustry(
        {
            wpr: Number(router?.query?.wpid),
            wiId: Number(router?.query?.wiId),
            status: 'accept',
        },
        {
            skip:
                !router?.query?.wpid ||
                checkIsIndustryPerformedAction?.data?.industries[0]
                    ?.industryResponse,
        }
    )

    const industryResponsed =
        checkIsIndustryPerformedAction?.data?.industries[0]?.industryResponse

    const isRejected =
        checkIsIndustryPerformedAction?.data?.industries[0]
            ?.industryResponse === 'rejected'

    return (
        <div>
            {checkIsIndustryPerformedAction?.isLoading ? (
                <LoadingAnimation />
            ) : checkIsIndustryPerformedAction?.isSuccess &&
              checkIsIndustryPerformedAction?.data &&
              checkIsIndustryPerformedAction?.data?.currentStatus !==
                  WorkplaceCurrentStatus?.AwaitingWorkplaceResponse &&
              industryResponsed ? (
                <div
                    className="max-w-5xl mx-auto py-10 flex items-center justify-center p-4"
                    style={{ backgroundColor: '#f8fafc' }}
                >
                    <Card>
                        {/* SkillTrak Header */}
                        <div
                            className="w-full h-16 flex items-center px-6 mb-6 rounded-t-lg"
                            style={{ backgroundColor: '#044866' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-orange-400 flex items-center justify-center">
                                    <FaGraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-white">
                                    <div className="font-semibold">
                                        SkillTrak
                                    </div>
                                    <div className="text-xs opacity-90">
                                        Where Smart Career Happens
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pb-4">
                            <div
                                className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                                style={{
                                    backgroundColor: !isRejected
                                        ? '#10B981'
                                        : '#EF4444',
                                }}
                            >
                                {!isRejected ? (
                                    <BiUserCheck className="w-8 h-8 text-white" />
                                ) : (
                                    <BiUserX className="w-8 h-8 text-white" />
                                )}
                            </div>
                            <div
                                className="text-xl"
                                style={{ color: '#044866' }}
                            >
                                Action {!isRejected ? 'Accepted' : 'Declined'}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Action Status */}
                            <div className="text-center space-y-2">
                                <p className="text-gray-600">
                                    You have already{' '}
                                    <strong
                                        style={{
                                            color: !isRejected
                                                ? '#10B981'
                                                : '#EF4444',
                                        }}
                                    >
                                        {isRejected ? 'rejected' : 'accepted'}
                                    </strong>{' '}
                                    this request.
                                </p>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                    <CgLock className="w-4 h-4" />
                                    <span>
                                        Action taken{' '}
                                        {moment(
                                            checkIsIndustryPerformedAction?.data
                                                ?.industries[0]
                                                ?.industryResponseDate
                                        ).fromNow()}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Support */}
                            <div className="pt-4 border-t border-gray-100 text-center">
                                <Button
                                    Icon={CgMail}
                                    variant="dark"
                                    outline
                                    text="Contact SkillTrak Support"
                                    onClick={() => {
                                        router.push('/contact-us')
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                <div
                    className="max-w-5xl mx-auto py-10 flex items-center justify-center p-4"
                    style={{ backgroundColor: '#f8fafc' }}
                >
                    <Card>
                        {/* SkillTrak Header */}
                        <div
                            className="w-full h-16 flex items-center px-6 mb-6 rounded-t-lg"
                            style={{ backgroundColor: '#044866' }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-orange-400 flex items-center justify-center">
                                    <FaGraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-white">
                                    <div className="font-semibold">
                                        SkillTrak
                                    </div>
                                    <div className="text-xs opacity-90">
                                        Where Smart Career Happens
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center pb-4">
                            <div
                                className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
                                style={{
                                    backgroundColor: '#10B981',
                                }}
                            >
                                <BiUserCheck className="w-8 h-8 text-white" />
                            </div>
                            <div
                                className="text-xl"
                                style={{ color: '#044866' }}
                            >
                                Action Accepted
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Action Status */}
                            <div className="text-center space-y-2">
                                <p className="text-gray-600">
                                    You have already{' '}
                                    <strong
                                        style={{
                                            color: '#10B981',
                                        }}
                                    >
                                        accepted
                                    </strong>{' '}
                                    this request.
                                </p>
                            </div>

                            {/* Contact Support */}
                            <div className="pt-4 border-t border-gray-100 text-center">
                                <Button
                                    Icon={CgMail}
                                    variant="dark"
                                    outline
                                    text="Contact SkillTrak Support"
                                    onClick={() => {
                                        router.push('/contact-us')
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

ApproveRequestPage.getLayout = (page: ReactElement) => {
    return <SiteLayout>{page}</SiteLayout>
}

export default ApproveRequestPage
