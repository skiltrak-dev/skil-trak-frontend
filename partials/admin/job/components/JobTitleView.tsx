import { InitialAvatar } from '@components'
import { Job } from '@types'
import React from 'react'
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

export const JobTitleView = ({ job }: { job: Job }) => {
    return (
        <div className="flex items-center gap-x-1">
            {job?.title && <InitialAvatar name={job?.title} />}
            <div>
                <p className="font-semibold">{job.title}</p>

                <div>
                    <p className="flex items-center gap-x-2">
                        <span className="text-gray-400">
                            <FaEnvelope size={12} />
                        </span>
                        <span className="text-gray-600">{job?.email}</span>
                    </p>
                    <p className="flex items-center gap-x-2">
                        <span className="text-gray-400">
                            <FaPhone size={12} />
                        </span>
                        <span className="text-gray-600">{job?.phone}</span>
                    </p>
                    <p className="flex items-center gap-x-2">
                        <span className="text-gray-400">
                            <FaLocationDot size={12} />
                        </span>
                        <span className="text-gray-600">{job?.suburb}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
