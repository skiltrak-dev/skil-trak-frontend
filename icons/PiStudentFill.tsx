import { BaseIcon, IconProps } from './BaseIcon'

export const PiStudentFill: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon {...props} stroke={props.color || 'currentColor'}>
            <path
                d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13.5l-7-3.19v5.7c0 1.1 3.13 2 7 2s7-.9 7-2v-5.7l-7 3.19z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
