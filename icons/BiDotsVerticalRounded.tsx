import { BaseIcon, IconProps } from './BaseIcon'

export const BiDotsVerticalRounded: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon {...props} stroke={props.color || 'currentColor'}>
            <path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}

