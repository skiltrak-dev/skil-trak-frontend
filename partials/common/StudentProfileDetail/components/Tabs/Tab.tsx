import { Typography } from '@components'
import classNames from 'classnames'

const formattedCount = (count: number) => {
    return count < 10 ? `0${count}` : count > 100 ? `${count}+` : count
}

export const Tab = ({
    type,
    onClick,
    label,
    href,
    badge,
    active,
    element,
    Icon,
    transKey,
}: any) => {
    const classes = classNames({
        'text-sm font-extrabold py-1.5 my-1 cursor-pointer transition-all duration-500':
            true,
        'flex items-center justify-center gap-x-1': true,
        'text-gray-200 hover:text-white border-transparent':
            !active && type === 'dark',
        'text-gray-600 border-transparent': !active && type !== 'dark',
        'text-primary bg-white rounded-md': active,
    })

    return (
        <div className={classes} onClick={onClick}>
            {Icon && <Icon />}
            <Typography color={active ? 'text-primary' : ''}>
                {label}
            </Typography>
        </div>
    )
}
