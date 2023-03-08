import { Badge } from '@components/Badge'
import { Typography } from '@components/Typography'

type Props = {
    id?: string
    code: string
    title: string
    onClick: Function
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
                    {
                        result &&
                            (result?.result === 'pending' ? (
                                <Badge
                                    text="Submitted"
                                    size="xs"
                                    variant="info"
                                />
                            ) : (
                                <Badge
                                    text={result?.result}
                                    size="xs"
                                    variant="muted"
                                />
                            ))
                        // <div
                        //     className={`${
                        //         isActive ? 'bg-[#686DE0]' : 'bg-rose-400'
                        //     } px-1`}
                        // >
                        //     <Typography
                        //         variant="xs"
                        //         color="text-white"
                        //         capitalize
                        //     >
                        //         {result?.result === 'pending'
                        //             ? 'Submitted'
                        //             : result?.result}
                        //     </Typography>
                        // </div>
                    }
                </div>
                <div>
                    <div>
                        <Typography variant="label" color="text-black">
                            {title}
                        </Typography>
                    </div>
                    <div className="">
                        <Typography variant="label" color="text-gray-400">
                            {coordinator}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
