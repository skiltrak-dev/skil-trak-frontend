import { BaseIcon, IconProps } from './BaseIcon'

export const MdContactEmergency: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon {...props} stroke={props.color || 'currentColor'}>
            <path
                d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.33 0-7 1.17-7 3.5V20h14v-.5c0-2.33-4.67-3.5-7-3.5zm8-2h-2v-2h2v2zm0-3h-2V5h2v6z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
