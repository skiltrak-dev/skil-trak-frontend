import classNames from 'classnames'

interface CardProps {
    children?: any
    noPadding?: boolean
    shadowType?: 'soft' | 'hard'
    shadowColor?: string
}

export const Card = ({
    children,
    noPadding,
    shadowType,
    shadowColor = 'shadow-black/5',
}: CardProps) => {
    const classes = classNames({
        'w-full bg-white rounded-2xl': true,
        'shadow-xl': !shadowType || shadowType === 'soft',
        shadow: shadowType === 'hard',
        'p-0': noPadding,
        'p-4': !noPadding,
    })
    return <div className={`${classes} ${shadowColor}`}>{children}</div>
}
