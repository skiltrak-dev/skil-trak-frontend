import {
    ActionModal,
    Button,
    Typography,
    ShowErrorNotifications,
    InitialAvatar,
} from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Industry, Rto, Subscriber } from '@types'
import { useEffect, useState } from 'react'
import { FaBan } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { IoIosWarning } from 'react-icons/io'
import { useChangeStatus } from '../hooks'
import { useForwardWorkplaceToIndustryMutation } from '@queries'

export const StudentProvidedForwardModal = ({
    industry,
    onCancel,
    workplaceId,
}: {
    industry: any
    onCancel: Function
    workplaceId: number
}) => {
    // hooks
    const { notification } = useNotification()

    // query
    const [forwardToIndustry, forwardToIndustryResult] =
        useForwardWorkplaceToIndustryMutation()
   
    const onConfirmUClicked = async () => {
        forwardToIndustry({
            industryId: industry?.id,
            id: workplaceId,
        })
    }

    useEffect(() => {
        if (forwardToIndustryResult.isSuccess) {
            notification.success({
                title: 'Request Forwarded',
                description: 'Request Forwarded to industry Successfully',
            })
            onCancel()
        }
    }, [forwardToIndustryResult])

    return (
        <>
            <ShowErrorNotifications result={forwardToIndustryResult} />
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white modal-animation rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] px-16 py-4">
                    <div className={`text-green-500`}>
                        <HiCheckBadge />
                    </div>

                    <div className="flex flex-col items-center gap-y-2">
                        <p className="text-lg font-semibold text-orange-500">
                            Forwar to Industry
                        </p>
                        <p className="text-gray-500 max-w-[400px] text-center">
                            You are about to forward request to following
                            industry.
                        </p>
                    </div>

                    <div className="w-full py-1 px-2 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-x-2">
                            {industry?.industry?.user?.name && (
                                <InitialAvatar
                                    name={industry?.industry?.user?.name}
                                    imageUrl={industry?.industry?.user?.avatar}
                                />
                            )}
                            <div>
                                <div className="flex items-center gap-x-0.5">
                                    <Typography variant={'label'}>
                                        <span className="font-bold">
                                            {industry?.industry?.user?.name}
                                        </span>
                                    </Typography>
                                </div>
                                <Typography
                                    variant={'label'}
                                    color={'text-gra-500'}
                                >
                                    {industry?.industry?.addressLine1},{' '}
                                    {industry?.industry?.addressLine2}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-x-4 items-center">
                        <Button
                            text="Cancel"
                            variant="secondary"
                            onClick={() => {
                                onCancel && onCancel()
                            }}
                        />
                        <Button
                            text={'FORWARD REQUEST TO INDUSTRY'}
                            variant={'primary'}
                            onClick={() => {
                                onConfirmUClicked()
                            }}
                            loading={forwardToIndustryResult?.isLoading}
                            disabled={forwardToIndustryResult?.isLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
