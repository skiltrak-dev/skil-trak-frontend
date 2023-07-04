import { Badge } from '@components/Badge'
import { Typography } from '@components/Typography'
import { Result } from '@constants'

type Props = {
    id?: string
    code: string
    title: string
    onClick: () => void
    coordinator?: string
    isActive: boolean | null
    selectedCourseId: string | null
    course?: any
    result?: any
}

export const CourseCard = ({
    id,
    code,
    title,
    onClick,
    isActive,
    coordinator,
    selectedCourseId,
    course,
    result,
}: Props) => {
    const getResultBadge = () => {
        switch (result?.result) {
            case Result.Competent:
                return <Badge text="Competent" size="xs" variant="success" />

            case Result.NotCompetent:
                return <Badge text="Not Competent" size="xs" variant="error" />
            case Result.ReOpened:
                return <Badge text="Re-Opened" size="xs" variant="info" />
            case Result.Pending:
                return <Badge text="Submitted" size="xs" variant="info" />
            default:
                return <Badge text={result?.result} size="xs" variant="muted" />
        }
    }

    return (
        <>
            <div
                className={`${
                    id === selectedCourseId ? 'bg-blue-100' : 'bg-white'
                } rounded-lg border p-2 w-full cursor-pointer`}
                onClick={() => {
                    onClick()
                }}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <Typography variant="xs" color="text-black">
                            {code}
                        </Typography>
                    </div>
                    {result && getResultBadge()}
                </div>
                <div>
                    <div>
                        <Typography variant="label" color="text-black">
                            {title}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography variant="label" color="text-gray-400">
                            {result?.assessor?.name}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
