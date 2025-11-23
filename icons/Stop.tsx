import { BaseIcon, IconProps } from './BaseIcon'

export const Stop: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
        </BaseIcon>
    )
}

