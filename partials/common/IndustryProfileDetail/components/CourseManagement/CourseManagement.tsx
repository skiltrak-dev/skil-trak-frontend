import { Industry } from '@types'
import { courseManagementTabs } from './data'
import { useCourseManagement } from './hooks'
import { PendingCourses } from './PendingCourses'
import { SectorCardHeader } from './SectorCardHeader'
import { RenderCourseList, RenderTabButton } from './components'
import { ReactElement, useEffect, useState } from 'react'
import { InitiateIndustryEsignModal } from '../../modal'

export const CourseManagement = ({ industry }: { industry: Industry }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { computedData, toggleTab, pendingCourses, toggleTabHandler } =
        useCourseManagement()

    const onCancel = () => setModal(null)

    const onInitiateSign = () => {
        setModal(
            <InitiateIndustryEsignModal
                onCancel={onCancel}
                industryUserId={Number(industry?.user?.id)}
                industryId={industry?.id}
            />
        )
    }

    useEffect(() => {
        if (
            pendingCourses?.data?.data &&
            pendingCourses?.data?.data?.length > 0 &&
            pendingCourses?.isSuccess
        ) {
            onInitiateSign()
        }
    }, [pendingCourses])

    const renderContent = () => {
        if (computedData.showTabs) {
            return (
                <>
                    <div className="flex items-center gap-x-2">
                        {courseManagementTabs?.map((tab) => (
                            <RenderTabButton
                                key={tab?.tab}
                                {...tab}
                                onClick={() => toggleTabHandler(tab?.tab)}
                                toggleTab={toggleTab}
                            />
                        ))}
                    </div>

                    {toggleTab === 'pending' ? (
                        <PendingCourses industry={industry} />
                    ) : (
                        <div className="max-h-[380px] min-h-[370px] overflow-auto custom-scrollbar">
                            <RenderCourseList industry={industry} />
                        </div>
                    )}
                </>
            )
        }

        return (
            <div className="max-h-[380px] min-h-[370px] overflow-auto custom-scrollbar">
                <RenderCourseList industry={industry} />
            </div>
        )
    }

    return (
        <div className="p-6">
            {modal}
            <SectorCardHeader />
            {renderContent()}
        </div>
    )
}
