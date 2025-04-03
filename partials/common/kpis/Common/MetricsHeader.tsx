'use client'
import React from 'react'
import { FaRegHandshake } from 'react-icons/fa6'
import { HiCheck } from 'react-icons/hi'
import { LiaFileContractSolid } from 'react-icons/lia'
import { RiUserHeartLine, RiGitPullRequestFill } from 'react-icons/ri'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export const MetricsHeader = ({
    keyData,
}: {
    keyData:
        | 'Appointment'
        | 'Workplace request'
        | 'Completed'
        | 'Agreement by student'
        | 'Agreement by workplace'
}) => {
    switch (keyData) {
        case 'Appointment':
            return (
                <div
                    className="p-1 bg-white border rounded-lg border-[#1436b05b]"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content="Appointment"
                >
                    <RiUserHeartLine className="text-lg text-[#0365F5]" />
                    <Tooltip id="user-tooltip" place="top" />
                </div>
            )
        case 'Workplace request':
            return (
                <div
                    className="p-1 bg-white border rounded-lg border-[#1436b05b]"
                    data-tooltip-id="request-tooltip"
                    data-tooltip-content="Workplace request"
                >
                    <RiGitPullRequestFill className="text-lg rounded-full p-[1px] text-white bg-[#F5A70C]" />
                    <Tooltip id="request-tooltip" place="top" />
                </div>
            )
        case 'Completed':
            return (
                <div
                    className="p-1 bg-white border rounded-lg border-[#1436b05b]"
                    data-tooltip-id="check-tooltip"
                    data-tooltip-content="Completed"
                >
                    <HiCheck className="text-lg rounded-full p-[1px] text-white bg-[#FF0303]" />
                    <Tooltip id="check-tooltip" place="top" />
                </div>
            )
        case 'Agreement by student':
            return (
                <div
                    className="p-1 bg-white border rounded-lg border-[#1436b05b]"
                    data-tooltip-id="handshake-tooltip"
                    data-tooltip-content="Agreement (Student Provided Workplace)"
                >
                    <FaRegHandshake className="text-lg text-[#35E100]" />
                    <Tooltip id="handshake-tooltip" place="top" />
                </div>
            )
        case 'Agreement by workplace':
            return (
                <div
                    className="p-1 bg-white border rounded-lg border-[#1436b05b]"
                    data-tooltip-id="contract-tooltip"
                    data-tooltip-content="Agreement (Workplace Requested)"
                >
                    <LiaFileContractSolid className="text-lg text-[#207D04]" />
                    <Tooltip id="contract-tooltip" place="top" />
                </div>
            )

        default:
            return <></>
    }
}
