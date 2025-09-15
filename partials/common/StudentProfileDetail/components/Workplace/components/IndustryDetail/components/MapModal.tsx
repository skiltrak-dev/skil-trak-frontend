import { useContextBar } from '@hooks'
import { ViewOnMapIndustriesModal } from '@partials/common/MapBox'
import React, { useState } from 'react'
import { OnViewMapTabs } from './onViewMapIndustriesInRadius'

export const MapModal = ({
    workplace,
    onCancel,
    appliedIndustry,
    student,
    course,
}: any) => {
    const [selectedBox, setSelectedBox] = useState<any>(null)
    const contextBar = useContextBar()
    return (
        <div
            className={`bg-[#00000050] ${
                contextBar.isVisible ? 'w-[calc(100%-321px)]' : 'w-full'
            } h-screen flex items-center justify-center gap-x-2 fixed top-0 left-0 px-2 z-40`}
        >
            <div
                className="h-[90vh] lg:h-[450px] xl:h-[530px] bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full md:w-auto md:min-w-[620px]"
                style={{ zIndex: 111 }}
            >
                <ViewOnMapIndustriesModal
                    workplace={{ ...workplace, student }}
                    courseId={course?.id}
                    onCancel={onCancel}
                    appliedIndustry={appliedIndustry}
                    setSelectedBox={setSelectedBox}
                    selectedBox={selectedBox}
                />
            </div>
            <div
                className="h-[90vh] lg:h-[450px] xl:h-[530px] bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full min-w-[480px]"
                style={{ zIndex: 111 }}
            >
                <OnViewMapTabs
                    workplaceId={workplace?.id}
                    selectedBox={selectedBox}
                    workplace={workplace}
                    appliedIndustry={appliedIndustry}
                    courseId={course?.id}
                    setSelectedBox={setSelectedBox}
                />
            </div>
        </div>
    )
}
