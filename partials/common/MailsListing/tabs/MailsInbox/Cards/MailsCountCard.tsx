import { Card, Typography } from '@components'
import Image from 'next/image'
import React from 'react'

interface MailsCountCardProps {
    imageUrl: string
    title: string
    count: number
}

export const MailsCountCard = ({
    imageUrl,
    title,
    count,
}: MailsCountCardProps) => {
    return (
        <div className="relative w-full">
            <div className="absolute -top-5 left-6">
                <Image src={imageUrl} alt="Count Icon" height={43} width={43} />
            </div>
            <Card>
                <div className="flex justify-center gap-x-16 items-center mt-4">
                    <Typography variant="title" semibold>
                        {title ?? 'Student'}
                    </Typography>
                    <div className="bg-red-400 rounded-lg px-2 py-0.5">
                        <Typography variant="label" color="text-white" semibold>
                            {count ?? 0}
                        </Typography>
                    </div>
                </div>
            </Card>
        </div>
    )
}
