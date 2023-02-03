import { InitialAvatar } from '@components'
import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'

type Props = {
    industries: any
}

export const IndustryNotResponded = ({ industries }: Props) => {
    return (
        <>
            <Card>
                <div className="pb-2">
                    <Typography variant="muted" color={'text-red-500'}>
                        This industry not responded on your profile.
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-2">
                    {industries?.map((industry: any) => (
                        <div className="py-3 px-4 bg-red-100 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-y-2">
                            <div className="flex items-start md:items-center gap-x-2">
                                <InitialAvatar
                                    name={industry?.user?.name}
                                    imageUrl={industry?.user?.avatar}
                                    large
                                />
                                <div>
                                    {/* <Typography
                                        variant="muted"
                                        color={'text-gray-500'}
                                    >
                                        5km away
                                    </Typography> */}
                                    <Typography
                                        variant="label"
                                        color={'text-black'}
                                    >
                                        {industry?.user?.name}
                                    </Typography>
                                    <Typography
                                        variant="muted"
                                        color={'text-gray-500'}
                                    >
                                        {industry?.addressLine1},{' '}
                                        {industry?.addressLine2}
                                    </Typography>
                                </div>
                            </div>
                            <div>
                                <Button variant="error" text="Not Responded" />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </>
    )
}
