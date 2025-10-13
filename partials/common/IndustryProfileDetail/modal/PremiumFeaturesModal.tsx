import { Modal, ShowErrorNotifications, Switch } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import React, { useState, useEffect } from 'react'

export const PremiumFeaturesModal = ({
    onCancel,
    indId,
    isPremium,
    userId,
}: any) => {
    const { notification } = useNotification()

    const [togglePremium, resultTogglePremium] =
        CommonApi.Industries.useToggleIndustryPremiumFeature()

    const [toggleSubFeatures, resultToggleSubFeatures] =
        CommonApi.Industries.useToggleIndustryPremiumSubFeatures()

    const { data, isLoading, refetch } =
        CommonApi.Industries.useIndustryPremiumFeatures({
            params: { id: userId },
        })

    const [localPremium, setLocalPremium] = useState(isPremium)
    const [featuresState, setFeaturesState] = useState<any[]>([])
    // Sync local premium
    useEffect(() => {
        setLocalPremium(isPremium)
    }, [isPremium])

    // Initialize local features state when data loads
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setFeaturesState(data)
        }
    }, [isPremium])

    // Show success toast for premium toggle
    useEffect(() => {
        if (resultTogglePremium.isSuccess) {
            notification.success({
                title: 'Premium Feature',
                description: `Premium feature updated successfully`,
            })
        }
    }, [resultTogglePremium.isSuccess])

    // Handle main premium toggle
    const onTogglePremium = async () => {
        try {
            await togglePremium({ id: indId })
            setLocalPremium((prev: any) => !prev)
            // refetch()
        } catch (error) {
            console.error('Toggle premium failed:', error)
        }
    }

    // Handle sub-feature toggle
    const onToggleSubFeature = async (featureId: number) => {
        try {
            await toggleSubFeatures({
                id: indId,
                body: {
                    industry: indId,
                    premiumFeature: featureId,
                },
            })

            // Update local state instantly for better UX
            setFeaturesState((prev) =>
                prev.map((f) =>
                    f.id === featureId ? { ...f, isActive: !f.isActive } : f
                )
            )

            notification.success({
                title: 'Feature Updated',
                description: 'Sub-feature updated successfully',
            })
        } catch (error) {
            console.error('Toggle sub-feature failed:', error)
        }
    }

    return (
        <>
            <ShowErrorNotifications
                result={resultTogglePremium || resultToggleSubFeatures}
            />

            <Modal
                title="Premium Features"
                subtitle=""
                showActions={false}
                onCancelClick={onCancel}
            >
                {/* Master Premium Switch */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                    <Switch
                        name="isPremium"
                        customStyleClass="profileSwitch"
                        onChange={onTogglePremium}
                        defaultChecked={localPremium}
                        value={localPremium}
                        loading={resultTogglePremium?.isLoading}
                        disabled={resultTogglePremium?.isLoading}
                        label="Enable Premium Features"
                    />
                </div>

                {/* Individual Feature Switches */}
                <div className="space-y-4">
                    {isLoading ? (
                        <p className="text-gray-500 text-sm">
                            Loading features...
                        </p>
                    ) : (
                        featuresState?.map((feature: any) => (
                            <Switch
                                key={feature.id}
                                name={feature.title}
                                customStyleClass="profileSwitch"
                                defaultChecked={
                                    feature?.industryPremiumFeatures?.length >
                                        0 &&
                                    feature?.industryPremiumFeatures?.[0]
                                        ?.isActive
                                }
                                value={
                                    feature?.industryPremiumFeatures?.length >
                                        0 &&
                                    feature?.industryPremiumFeatures?.[0]
                                        ?.isActive
                                }
                                onChange={() => onToggleSubFeature(feature.id)}
                                disabled={!localPremium}
                                label={feature.title}
                                loading={
                                    resultToggleSubFeatures?.isLoading &&
                                    resultToggleSubFeatures.originalArgs?.body
                                        ?.premiumFeature === feature.id
                                }
                            />
                        ))
                    )}
                </div>
            </Modal>
        </>
    )
}
