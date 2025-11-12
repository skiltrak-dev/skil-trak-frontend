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
import { useGetSubAdminStudentDetailQuery } from '@queries'
import { useRouter } from 'next/router'

export const StudentAiSearchDetail = () => {
    const aiPanelRef = useRef<HTMLDivElement>(null)

    const router = useRouter()

    const studentId = Number(router.query?.id)

    const profile = useGetSubAdminStudentDetailQuery(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: 30,
    })

    return (
        <>
            <div>
                {' '}
                <motion.div
                    key="student"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                >
                    {/* Header */}
                    {/* <div className="text-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primaryNew/10 via-primaryNew/20 to-primaryNew/10 px-2 py-1 text-xs text-primaryNew"
                        >
                            <Sparkles className="h-4 w-4" />
                            <span>AI Powered Student Insights</span>
                        </motion.div>
                        <motion.h1
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl"
                        >
                            Student Profile
                        </motion.h1>
                    </div> */}
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
                                    {/* Host Organizations / Workplaces */}
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
                                    <div className="sticky top-8 h-full">
                                        <AIQuestionPanel
                                            student={profile?.data}
                                        />
                                    </div>
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
