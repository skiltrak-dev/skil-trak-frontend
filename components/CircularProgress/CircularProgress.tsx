import React from 'react'
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar'

// query
import { IndustryApi, useIndustryStudentCountQuery } from '@queries'

// components
import { Typography } from 'components/Typography'
import { getThemeColors } from '@theme'

// Colors
// import { Colors } from "utills/colors/Colors";

const colors = getThemeColors()

export const CircularProgresbar = () => {
    const studentCount = IndustryApi.Students.useStudentCount()
    return (
        <div className="flex justify-center items-center w-full">
            <CircularProgressbarWithChildren
                value={Math.floor(
                    (studentCount?.data?.count / studentCount?.data?.capacity) *
                        100
                )}
                styles={buildStyles({
                    pathColor: colors?.primary.DEFAULT,
                    trailColor: colors?.secondary.dark,
                    strokeLinecap: 'butt',
                })}
                className="w-full h-[170px]"
                // classes="w-20"
            >
                <Typography variant={'small'}>Total Students</Typography>
                <Typography variant={'h4'}>
                    {studentCount?.data?.count || 0}/
                    {studentCount?.data?.capacity || 0}
                </Typography>
            </CircularProgressbarWithChildren>
        </div>
    )
}
