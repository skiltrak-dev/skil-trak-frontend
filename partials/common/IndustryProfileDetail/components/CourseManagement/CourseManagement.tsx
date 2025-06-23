import { Industry } from '@types'
import { courseManagementTabs } from './data'
import { useCourseManagement } from './hooks'
import { PendingCourses } from './PendingCourses'
import { SectorCardHeader } from './SectorCardHeader'
import { RenderCourseList, RenderTabButton } from './components'

export const CourseManagement = ({ industry }: { industry: Industry }) => {
    const { computedData, toggleTab, toggleTabHandler } = useCourseManagement()

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
                        <PendingCourses />
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
            <SectorCardHeader />
            {renderContent()}
        </div>
    )
}
