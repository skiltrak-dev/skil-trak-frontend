import { CourseManagementTabType } from '../types'

export const RenderTabButton = ({
    tab,
    label,
    onClick,
    toggleTab,
}: {
    label: string
    onClick: () => void
    tab: CourseManagementTabType
    toggleTab: CourseManagementTabType
}) => {
    return (
        <div
            className={`cursor-pointer ${
                toggleTab === tab
                    ? 'text-link border-b-2 border-b-link font-semibold'
                    : 'text-gray-500'
            }`}
            onClick={onClick}
        >
            {label}
        </div>
    )
}
