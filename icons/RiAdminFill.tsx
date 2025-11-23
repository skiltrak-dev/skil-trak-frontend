import { BaseIcon, IconProps } from './BaseIcon'

export const RiAdminFill: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon {...props} stroke={props.color || 'currentColor'}>
            <path
                d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
