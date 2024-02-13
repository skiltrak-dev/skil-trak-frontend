import React, { useEffect, useState } from 'react'

// Icons
import { GiWhiteBook, GiOpenBook } from 'react-icons/gi'
import { GoDotFill } from 'react-icons/go'
import { ImPhone, ImLocation } from 'react-icons/im'

// components
import { CourseDetails } from './components'

// hooks
import { useGetSectors, useContextBar } from '@hooks'

// components
import { Card, Typography } from '@components'

export const Sectors = ({ data }: any) => {
    const { isVisible, title, show, setContent } = useContextBar()
    const sectors = useGetSectors(data)
    const [sector, setSector] = useState<any | null>(null)

    useEffect(() => {
        if (sectors) {
            setSector(sectors[0])
        }
    }, [sectors])

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                    <GiWhiteBook className="text-sky-900" />
                    <Typography color={'text-gray-700'}>Sectors</Typography>
                </div>
                <Typography variant={'muted'} color={'text-info'}>
                    <span className="cursor-pointer">(+2) View All</span>
                </Typography>
            </div>

            {/*  */}
            <div className="mt-2 mb-1">
                <Typography variant={'label'} color={'text-sky-900'} capitalize>
                    {sector?.name}
                </Typography>
            </div>

            {/*  */}
            <div className="pl-1 ml-2 border-l border-secondary-dark">
                {sector?.courses?.map((sec: any) => (
                    <div
                        key={sec.id}
                        className="flex justify-between items-center p-2 relative"
                    >
                        <GoDotFill className="absolute top-auto bottom-auto -left-[15px] text-secondary-dark text-xl" />
                        <div className="flex items-center gap-x-2">
                            <GiOpenBook />
                            <div>
                                <Typography variant={'small'}>
                                    <span className="font-semibold">
                                        {sec?.code}
                                    </span>
                                </Typography>
                                <Typography variant={'muted'}>
                                    {sec?.name}
                                </Typography>
                            </div>
                        </div>
                        <Typography variant={'muted'} color={'text-info'}>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    show()
                                    setContent(
                                        <CourseDetails courseId={sec.id} />
                                    )
                                }}
                            >
                                View
                            </span>
                        </Typography>
                    </div>
                ))}
            </div>
        </Card>
    )
}
