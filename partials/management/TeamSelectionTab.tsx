import { Typography } from '@components'
import React from 'react'

export const TeamSelectionTab = ({ handleTabChange, activeTab }: any) => {
    return (
        <>
            <div className=" p-4 flex items-center gap-x-10 px-4 py-3  mx-4 border-2 border-dashed rounded-md">
                <div
                    className="cursor-pointer"
                    onClick={() => handleTabChange('subadmin')}
                >
                    <Typography
                        variant="small"
                        color={
                            activeTab === 'subadmin'
                                ? 'text-primaryNew'
                                : 'text-gray-400'
                        }
                        bold={activeTab === 'subadmin'}
                    >
                        Sub-Admin
                    </Typography>
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() => handleTabChange('sourcing')}
                >
                    <Typography
                        variant="small"
                        color={
                            activeTab === 'sourcing'
                                ? 'text-primaryNew'
                                : 'text-gray-400'
                        }
                        bold={activeTab === 'sourcing'}
                    >
                        Sourcing
                    </Typography>
                </div>
            </div>
        </>
    )
}
