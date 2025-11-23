import { BaseIcon, IconProps } from './BaseIcon'

export const MdOutlineContactEmergency: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon {...props} stroke={props.color || 'currentColor'}>
            <path
                d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM9 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.03c0-1.45-2.03-2.19-3-2.19s-3 .74-3 2.19V16h6v-.97zM17 6h-2v2h2V6zm0 3h-2v6h2V9z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
