import { SelectOption, Typography } from '@components'
import { MdCheckCircle } from 'react-icons/md'

export const CourseItem = ({
    course,
    isSelected,
    onToggle,
}: {
    course: SelectOption
    isSelected: boolean
    onToggle: (courseName: number) => void
}) => (
    <div
        className={`flex items-center justify-between p-1 rounded border cursor-pointer transition-all duration-200 ${
            isSelected
                ? 'border-primaryNew text-white bg-primaryNew'
                : 'bg-white border-gray-200 hover:border-orange-300'
        }`}
        onClick={() => onToggle(+course?.value)}
    >
        <Typography
            variant="xs"
            color={isSelected ? 'text-white' : 'text-gray-900'}
            medium
        >
            <span className="flex-1 mr-1">{course?.label}</span>
        </Typography>
        <div
            className={`w-3 h-3 border rounded-sm flex items-center justify-center ${
                isSelected ? 'border-white bg-white' : 'border-gray-300'
            }`}
        >
            {isSelected && (
                <MdCheckCircle className="w-2 h-2 text-primaryNew" />
            )}
        </div>
    </div>
)
