import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { RtoV2Api, setIndustryDetail, setNavigationTarget } from '@redux'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { scrollToSection } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { IndustryProfildeHeader } from './components'
import { AnalyticsDashboard } from './components/AnalyticsDashboard'
import { OperationalModules } from './components/OperationalModules'
import { PlacementChecklist } from './components/PlacementChecklist'
import { ProfileEssentials } from './components/ProfileEssentials'

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

    const navigationTarget = useAppSelector(
        (state) => state.industry.navigationTarget
    )

    useEffect(() => {
        if (navigationTarget) {
            const { tab, section } = navigationTarget

            if (tab) {
                // Scroll to operational modules first if a tab is specified
                if (operationalModulesRef.current) {
                    operationalModulesRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    })
                }
            }

            if (section) {
                // Wait for potential tab switch animation/render
                setTimeout(
                    () => {
                        scrollToSection(section)
                        // Clear the target after small delay to allow re-navigation if clicked again
                        dispatch(setNavigationTarget(null))
                    },
                    tab ? 500 : 100
                )
            } else if (tab) {
                // If only tab, clear after scroll
                setTimeout(() => {
                    dispatch(setNavigationTarget(null))
                }, 500)
            }
        }
    }, [navigationTarget, dispatch])


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
                    <PlacementChecklist />
                    <div ref={operationalModulesRef}>
                        <OperationalModules />
                    </div>
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
