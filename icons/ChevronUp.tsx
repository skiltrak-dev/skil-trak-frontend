import { BaseIcon, IconProps } from './BaseIcon'

export const ChevronUp: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="18 15 12 9 6 15" />
        </BaseIcon>
    )
}

