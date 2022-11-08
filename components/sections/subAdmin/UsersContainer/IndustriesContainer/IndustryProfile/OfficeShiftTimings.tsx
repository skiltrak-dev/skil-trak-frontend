import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React from 'react'
import { MdBook } from 'react-icons/md'
import { OfficeTimings } from './components'

type OfficeShiftTimingsProps = {
  title: string
}

export const OfficeShiftTimings = ({
  title,
}: OfficeShiftTimingsProps) => {
  const officeTimings = [
    {
      timings: '12:00 PM - 1:00 PM',
      days: 'Monday',
      break: 'Break (9 am - 5 pm)',
    },
    {
      timings: '12:00 PM - 1:00 PM',
      days: 'Tuesday',
      break: 'Break (9 am - 5 pm)',
    },
    {
      timings: '12:00 PM - 1:00 PM',
      days: 'Wednesday',
      break: 'Break (9 am - 5 pm)',
    },
    {
      timings: '12:00 PM - 1:00 PM',
      days: 'Thursday',
      break: 'Break (9 am - 5 pm)',
    },
    {
      timings: '12:00 PM - 1:00 PM',
      days: 'Friday',
      break: 'Break (9 am - 5 pm)',
    },
    {
      timings: 'Close',
      days: 'Saturday',
      break: 'Not Applicable',
    },
    {
      timings: 'Close',
      days: 'Sunday',
      break: 'Not Applicable',
    },
  ]
  return (
    <div>
      <Card>
        <div className="flex gap-x-2 items-center">
          <MdBook className="text-red-600 text-xl" />
          <Typography variant="title" color="black">
            {title}
          </Typography>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {officeTimings.map((item, index) => (
            <OfficeTimings
              timings={item.timings}
              days={item.days}
              breakTime={item.break}
            />
          ))}
        </div>
      </Card>
      
    </div>
  )
}
