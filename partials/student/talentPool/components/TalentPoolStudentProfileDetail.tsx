import React from 'react'
import { SkillsTag } from './SkillsTag'
import { Card, Typography } from '@components'

export const TalentPoolStudentProfileDetail = ({ data }: { data: any }) => {
    return (
        <Card noPadding>
            <div className="border-b border-secondary-dark py-3.5 px-7">
                <Typography variant="label">Student Details</Typography>
            </div>
            <div className=" bg-white md:pl-8 md:pr-16 pb-5 px-4 md:pt-5 pt-2.5">
                <div className="flex flex-col gap-x-6 md:gap-y-0 gap-y-4 md:flex-row md:justify-between w-full">
                    <div className="md:w-1/3">
                        <Typography variant="label">About</Typography>
                        <Typography variant="small">{data?.about}</Typography>
                    </div>
                    <div className="bg-[#E6E6E6] md:h-[170px] w-[1px] mx-7 my-auto"></div>
                    <div className="flex flex-col gap-y-4 min-w-96">
                        <SkillsTag
                            title={'Skill & Talent'}
                            tags={data?.skills}
                        />
                        {/* <div className="bg-[#E6E6E6] md:w-[427px] h-[1px]"></div> */}
                        <SkillsTag
                            title={'Portfolio/Links'}
                            tags={data?.socialLinks}
                        />
                    </div>
                    {/* <div className="bg-[#E6E6E6] md:h-[170px] w-[1px] mx-8 my-auto"></div> */}
                    <div className="min-w-44">
                        <SkillsTag
                            title={'Area of Interest'}
                            tags={data?.interest}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
