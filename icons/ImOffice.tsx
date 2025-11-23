import { BaseIcon, IconProps } from './BaseIcon'

export const ImOffice: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon
            {...props}
            stroke={props.color || 'currentColor'}
            viewBox="0 0 16 16"
        >
            <path
                d="M0 16h7v-2h-1v-1h1v-2h-1v-1h1v-2h-1v-1h1v-2h-1v-1h1v-2h-1v-1h1v-1h-7v16zM2 3h1v1h-1v-1zM2 5h1v1h-1v-1zM2 7h1v1h-1v-1zM2 9h1v1h-1v-1zM2 11h1v1h-1v-1zM2 13h1v1h-1v-1zM4 3h1v1h-1v-1zM4 5h1v1h-1v-1zM4 7h1v1h-1v-1zM4 9h1v1h-1v-1zM4 11h1v1h-1v-1zM4 13h1v1h-1v-1zM16 6h-7v1h1v1h-1v2h1v1h-1v2h1v1h-1v2h7v-10zM14 9h-2v-1h2v1zM14 12h-2v-1h2v1zM14 15h-2v-1h2v1z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
