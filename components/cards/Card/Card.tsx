import classNames from 'classnames'

interface CardProps {
    children?: any
    noPadding?: boolean
    shadowType?: 'soft' | 'hard'
    shadowColor?: string
    layout?: 'wrap' | 'fluid' | 'min'
    fullHeight?: boolean
}

export const Card = ({
    children,
    noPadding,
    shadowType,
    shadowColor = 'shadow-black/5',
    layout = 'fluid',
    fullHeight,
}: CardProps) => {
    const classes = classNames({
        'w-full': layout === 'fluid',
        'h-full': fullHeight,
        'w-fit': layout === 'wrap',
        'w-[450px]': layout === 'min',
        'bg-white rounded-2xl': true,
        'shadow-xl': !shadowType || shadowType === 'soft',
        shadow: shadowType === 'hard',
        'p-0': noPadding,
        'p-4': !noPadding,
    })
    return (
        <div className={`${classes} ${shadowColor}`}>
            {children}
        </div>
    )
}
