import { BaseIcon, IconProps } from './BaseIcon'

export const BsDot: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 16 16"
        >
            <path
                d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
