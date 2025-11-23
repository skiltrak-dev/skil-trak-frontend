import { BaseIcon, IconProps } from './BaseIcon'

export const Shield: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </BaseIcon>
    )
}

