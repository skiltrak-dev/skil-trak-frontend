import { CommonApi } from '@queries'
import { useNotification, useSubadminProfile } from '@hooks'
import { Modal, ShowErrorNotifications, Switch } from '@components'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

export const PremiumFeaturesModal = ({ onCancel, indId, userId }: any) => {
    const { notification } = useNotification()
    const subadmin = useSubadminProfile()
    const role = getUserCredentials()?.role

    const [toggleSubFeatures, resultToggleSubFeatures] =
        CommonApi.Industries.useToggleIndustryPremiumSubFeatures()
    const premiumFlag = CommonApi.Industries.usePremiumFeatureFlag(indId, {
        skip: !indId,
    })
    const { data, isLoading } = CommonApi.Industries.useIndustryPremiumFeatures(
        {
            params: { id: userId },
        }
    )

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
            <ShowErrorNotifications result={resultToggleSubFeatures} />

            <Modal
                title="Premium Features"
                subtitle=""
                showActions={false}
                onCancelClick={onCancel}
            >
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
                                disabled={
                                    !subadmin?.canOnPremiumFeature &&
                                    role === UserRoles.SUBADMIN
                                }
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
