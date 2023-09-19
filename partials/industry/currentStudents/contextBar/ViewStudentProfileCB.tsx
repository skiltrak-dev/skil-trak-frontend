import { StudentAvatar, Typography } from '@components'
import moment from 'moment'
import { FaAddressCard, FaUserCircle } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdBatchPrediction, MdPhone, MdVerified } from 'react-icons/md'
import { getGender } from 'utils/functions/getGender'

// hooks
import { Student } from '@types'
import { ellipsisText } from '@utils'
import { useRouter } from 'next/router'
import { BiRename } from 'react-icons/bi'
export const ViewStudentProfileCB = ({ student }: { student: Student }) => {
    const router = useRouter()

    return (
        <div>
            {/* Profile */}
            <div>
                <div className="relative flex flex-col items-center">
                    <StudentAvatar
                        name={student?.user?.name}
                        imageUrl={student?.user?.avatar}
                        gender={student?.gender}
                    />

                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold">
                            {student?.user?.name} {student?.familyName}
                        </p>
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm text-gray-400">
                                {ellipsisText(student?.user?.email, 30)}
                            </p>
                            <span className="text-blue-500">
                                <MdVerified />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Row 1 */}
                <div className="flex justify-between divide-x border-b mt-4">
                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <FaAddressCard />
                            </span>
                            <p className="text-sm font-medium">
                                {student?.studentId}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
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
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                Batch
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Info Row 2 */}
                <div className="flex justify-around divide-x border-b">
                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <MdPhone />
                            </span>
                            <p className="text-sm font-medium">
                                {student?.phone}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Phone Number
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <FaUserCircle />
                            </span>
                            <p className="text-sm font-medium">
                                {getGender(student?.gender)}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Gender
                        </div>
                    </div>
                </div>

                {/* Info Row 3 */}
                <div className="flex justify-around divide-x border-b">
                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <IoLocation />
                            </span>
                            <p className="text-sm font-medium">
                                {student?.addressLine1}, {student?.addressLine2}
                                , {student?.state}, {student?.suburb}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Address
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Emergency Contact Person
                    </Typography>
                    <div className="flex justify-around divide-x border-t border-b">
                        <div className="p-2">
                            <div className="flex items-center gap-x-2">
                                <BiRename className="text-gray-400" size={12} />
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    Name
                                </Typography>
                            </div>
                            <Typography variant={'small'} color={'text-black'}>
                                {student?.emergencyPerson}
                            </Typography>
                        </div>
                        <div className="p-2">
                            <div className="flex items-center gap-x-2">
                                <MdPhone className="text-gray-400" size={12} />
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
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <Typography variant={'muted'} color={'text-gray-500'}>
                    Expires on
                </Typography>
                <Typography variant={'label'}>
                    {moment(student?.expiryDate).format('Do MMMM YYYY')}
                </Typography>
            </div>

            {/* Important Documents */}
            {/* <div className="mt-4">
            <ImportantDocuments sidebar />
        </div> */}
        </div>
    )
}
