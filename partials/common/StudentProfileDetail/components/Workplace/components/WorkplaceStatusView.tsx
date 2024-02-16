import { Typography } from '@components'
import { WorkplaceCurrentStatus } from '@utils'
import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
export const WorkplaceStatusView = ({
    currentStatus,
}: {
    currentStatus: WorkplaceCurrentStatus
}) => {
    const findStatusIndex = Object.values(WorkplaceCurrentStatus).findIndex(
        (status) => status === currentStatus
    )
    return (
        <div className="border border-[#6B7280] rounded-md px-2 py-2.5">
            <Typography variant="small" medium>
                Industry Check
            </Typography>

            <div className="flex items-center gap-x-1 mt-2">
                {Object.entries(WorkplaceCurrentStatus)
                    .slice(0, 9)
                    .map(([key, value], index) => (
                        <>
                            <div
                                className={`h-2 rounded-sm ${
                                    findStatusIndex > index
                                        ? 'bg-[#128C7E]'
                                        : 'bg-[#ADADAD40]'
                                } w-full my-anchor-element-${index}`}
                            ></div>
                            <ReactTooltip
                                anchorSelect={`.my-anchor-element-${index}`}
                                place="top"
                                className=""
                            >
                                <span className="text-[10px]">{key}</span>
                            </ReactTooltip>
                        </>
                    ))}
            </div>
        </div>
    )
}
