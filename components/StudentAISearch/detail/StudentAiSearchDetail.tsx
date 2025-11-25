import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'

// import { Button } from './components/ui/button'
// import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar'
import {
    AIQuestionPanel,
    EnhancedStudentProfile,
    LoadingAnimation,
    NoData,
    TechnicalError,
    WorkplaceSection,
} from '@components'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'

export const StudentAiSearchDetail = () => {
    const aiPanelRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const studentId = Number(router.query?.id)

    const profile = CommonApi.AiAssistant.aiStudentSearchDetail(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: 30,
    })

    return (
        <>
            <div>
                <motion.div
                    key="student"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                >
                    {profile.isError ? <TechnicalError /> : null}
                    {profile.isLoading || profile.isFetching ? (
                        <LoadingAnimation />
                    ) : profile?.data && profile?.isSuccess ? (
                        <>
                            {/* Enhanced Profile & AI Panel */}
                            <div className="grid grid-cols-1 gap-5">
                                {/* Main Profile - 2 columns */}
                                <EnhancedStudentProfile
                                    student={profile?.data}
                                />

                                {/* AI Panel - 1 column, sticky on larger screens */}
                                <div
                                    className="xl:col-span-1 grid lg:grid-cols-2 grid-cols-1 gap-2"
                                    ref={aiPanelRef}
                                >
                                    {/* Host Organisation / Workplaces */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="h-full"
                                    >
                                        <WorkplaceSection
                                            student={profile?.data}
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="sticky top-8 h-full"
                                    >
                                        <AIQuestionPanel
                                            student={profile?.data}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                            {/* Floating AI Button - Mobile only */}
                        </>
                    ) : (
                        profile?.isSuccess && (
                            <NoData isError text="No student was found!" />
                        )
                    )}
                </motion.div>
            </div>
            {/* <div>
                <FloatingAIButton
                    onClick={scrollToAIPanel}
                    hasUnreadAnswer={true}
                />
            </div> */}
        </>
    )
}
