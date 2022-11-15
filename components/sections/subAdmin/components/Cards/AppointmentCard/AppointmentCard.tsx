import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import { RecentActivityLinks } from '../../RecentActivityLinks'

type Props = {}

export const AppointmentCard = (props: Props) => {
  const recentActivityLinks = [
    {
      title: 'Student Allocated',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'RTO Accepted',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'RTO Removed',
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Industry Pending',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Student Allocated',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Student Allocated',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
  ]
  const recentActivityDescription = [
    {
      text: (
        <>
          You have allocated student{' '}
          <span className="text-sm font-bold text-blue-400">John Doe</span> to
          yourself.
        </>
      ),
    },
    {
      text: (
        <>
          You have approved RTO{' '}
          <span className="text-sm font-bold text-blue-400">XYZ RTO.</span>
        </>
      ),
    },
    {
      text: (
        <>
          You have removed RTO{' '}
          <span className="text-sm font-bold text-blue-400">MNO</span>.
        </>
      ),
    },
    {
      text: (
        <>
          Industry <span className="text-sm font-bold text-blue-400">ABDC</span>{' '}
          awaiting your approval.{' '}
        </>
      ),
    },
    {
      text: (
        <>
          You have allocated student{' '}
          <span className="text-sm font-bold text-blue-400">Jane Doe</span> to
          yourself.
        </>
      ),
    },
    {
      text: (
        <>
          You have allocated student{' '}
          <span className="text-sm font-bold text-blue-400">Kai Doe</span> to
          yourself.
        </>
      ),
    },
  ]

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center pb-3">
          <Typography variant={'muted'} color={'text-gray-500'}>
            Recent Activity
          </Typography>
          <Typography variant={'muted'} color={'text-blue-400'}>
            View All
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center flex-col">
            <div className="bg-neutral-300 p-1.5 rounded-full"></div>
            <div className="bg-neutral-300 h-4 w-[1px]"></div>
            <div className="bg-neutral-300 p-1.5 rounded-full"></div>
            <div className="bg-neutral-300 h-4 w-[1px]"></div>
            <div className="bg-neutral-300 p-1.5 rounded-full"></div>
            <div className="bg-neutral-300 h-4 w-[1px]"></div>
            <div className="bg-neutral-300 p-1.5 rounded-full"></div>
            <div className="bg-neutral-300 h-4 w-[1px]"></div>
            <div className="bg-neutral-300 p-1.5 rounded-full"></div>
            <div className="bg-neutral-300 h-4 w-[1px]"></div>
            <div className="bg-neutral-300 p-1.5 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-y-3">
            {recentActivityLinks.map((item, index) => {
              return (
                <RecentActivityLinks
                  key={index}
                  title={item.title}
                  color={item.color}
                  bgColor={item.bgColor}
                  key={index}
                />
              )
            })}
          </div>
          <div className="flex flex-col gap-y-2">
            {recentActivityDescription.map((item, index) => {
              return (
                <Typography variant={'muted'} color={'text-gray-500'}>
                  {item.text}
                </Typography>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
