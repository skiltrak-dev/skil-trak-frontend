import React from 'react'

// Icons
import { BsDot } from 'react-icons/bs'

// components
import { Card, Typography, Switch } from '@components'

export const SettingCard = () => {
    return (
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <img
                        className="w-12 h-12"
                        src="https://picsum.photos/150/150"
                        alt=""
                    />
                    <div>
                        <div className="flex items-center gap-x-1">
                            <Typography
                                variant={'body'}
                                color={'text-gray-700'}
                            >
                                <span className="font-semibold">
                                    Receive Workplace Requests
                                </span>
                            </Typography>
                            <BsDot className="text-gray-400" />
                            <Typography variant={'xs'} color={'text-gray-400'}>
                                Activated by Admin
                            </Typography>
                        </div>
                        <Typography variant={'label'} color={'text-gray-600'}>
                            You will be able to receive any workplace request
                            from students
                        </Typography>
                    </div>
                </div>
                <Switch name={'setting'} label={'Yes'} />
            </div>
        </Card>
    )
}
