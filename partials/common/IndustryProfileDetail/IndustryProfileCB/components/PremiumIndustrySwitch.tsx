import {
    ActionButton,
    ShowErrorNotifications,
    Switch,
    Typography,
} from '@components'
import { useNotification, useSubadminProfile } from '@hooks'
import { CommonApi } from '@queries'
import React, { ReactNode, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { PremiumFeaturesModal } from '../../modal'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'

export const PremiumIndustrySwitch = ({
    isPremium,
    industryId,
    industryUserId,
}: {
    isPremium: boolean
    industryId: number
    industryUserId: number
}) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const subadmin = useSubadminProfile()

    const role = getUserCredentials()?.role

    const { notification } = useNotification()

    const [togglePremium, resultTogglePremium] =
        CommonApi.Industries.useToggleIndustryPremiumFeature()
    const premiumFlag = CommonApi.Industries.usePremiumFeatureFlag(industryId, {
        skip: !industryId,
    })

    const onCancelModal = () => setModal(null)

    const onClickPremiumFeatures = () => {
        setModal(
            <PremiumFeaturesModal
                indId={industryId}
                userId={industryUserId}
                onCancel={onCancelModal}
            />
        )
    }

    const onTogglePremium = async () => {
        const res: any = await togglePremium({ id: industryId })

        if (res?.data) {
            notification.success({
                title: 'Premium Feature',
                description: `Premium feature updated successfully`,
            })
        }
    }

    return (
        <div>
            {modal}
            <ShowErrorNotifications result={resultTogglePremium} />

            <div className="py-4 border-b border-secondary-dark flex justify-between items-center">
                <div className="flex items-center gap-x-1">
                    <Typography variant="small" medium>
                        Premium Features
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    {premiumFlag?.data?.isPremium && (
                        // {true && (
                        <ActionButton
                            Icon={FiEye}
                            variant="info"
                            onClick={onClickPremiumFeatures}
                        />
                    )}
                    <Typography variant="small" bold color={'text-[#BF0000]'}>
                        NO
                    </Typography>
                    <div className="-mb-2">
                        <Switch
                            name="isPremium"
                            customStyleClass="profileSwitch"
                            onChange={onTogglePremium}
                            defaultChecked={premiumFlag?.data?.isPremium}
                            value={premiumFlag?.data?.isPremium}
                            loading={
                                resultTogglePremium?.isLoading ||
                                premiumFlag?.isLoading
                            }
                            disabled={
                                resultTogglePremium?.isLoading ||
                                premiumFlag?.isLoading ||
                                (!subadmin?.canOnPremiumFeature &&
                                    role === UserRoles.SUBADMIN)
                            }
                        />
                    </div>
                    <Typography variant="small" bold>
                        YES
                    </Typography>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            {' '}
            <Switch
                name="isPremium"
                customStyleClass="profileSwitch"
                onChange={onTogglePremium}
                defaultChecked={isPremium}
                value={isPremium}
                loading={resultTogglePremium?.isLoading}
                disabled={resultTogglePremium?.isLoading}
                label="Enable Premium Features"
            />
        </div>
    )
}
