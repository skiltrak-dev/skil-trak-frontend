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
                        This industry has rejected your profile.
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-2">
                    {industries?.map((industry: any) => (
                        <div key={industry?.id} className="py-3 px-4 bg-red-100 rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-x-2">
                                <Image
                                    src="https://picsum.photos/200/300"
                                    width={45}
                                    height={45}
                                />
                                <div>
                                    <Typography
                                        variant="muted"
                                        color={'text-gray-500'}
                                    >
                                        5km away
                                    </Typography>
                                    <Typography
                                        variant="label"
                                        color={'text-black'}
                                    >
                                        Claro Aged Care and Disability Services
                                    </Typography>
                                    <Typography
                                        variant="muted"
                                        color={'text-gray-500'}
                                    >
                                        28 Rainwater Dr Lyndhurst VIC 3975,
                                        Australia
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
