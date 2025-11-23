import { BaseIcon, IconProps } from './BaseIcon'

export const ChevronDown: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 12 15 18 9" />
        </BaseIcon>
    )
}

