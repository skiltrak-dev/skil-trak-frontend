import { BaseIcon, IconProps } from './BaseIcon'

export const FaRegNoteSticky: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 448 512"
        >
            <path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H288V368c0-26.5 21.5-48 48-48H448V96c0-35.3-28.7-64-64-64H64zM448 352H336c-8.8 0-16 7.2-16 16V480l128-128z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
