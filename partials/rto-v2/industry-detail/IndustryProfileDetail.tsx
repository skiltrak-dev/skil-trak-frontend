import { useRouter } from 'next/router'
import { useAppDispatch } from '@redux/hooks'
import { PlacementReadinessModal } from './modal'
import { useEffect, useRef, useState } from 'react'
import { RtoV2Api, setIndustryDetail } from '@redux'
import { IndustryProfildeHeader } from './components'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'
import { OperationalModules } from './components/OperationalModules'
import { PlacementChecklist } from './components/PlacementChecklist'
import { ProfileEssentials } from './components/ProfileEssentials'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'

export const IndustryProfileDetail = () => {
    const operationalModulesRef = useRef<HTMLDivElement>(null)
    const [showReadinessModal, setShowReadinessModal] = useState(true)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const industryDetail = RtoV2Api.Industries.getRtoIndustryDetail(
        Number(router.query.id),
        {
            skip: !router.query?.id,
            refetchOnMountOrArgChange: true,
        }
    )

    useEffect(() => {
        if (industryDetail?.isSuccess && industryDetail?.data) {
            dispatch(setIndustryDetail(industryDetail?.data))
        }
    }, [industryDetail?.isSuccess, industryDetail?.data])

    const handleScrollToSection = (section: string) => {
        if (operationalModulesRef.current) {
            operationalModulesRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            // Trigger tab change after scrolling
            setTimeout(() => {
                const event = new CustomEvent('changeTab', { detail: section })
                window.dispatchEvent(event)
            }, 500)
        }
    }

    return (
        <div>
            {industryDetail?.isError && <TechnicalError />}
            {industryDetail?.isLoading || industryDetail?.isFetching ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : industryDetail?.isSuccess && industryDetail?.data ? (
                <div className="w-full mx-auto space-y-8">
                    <IndustryProfildeHeader />
                    <AnalyticsDashboard />
                    <ProfileEssentials />
                    <PlacementChecklist
                        onNavigateToSection={handleScrollToSection}
                    />
                    <div ref={operationalModulesRef}>
                        <OperationalModules />
                    </div>
                    <PlacementReadinessModal
                        isOpen={showReadinessModal}
                        onClose={() => setShowReadinessModal(false)}
                    />
                </div>
            ) : (
                <EmptyData
                    title={'No Industry Found'}
                    description={'No Industry Found on your request'}
                />
            )}
        </div>
    )
}
