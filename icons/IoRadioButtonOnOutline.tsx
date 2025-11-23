import { BaseIcon, IconProps } from './BaseIcon'

export const IoRadioButtonOnOutline: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 512 512"
        >
            <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
            />
            <circle cx="256" cy="256" r="144" fill="currentColor" />
        </BaseIcon>
    )
}
