import { BaseIcon, IconProps } from './BaseIcon'

export const IoMdBriefcase: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 512 512"
        >
            <path
                d="M336 144h-56V96c0-26.5-21.5-48-48-48h-64c-26.5 0-48 21.5-48 48v48H64c-35.3 0-64 28.7-64 64v192c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V208c0-35.3-28.7-64-64-64h-56V96c0-26.5-21.5-48-48-48h-64c-26.5 0-48 21.5-48 48v48zm-168 0V96c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16v48H168z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
