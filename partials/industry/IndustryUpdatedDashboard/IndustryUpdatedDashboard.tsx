import { useContextBar } from '@hooks'
import { ImportantDocuments, Supervisor } from '@partials/common'
import { IndustryLocations } from '@partials/common/IndustryProfileDetail/components'
import { useIndustryProfileQuery } from '@queries'
import { useEffect, useState } from 'react'
import {
    IndustryDashboardRD,
    IndustryDashboardStudents,
    IndustryServices,
    IndustryShiftingHours,
} from './components'
import { IndustryDashboardCB } from './IndustryDashboardCB'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'

export const IndustryUpdatedDashboard = () => {
    const industry = useIndustryProfileQuery()
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const contextBar = useContextBar()

    useEffect(() => {
        if (industry?.isSuccess && !isMobile) {
            contextBar.setContent(
                <IndustryDashboardCB industry={industry?.data} />
            )
            contextBar.setBgColor('#F7F1E3')
            contextBar.show(false)
        }
        return () => {
            contextBar.setContent(null)
            contextBar.hide()
            contextBar.setBgColor(null)
        }
    }, [industry, mousePosition, isMobile])

    const handleMouseMove = (event: any) => {
        if (!contextBar.content) {
            setMousePosition({ x: event.clientX, y: event.clientY })
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [contextBar])

    return (
        <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 xl:h-[490px] overflow-hidden">
                <div className="h-full">
                    <IndustryShiftingHours />
                </div>
                <div className="w-full h-full grid grid-cols-1 xl:grid-cols-5 gap-3.5">
                    <div className="lg:col-span-3 h-[490px] ">
                        <IndustryDashboardRD />
                    </div>
                    <div className="lg:col-span-2 h-full ">
                        <IndustryServices />
                    </div>
                </div>
            </div>

            <IndustryDashboardStudents />

            {isMobile ? (
                <div className="p-8 rounded-[20px] bg-[#F7F1E3]">
                    <IndustryDashboardCB industry={industry?.data} />
                </div>
            ) : null}
            <ImportantDocuments
                coureseRequirementsLink={
                    '/portals/industry/course-requirements'
                }
            />
            <Supervisor industry={industry?.data} />
            <div>
                <IndustryLocations industry={industry?.data} />
            </div>
        </div>
    )
}
