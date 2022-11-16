import React from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'

// components
import { Typography } from 'components/Typography'

// Colors
// import { Colors } from "utills/colors/Colors";

export const CircularProgresbar = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <CircularProgressbarWithChildren
        value={Math.floor((30 / 45) * 100)}
        styles={buildStyles({
          pathColor: '#000000',
          trailColor: '#000000',
          strokeLinecap: 'butt',
        })}
        className="w-full h-[170px]"
        // classes="w-20"
      >
        <Typography variant={'small'}>Total Students</Typography>
        <Typography variant={'h4'}>30/45</Typography>
      </CircularProgressbarWithChildren>
    </div>
  )
}
