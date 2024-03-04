import { Button, Typography } from '@components'
import { Job, Sector } from '@types'
import { ellipsisText } from '@utils'
import { useRouter } from 'next/router'
import React from 'react'
import { VscLocation } from 'react-icons/vsc'

export const JobCard = ({
    job,
    active,
    index,
}: {
    index: number
    active: boolean
    job: Job
}) => {
    const router = useRouter()

    return (
        <div
            className={`relative w-full ${
                active ? 'h-full' : 'h-[280px] md:h-full'
            } flex flex-col md:flex-row gap-y-5 justify-between shadow-[0px_4px_34px_0px_rgba(177,177,177,0.25)] px-7 py-6 rounded-[10px] bg-white`}
        >
            {active ? (
                <>
                    <div className="flex flex-col justify-between gap-y-4">
                        <div>
                            <Typography variant="subtitle" bold>
                                {ellipsisText(job?.title, 60)}
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-[#767F8C]'}
                            >
                                {ellipsisText(job?.description, 100)}
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Typography
                                variant="label"
                                color={'text-[#18191C]'}
                            >
                                Industry :{' '}
                                <span className="font-bold">
                                    {job?.industry?.user?.name}
                                </span>
                            </Typography>
                            <Typography
                                variant="label"
                                color={'text-[#18191C]'}
                            >
                                Sector :{' '}
                                <span className="font-bold">
                                    {job?.sectors
                                        ?.map((sector: Sector) => sector.name)
                                        ?.join(' - ')}
                                </span>
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 justify-between">
                        <Typography color={'text-[#767F8C]'}>
                            Salary: AUD{job?.salaryFrom} - AUD{job?.salaryTo}
                        </Typography>
                        <div className="flex items-center gap-x-1.5 md:justify-end">
                            <Typography>
                                <span className="text-[13px]">
                                    {job?.addressLine1}
                                </span>
                            </Typography>
                            <VscLocation />
                        </div>

                        <div className="mt-5 md:mt-0 md:ml-auto">
                            <Button
                                outline
                                text={'View Job'}
                                onClick={() => {
                                    router.push(`/jobs/${job?.id}`)
                                }}
                            />
                        </div>
                    </div>{' '}
                </>
            ) : null}
        </div>
    )
}
