import { Card, StudentAvatar, StudentTimer, Typography } from '@components'
import moment from 'moment'
import { FaAddressCard, FaUserCircle } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdBatchPrediction, MdPhone, MdVerified } from 'react-icons/md'
import { getGender } from '@utils'

// hooks
import { Student } from '@types'
import { ellipsisText } from '@utils'
import { useRouter } from 'next/router'
import { BiRename } from 'react-icons/bi'
import Countdown from 'react-countdown'
import { useCountDownRendered } from '@components/StudentTimer/useCountDownRendered'
export const ViewStudentProfileCB = ({ student }: { student: Student }) => {
    const router = useRouter()

    const CountDownRendered = useCountDownRendered({
        date: student?.expiryDate,
        oldExpiry: student?.oldExpiry,
    })

    return (
        <Card>
            <div className="flex justify-between">
                <div className="relative flex items-center gap-x-4">
                    <StudentAvatar
                        name={student?.user?.name}
                        imageUrl={student?.user?.avatar}
                        gender={student?.gender}
                    />

                    <div className="flex flex-col">
                        <div className="relative group">
                            <p className="text-lg font-semibold">
                                {ellipsisText(student?.user?.name, 15)}
                            </p>
                            <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                                {student?.user?.name}
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="flex items-center gap-x-2">
                                <p className="text-sm text-gray-400">
                                    {ellipsisText(student?.user?.email, 25)}
                                </p>
                                <span className="text-blue-500">
                                    <MdVerified />
                                </span>
                            </div>
                            <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                                {student?.user?.email}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pl-4 flex flex-col gap-y-2">
                    <Typography variant={'label'}>Expiry Date</Typography>
                    <div className="relative group">
                        <Countdown
                            date={student?.expiryDate}
                            renderer={CountDownRendered}
                        />
                        <div className="group-hover:block hidden text-xs whitespace-nowrap shadow-lg text-gray-100 bg-gray-700 px-2 py-1 rounded-md absolute z-10 right-0">
                            Expires At{' '}
                            {moment(student?.expiryDate).format(
                                'DD MMMM, YYYY'
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Profile */}
            <div className="flex justify-between gap-x-6 pt-6 px-6">
                {/* Info Row 1 */}

                <div className="flex ">
                    <div className="flex flex-wrap gap-x-10">
                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <FaAddressCard />
                                </span>
                                <p className="text-sm font-medium">
                                    {student?.studentId}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5">
                                Student ID
                            </div>
                        </div>
                        {student?.batch ? (
                            <div className="p-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">
                                        <MdBatchPrediction />
                                    </span>
                                    <p className="text-sm font-medium">
                                        {student.batch}
                                    </p>
                                </div>
                                <div className="text-gray-400 text-[11px] -mt-0.5">
                                    Batch
                                </div>
                            </div>
                        ) : null}
                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <FaUserCircle />
                                </span>
                                <p className="text-sm font-medium">
                                    {getGender(student?.gender)}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5">
                                Gender
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <MdPhone />
                                </span>
                                <p className="text-sm font-medium">
                                    {student?.phone}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5">
                                Phone Number
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <IoLocation />
                                </span>
                                <p className="text-sm font-medium">
                                    {student?.addressLine1},{' '}
                                    {student?.addressLine2}, {student?.state},{' '}
                                    {student?.suburb}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5">
                                Address
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Emergency Contact Person
                        </Typography>
                        <div className="flex gap-x-10">
                            <div className="p-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">
                                        <BiRename />
                                    </span>
                                    <p className="text-sm font-medium">
                                        {student?.emergencyPerson}
                                    </p>
                                </div>
                                <div className="text-gray-400 text-[11px] -mt-0.5">
                                    Name
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">
                                        <MdPhone />
                                    </span>
                                    <p className="text-sm font-medium">
                                        {student?.emergencyPersonPhone}
                                    </p>
                                </div>
                                <div className="text-gray-400 text-[11px] -mt-0.5">
                                    Phone
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex justify-around divide-x border-t border-b">
                            <div className="p-2">
                                <div className="flex items-center gap-x-2">
                                    <BiRename
                                        className="text-gray-400"
                                        size={12}
                                    />
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        Name
                                    </Typography>
                                </div>
                                <Typography
                                    variant={'small'}
                                    color={'text-black'}
                                >
                                    {student?.emergencyPerson}
                                </Typography>
                            </div>
                            <div className="p-2">
                                <div className="flex items-center gap-x-2">
                                    <MdPhone
                                        className="text-gray-400"
                                        size={12}
                                    />
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        Phone
                                    </Typography>
                                </div>
                                <div className="py-1">
                                    <Typography
                                        variant={'small'}
                                        color={'text-black'}
                                    >
                                        {student?.emergencyPersonPhone}
                                    </Typography>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* <div className="flex flex-col gap-y-1">
                    <Typography variant={'muted'} color={'text-gray-500'}>
                        Expires on
                    </Typography>
                    <Typography variant={'label'}>
                        {moment(student?.expiryDate).format('Do MMMM YYYY')}
                    </Typography>
                </div> */}
            </div>
        </Card>
    )
}
