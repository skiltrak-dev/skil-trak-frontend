import { Modal, ShowErrorNotifications, Switch } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import React, { useState, useEffect } from 'react'

export const PremiumFeaturesModal = ({ onCancel, indId, userId }: any) => {
    const { notification } = useNotification()

    const [togglePremium, resultTogglePremium] =
        CommonApi.Industries.useToggleIndustryPremiumFeature()

    const [toggleSubFeatures, resultToggleSubFeatures] =
        CommonApi.Industries.useToggleIndustryPremiumSubFeatures()
    const premiumFlag = CommonApi.Industries.usePremiumFeatureFlag(indId, {
        skip: !indId,
    })
    const { data, isLoading, refetch } =
        CommonApi.Industries.useIndustryPremiumFeatures({
            params: { id: userId },
        })

    useEffect(() => {
        if (resultTogglePremium.isSuccess) {
            notification.success({
                title: 'Premium Feature',
                description: `Premium feature updated successfully`,
            })
        }
    }, [resultTogglePremium.isSuccess])

    const onTogglePremium = async () => {
        togglePremium({ id: indId })
    }

    const onToggleSubFeature = async (featureId: number) => {
        toggleSubFeatures({
            id: indId,
            body: {
                industry: indId,
                premiumFeature: featureId,
            },
        })
        notification.success({
            title: 'Feature Updated',
            description: 'Sub-feature updated successfully',
        })
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
                <div className="mb-6 border-b border-gray-200 pb-4">
                    <Switch
                        name="isPremium"
                        customStyleClass="profileSwitch"
                        onChange={onTogglePremium}
                        defaultChecked={premiumFlag?.data?.isPremium}
                        value={premiumFlag?.data?.isPremium}
                        loading={
                            resultTogglePremium?.isLoading ??
                            premiumFlag.isLoading
                        }
                        disabled={resultTogglePremium?.isLoading}
                        label="Enable Premium Features"
                    />
                </div>

                <div className="space-y-4">
                    {isLoading ? (
                        <p className="text-gray-500 text-sm">
                            Loading features...
                        </p>
                    ) : (
                        data?.map((feature: any) => (
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
                                disabled={!premiumFlag?.data?.isPremium}
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
