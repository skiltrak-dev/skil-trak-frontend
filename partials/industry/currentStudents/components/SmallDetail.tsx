import React from 'react'
import { Card, Typography } from '@components'
import { PiStudentFill } from 'react-icons/pi'
import { FaIndustry } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
import { BiBus } from 'react-icons/bi'

export const SmallDetail = ({
    currentQualification,
    haveDrivingLicense,
    currentWork,
    haveTransport,
}: any) => {
    return (
        <div className="mt-2">
            <div className="flex flex-wrap gap-x-6">
                <div>
                    <Card>
                        <div className="flex gap-x-4 px-3">
                            <PiStudentFill size={30} />
                            <div>
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Current Qualification
                                </Typography>
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-700'}
                                >
                                    {currentQualification || 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className="flex gap-x-4 px-3">
                            <FaIndustry size={25} />
                            <div>
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Current Work
                                </Typography>
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-700'}
                                >
                                    {currentWork || 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className="flex gap-x-4 px-3">
                            <AiFillCar size={30} />
                            <div>
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Have Driving License
                                </Typography>
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-700'}
                                >
                                    {haveDrivingLicense ? 'Yes' : 'No'}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className="flex gap-x-4 px-3">
                            <BiBus size={28} />
                            <div>
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Have Transport
                                </Typography>
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-700'}
                                >
                                    {haveTransport ? 'Yes' : 'No'}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
