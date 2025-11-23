import { BaseIcon, IconProps } from './BaseIcon'

export const IoMdCodeWorking: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 512 512"
        >
            <path
                d="M160 368L32 256l128-112 32 32-96 80 96 80-32 32zm192 0l-32-32 96-80-96-80 32-32 128 112-128 112z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
