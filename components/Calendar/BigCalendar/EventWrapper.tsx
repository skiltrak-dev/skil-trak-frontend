import classNames from 'classnames'
import { EventWrapperProps } from 'react-big-calendar'

export const EventWrapper = <T extends object>(event: EventWrapperProps<T>) => {
    const classes = classNames({
        'flex flex-col flex-wrap items-start overflow-hidden absolute max-h-full min-h-[20px] rounded-md border-l-2 px-1 py-1':
            true,
        'bg-indigo-200/50 border-indigo-400': event.event.priority === 'high',
        'bg-blue-200/50 border-blue-400': event.event.priority === 'medium',
        'bg-green-200/50 border-green-600': event.event.priority === 'low',
    })

    const labelClasses = classNames({
        'text-xs font-medium': true,
        'text-indigo-600': event.event.priority === 'high',
        'text-blue-500': event.event.priority === 'medium',
        'text-green-600': event.event.priority === 'low',
    })

    const textClasses = classNames({
      'text-xs font-medium': true,
      'text-indigo-700': event.event.priority === 'high',
      'text-blue-700': event.event.priority === 'medium',
      'text-green-700': event.event.priority === 'low',
  })

    console.log(':::: EVENT', event)
    return (
        <div
            style={{
                top: `${event.style?.top}%`,
                height: `${event.style?.height}%`,
                width: `${event.style?.width}%`,
                left: `${event.style?.xOffset}%`,
            }}
            className={classes}
        >
            <p className={labelClasses}>{event.label}</p>
            <p className={textClasses}>{event.event.title}</p>
        </div>
    )
}
