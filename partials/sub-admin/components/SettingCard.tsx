import React, { useState, useEffect } from 'react'

// Icons
import { BsDot } from 'react-icons/bs'

// components
import { Card, Typography, Switch } from '@components'

import { useSubAdminSettingMutation } from '@queries'

// hooks
import { useNotification } from '@hooks'

export const SettingCard = ({ setting, loading }: any) => {
    const [isEnabled, setIsEnabled] = useState(false)

    const { notification } = useNotification()

    const [subAdminSetting, subAdminSettingResult] =
        useSubAdminSettingMutation()

    useEffect(() => {
        setIsEnabled(setting?.status)
    }, [setting])

    useEffect(() => {
        if (subAdminSettingResult.isError) {
            notification.error({
                title: 'Network Error',
                description: 'Network Error',
            })
        }
    }, [subAdminSettingResult])

    useEffect(() => {
        if (subAdminSettingResult.isSuccess) {
            notification.success({
                title: `${setting.title} Added`,
                description: `${setting.title} Added`,
            })
        }
    }, [subAdminSettingResult.isSuccess])

    const isLoading = loading || subAdminSettingResult.isLoading

    return (
        <Card shadowType={'hard'}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <img className="w-12 h-12" src={setting.img} alt="" />
                    <div>
                        <div className="flex items-center gap-x-1">
                            <Typography
                                variant={'body'}
                                color={'text-gray-700'}
                            >
                                <span className="font-semibold">
                                    {setting.title}
                                </span>
                            </Typography>
                            {setting.badge && (
                                <>
                                    <BsDot className="text-gray-400" />
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-400'}
                                    >
                                        {setting.badge}
                                    </Typography>
                                </>
                            )}
                        </div>
                        <Typography variant={'label'} color={'text-gray-600'}>
                            {setting.description}
                        </Typography>
                    </div>
                </div>
                <Switch
                    name={'setting'}
                    label={setting.status ? 'Yes' : 'No'}
                    onChange={(e: any) => {
                        if (e) {
                            setIsEnabled(e.target.checked)
                            // subAdminSetting(e.target.checked)
                            subAdminSetting(setting.type)
                        }
                    }}
                    defaultChecked={setting.status}
                    value={setting.status}
                    loading={isLoading}
                />
            </div>
        </Card>
    )
}
