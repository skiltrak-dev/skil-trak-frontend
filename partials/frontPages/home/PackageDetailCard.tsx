import { Button, Typography } from '@components'
import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdHomeWork } from 'react-icons/md'

export const PackageDetailCard = ({ onClick }: { onClick: () => void }) => {
    return (
        <div
            className={`bg-[#094D8C] p-12 flex flex-col justify-center w-80 md:w-96 `}
        >
            <div className="mb-6 md:mb-10">
                <MdHomeWork className="text-white" size={55} />
            </div>
            <div className="flex flex-col gap-y-16">
                <div className="">
                    <Typography variant="title" color="text-white">
                        Placement Management Portal
                    </Typography>
                    <Typography variant="subtitle" color="text-white">
                        Do it yourself
                    </Typography>
                </div>
                <div className="">
                    <Typography variant="title" color={'text-[#6BB8FF]'}>
                        From $7/month (Per User)
                    </Typography>
                    <div className="mt-2">
                        <div className="px-4 py-2 rounded-lg bg-[#97CCFD] text-[#094D8C] text-sm">
                            Start With This Package
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div
                    onClick={() => {
                        if (onClick) {
                            onClick()
                        }
                    }}
                    className="group flex items-center  mt-20"
                >
                    <div className="mt-2  group-hover:-translate-x-3 transition-transform duration-300 ease-in-out">
                        <AiOutlineArrowRight className="text-white rotate-180" />
                    </div>
                    <div className="pl-2">
                        <Typography variant="muted" color="text-white">
                            View Details
                        </Typography>
                        <Typography variant="xs" color="text-white">
                            Package
                        </Typography>
                    </div>
                </div>
                <div className="group flex items-center  mt-20">
                    <div className="">
                        <Typography variant="muted" color="text-white">
                            View Details
                        </Typography>
                        <Typography variant="xs" color="text-white">
                            Package
                        </Typography>
                    </div>
                    <div className="mt-2 pl-2 group-hover:translate-x-3 transition-transform duration-300 ease-in-out">
                        <AiOutlineArrowRight className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    )
}
