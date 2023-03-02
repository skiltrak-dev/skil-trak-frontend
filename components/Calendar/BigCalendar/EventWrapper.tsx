import classNames from 'classnames'
import { EventWrapperProps } from 'react-big-calendar'

// export const EventWrapper = <T extends object>(event: EventWrapperProps<T>) => {
export const EventWrapper = <T extends object>(event: any) => {
    const classes = classNames({
        'absolute max-h-full min-h-[20px] hover:min-h-[80px] border-l-2 px-1 py-1 overflow-hidden transition-all': true,
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
        'text-[11px] font-semibold': true,
        'text-indigo-800': event.event.priority === 'high',
        'text-blue-800': event.event.priority === 'medium',
        'text-green-800': event.event.priority === 'low',
    })

    const subtitleClasses = classNames({
        'text-[11px]': true,
        'text-indigo-800': event.event.priority === 'high',
        'text-blue-800': event.event.priority === 'medium',
        'text-green-800': event.event.priority === 'low',
    })

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
            <p className={subtitleClasses}>{event.event.subTitle || 'Unknown'}</p>
        </div>
    )
}
