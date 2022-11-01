import { Typography } from '@components/Typography'

type Props = {
    onClick: Function
    selectedCourseId: string | null
    id?: string
    code: string
    title: string
    coordinator?: string
    isActive: boolean | null
}

export const AssessmentCourseCard = ({
    id,
    code,
    title,
    isActive,
    coordinator,
    selectedCourseId,
    onClick,
}: Props) => {
    return (
        <>
            <div
                className={`${
                    id === selectedCourseId ? 'bg-red-100' : 'bg-white'
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
                    <div
                        className={`${
                            isActive ? 'bg-[#686DE0]' : 'bg-rose-400'
                        } px-1`}
                    >
                        <Typography variant="xs" color="text-white">
                            {isActive ? 'Active' : 'Not Active'}
                        </Typography>
                    </div>
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
