import moment from 'moment'
import { HeaderProps } from 'react-big-calendar'

export const WeekHeaderWrapper = (header: HeaderProps) => {
    const date = moment(header.date)
    return (
        <div className='p-4 flex flex-col items-start'>
            <p className='text-xs font-medium uppercase text-gray-500'>{date.format('ddd')}</p>
            <div className='flex items-baseline gap-x-1 font-medium'>
                <p className='text-lg'>{date.format('D')}</p>
                <p className='text-sm text-gray-400'>{date.format('MMM')}</p>
            </div>
        </div>
    )
}
