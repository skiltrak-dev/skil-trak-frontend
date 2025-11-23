import { BaseIcon, IconProps } from './BaseIcon'

export const Play: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="5 3 19 12 5 21 5 3" />
        </BaseIcon>
    )
}

