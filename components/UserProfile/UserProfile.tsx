import { useGetStudentProfileDetailQuery } from '@queries'
import moment from 'moment'
import Image from 'next/image'
import { FaAddressCard, FaBirthdayCake, FaUserCircle } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdBatchPrediction, MdPhone, MdVerified } from 'react-icons/md'
export const UserProfile = () => {
    const { data, isSuccess, isLoading } = useGetStudentProfileDetailQuery()
    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="relative">
                    <Image
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                        width={100}
                        height={100}
                        className="rounded-full shadow-inner-image"
                        alt=""
                    />
                    <div className="absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image"></div>
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
