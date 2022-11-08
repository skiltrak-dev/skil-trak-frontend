import { Typography } from '@components/Typography'

type AssessmentCourseProps = {
    code: string
    name: string
    id: number
    onClick: Function
    selectedCourseId: number
}

export const AssessmentCourse = ({
    code,
    name,
    id,
    onClick,
    selectedCourseId,
}: AssessmentCourseProps) => {
    return (
        <div>
            <div
                onClick={() => onClick()}
                className={`${id === selectedCourseId ? 'bg-red-100' : 'bg-white'
                    } border-gray-200 rounded cursor-pointer p-2`}
            >
                <Typography variant="muted" color="text-black">
                    {code}
                </Typography>
                <Typography variant="tableCell" color="text-black">
                    {name}
                </Typography>
            </div>
        </div>
    )
}
