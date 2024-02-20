import { ActionButton, Typography } from '@components'
import moment from 'moment'

export const CourseTime = ({
    timing,
    onEdit,
    active,
}: {
    active: boolean
    timing: any
    onEdit: () => void
}) => {
    return (
        <div className="flex flex-col gap-y-2 py-1">
            <div className="flex justify-center items-center gap-x-2">
                <label
                    className={`text-xs ${
                        active ? 'text-white' : 'text-[#979797]'
                    } `}
                >
                    Start Date :{' '}
                </label>
                <Typography
                    variant={'muted'}
                    color={active ? 'text-white' : 'text-black'}
                    normal
                >
                    {moment(timing?.startDate).format('Do MMM YYYY')}
                </Typography>
            </div>
            <div className="flex justify-center gap-x-2 items-center">
                <label
                    className={`text-xs  ${
                        active ? 'text-white' : 'text-[#979797]'
                    } `}
                >
                    End Date :{' '}
                </label>
                <Typography
                    variant={'muted'}
                    color={active ? 'text-white' : 'text-black'}
                    normal
                >
                    {moment(timing?.endDate).format('Do MMM YYYY')}
                </Typography>
            </div>
            {/* <div>
                <Typography
                    variant={'muted'}
                    color={active ? 'text-white' : 'text-[#979797]'}
                    normal
                >
                    Start Date
                </Typography>
            </div>
            <div className="border-2 border-gray-300 w-3" />
            <div>
                <Typography
                    variant={'muted'}
                    color={active ? 'text-white' : 'text-[#979797]'}
                    normal
                >
                    End Date
                </Typography>
            </div> */}
            <ActionButton
                onClick={() => {
                    onEdit()
                }}
                variant={'light'}
                title={'Edit Course Time'}
            >
                Edit
            </ActionButton>
        </div>
    )
}
