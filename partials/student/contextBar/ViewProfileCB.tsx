import Image from 'next/image'
import {
    FaAddressCard,
    FaBirthdayCake,
    FaUserCircle,
    FaUserGraduate,
} from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import {
    MdPhone,
    MdBatchPrediction,
    MdGroup,
    MdGroups,
    MdVerified,
} from 'react-icons/md'
import { useGetStudentProfileDetailQuery } from '@queries'
import moment from 'moment'
export const ViewProfileCB = () => {
    const { data, isSuccess, isLoading } = useGetStudentProfileDetailQuery()
    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="relative">
                    {data?.user.avatar ? (
                        <Image
                            src={data?.user.avatar}
                            width={100}
                            height={100}
                            className="rounded-full shadow-inner-image"
                        />
                    ) : (
                        <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                            <span className="text-4xl text-gray-300">
                                <FaUserGraduate />
                            </span>
                        </div>
                    )}
                    <div
                        className={`${
                            data?.user.avatar
                                ? 'w-[100px] h-[100px]'
                                : 'w-24 h-24'
                        } absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image`}
                    ></div>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">{data?.user?.name}</p>
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm text-gray-400">
                            {data?.user?.email}
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
                        <p className="text-sm font-medium">{data?.studentId}</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Student ID
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <MdBatchPrediction />
                        </span>
                        <p className="text-sm font-medium">April 22</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Batch
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <MdPhone />
                        </span>
                        <p className="text-sm font-medium">043 6456 076</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Phone Number
                    </div>
                </div>
            </div>

            {/* Info Row 2 */}
            <div className="flex justify-around divide-x border-b">
                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <FaBirthdayCake />
                        </span>
                        <p className="text-sm font-medium">
                            {moment(data?.dob).format('LL')}
                        </p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Date Of Birth
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <FaUserCircle />
                        </span>
                        <p className="text-sm font-medium">Male</p>
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
                            {data?.addressLine1}, {data?.addressLine2},{' '}
                            {data?.state}, {data?.suburb}
                        </p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Address
                    </div>
                </div>
            </div>
        </div>
    )
}
