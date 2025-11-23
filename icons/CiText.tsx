import { BaseIcon, IconProps } from './BaseIcon'

export const CiText: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon {...props} stroke={props.color || 'currentColor'}>
            <path
                d="M4 7V4h16v3h2V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v3h2zm10 10H10V9H8v10c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V9h-2v8z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
