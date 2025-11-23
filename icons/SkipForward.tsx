import { BaseIcon, IconProps } from './BaseIcon'

export const SkipForward: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
        </BaseIcon>
    )
}

