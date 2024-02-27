import { ActionButton, Typography } from '@components'
import moment from 'moment'
import { HiPencilSquare } from 'react-icons/hi2'

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
        <div className="flex items-center gap-x-5 gap-y-2 py-1">
            <div className="flex flex-col justify-center gap-x-2">
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
            <div className="flex flex-col justify-center gap-x-2">
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
            <div>
                <HiPencilSquare
                    className={`${active ? 'text-white' : 'text-primaryNew'}`}
                    onClick={() => {
                        onEdit()
                    }}
                />
            </div>
            {/* <ActionButton
                onClick={() => {
                    onEdit()
                }}
                Icon={HiPencilSquare}
                variant={'light'}
                title={'Edit Course Time'}
            ></ActionButton> */}
        </div>
    )
}
