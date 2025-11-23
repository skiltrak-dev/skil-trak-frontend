import { BaseIcon, IconProps } from './BaseIcon'

export const TbEyeSearch: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M12 18c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
            <path d="M20 21l-3 -3" />
            <path d="M20 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        </BaseIcon>
    )
}
