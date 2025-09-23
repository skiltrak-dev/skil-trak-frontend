import Image from 'next/image'
import React from 'react'

export const StudentPlacementSteps = () => {
    return (
        <div className="grid grid-cols-2 justify-center items-center md:hidden gap-10 ">
            <div className="flex flex-col items-center ">
                <div
                    className={`bg-[radial-gradient(50%_50%_at_50%_50%,#044866_90.87%,#0D5468_100%)] shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)] w-44 h-44 rounded-full flex items-center justify-center text-white text-center flex-col `}
                >
                    <Image
                        src="/images/site/home-page-v3/assured-placement/assured-placement-journey-icons/student-added.png"
                        alt="student added"
                        height={50}
                        width={50}
                    />
                    Student Added
                </div>
            </div>
            <div className="flex flex-col items-center ">
                <div
                    className={`bg-[radial-gradient(50%_50%_at_50%_50%,#9B2000_90.87%,#6E1700_100%)] shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)] w-44 h-44 rounded-full flex items-center justify-center text-white text-center whitespace-pre-wrap `}
                >
                    Case Officer Assigned
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div
                    className={`bg-[radial-gradient(50%_50%_at_50%_50%,#044866_90.87%,#0D5468_100%)] shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)] w-44 h-44 rounded-full flex items-center justify-center text-white text-center flex-col`}
                >
                    <Image
                        src="/images/site/home-page-v3/assured-placement/assured-placement-journey-icons/compliance.png"
                        alt="student added"
                        height={50}
                        width={50}
                    />
                    Compliance and Matched via AI
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div
                    className={`bg-[radial-gradient(50%_50%_at_50%_50%,#044866_90.87%,#0D5468_100%)] shadow-[4px_26px_30px_0_rgba(0,0,0,0.52)] w-44 h-44 rounded-full flex items-center justify-center text-white text-center flex-col`}
                >
                    <Image
                        src="/images/site/home-page-v3/assured-placement/assured-placement-journey-icons/all-paper-work.png"
                        alt="student added"
                        height={50}
                        width={50}
                    />
                    All Paperwork & Follow ups
                </div>
            </div>
        </div>
    )
}
