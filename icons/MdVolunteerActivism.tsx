import { BaseIcon, IconProps } from './BaseIcon'

export const MdVolunteerActivism: React.FC<IconProps> = (props) => {
    return (
        <BaseIcon {...props} stroke={props.color || 'currentColor'}>
            <path
                d="M1 11h4v11H1zm15-4.5c0-.83-.67-1.5-1.5-1.5h-4.69l.72-3.42c.02-.11.05-.22.05-.34 0-.31-.13-.59-.33-.8L9.49 0 4.25 5.25c-.28.28-.45.66-.45 1.08V17c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6.5zm7-2.5h-4v11h4c.83 0 1.5-.67 1.5-1.5v-8c0-.83-.67-1.5-1.5-1.5z"
                fill="currentColor"
            />
        </BaseIcon>
    )
}
