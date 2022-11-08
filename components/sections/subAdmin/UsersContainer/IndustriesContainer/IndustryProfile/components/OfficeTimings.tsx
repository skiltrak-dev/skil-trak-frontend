//components
import { Typography, Card } from '@components'
// icons
import { MdBook } from 'react-icons/md'

type OfficeTimingsProps = {
  timings: string
  days: string
  breakTime: string
}

export const OfficeTimings = ({
  timings,
  days,
  breakTime,
}: OfficeTimingsProps) => {
  return (
    <div className=''>
      <div className="bg-gray-50 p-2 rounded-lg">
        <Typography variant="muted" color="text-gray-500">
          {days}
        </Typography>
        <Typography variant="title" color="text-gray-700">
          {timings}
        </Typography>
        <div className="flex items-center gap-x-2 ">
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <Typography variant="muted" color="text-gray-400">
            {breakTime}
          </Typography>
        </div>
      </div>
    </div>
  )
}
