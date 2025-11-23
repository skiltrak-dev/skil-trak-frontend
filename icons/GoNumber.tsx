import { BaseIcon, IconProps } from './BaseIcon'

export const GoNumber: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 16 16"
        >
            <path
                d="M9 4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zM9 7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 9 7zm-6.5 0a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0 2.5a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0 2.5a.5.5 0 0 1 .5-.5h2.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
