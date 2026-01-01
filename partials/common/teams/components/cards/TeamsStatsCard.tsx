import { Card } from '@components'
import { Activity, Layers, Users } from 'lucide-react'
import React from 'react'

export const TeamsStatsCard = ({ data }: any) => {
    return (
        <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-primaryNew/20 bg-gradient-to-br from-primaryNew/5 to-background hover:shadow-premium transition-all">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">
                                    Total Members
                                </p>
                                <p className="text-3xl text-primaryNew">
                                    {data?.member ?? 0}
                                </p>
                                {/* <p className="text-xs text-gray-400 mt-1">
                                    2.5% from last month active
                                </p> */}
                            </div>
                            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primaryNew to-primaryNew flex items-center justify-center shadow-premium">
                                <Users className="h-7 w-7 text-white" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border border-primaryNew/20 bg-gradient-to-br from-primaryNew/5 to-background hover:shadow-premium transition-all">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">
                                    Team
                                </p>
                                <p className="text-3xl text-primaryNew">
                                    {data?.team ?? 0}
                                </p>
                                {/* <p className="text-xs text-gray-400 mt-1">
                                    Ready to work
                                </p> */}
                            </div>
                            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primaryNew to-yellow-400 flex items-center justify-center shadow-premium">
                                <Activity className="h-7 w-7 text-white" />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* <Card className="border border-accent/20 bg-gradient-to-br from-yellow-400/5 to-background hover:shadow-premium transition-all">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">
                                    Departments
                                </p>
                                <p className="text-3xl text-yellow-400">20</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Organizational units
                                </p>
                            </div>
                            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-yellow-400 to-primaryNew flex items-center justify-center shadow-premium">
                                <Layers className="h-7 w-7 text-white" />
                            </div>
                        </div>
                    </div>
                </Card> */}
            </div>
        </div>
    )
}
