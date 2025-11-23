import { BaseIcon, IconProps } from './BaseIcon'

export const VscScreenNormal: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 16 16"
        >
            <path
                d="M3.5 4H1V3h2.5l-.5.5.5.5zm2 0h7V3h-7v1zm9.5 0H13V3h2v1zM1 7.5V5h1v2.5l-.5-.5-.5.5zm14 0V5h-1v2.5l.5-.5.5.5zM1 10v2.5l.5-.5.5.5V10H1zm14 0v2.5l-.5-.5-.5.5V10h1zM3.5 13H1v1h2.5l-.5-.5.5-.5zm2 0h7v1h-7v-1zm9.5 0H13v1h2v-1z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}

