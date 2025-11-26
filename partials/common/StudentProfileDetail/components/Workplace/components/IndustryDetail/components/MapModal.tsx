import { useContextBar } from '@hooks'
import { ViewOnMapIndustriesModal } from '@partials/common/MapBox'
import React, { useState } from 'react'
import { OnViewMapTabs } from './onViewMapIndustriesInRadius'
import { X } from 'lucide-react'

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
            className={`bg-[#00000050] ${contextBar.isVisible ? 'w-[calc(100%-321px)]' : 'w-full'
                } h-screen flex items-center justify-center gap-x-2 fixed top-0 left-0 px-2 z-40`}
        >
            <div
                className="h-[90vh] lg:h-[450px] xl:h-[530px] bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full md:w-auto md:min-w-[620px]"
                style={{ zIndex: 111 }}
            >
                {/* <ViewOnMapIndustriesModal
                    workplace={{ ...workplace, student }}
                    courseId={course?.id}
                    onCancel={onCancel}
                    appliedIndustry={appliedIndustry}
                    setSelectedBox={setSelectedBox}
                    selectedBox={selectedBox}
                /> */}
                <div className="flex justify-end p-2">
                    <X onClick={onCancel} className='cursor-pointer' />
                </div>
                <div className="flex flex-col items-center justify-center h-full px-6 py-8">
                    <div className="text-center">
                        <svg
                            className="w-16 h-16 mx-auto mb-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Map Temporarily Unavailable
                        </h3>
                        <p className="text-gray-600 text-sm max-w-md">
                            We're currently experiencing technical difficulties with the map feature. Please try again later.
                        </p>
                    </div>
                </div>
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
