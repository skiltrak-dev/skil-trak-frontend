import { ActionButton, ContextBarLoading, StudentAvatar } from '@components'
import { useGetStudentProfileDetailQuery } from '@queries'
import moment from 'moment'
import { AiFillEdit } from 'react-icons/ai'
import { BsUnlockFill } from 'react-icons/bs'
import {
    FaAddressCard,
    FaBirthdayCake,
    FaUserCircle
} from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import {
    MdBatchPrediction, MdPhone, MdVerified
} from 'react-icons/md'
import { getGender } from 'utils/functions/getGender'

// hooks
import { useActionModal } from '@hooks'
import { useRouter } from 'next/router'
export const ViewProfileCB = () => {
    const router = useRouter()

    const { data, isLoading } = useGetStudentProfileDetailQuery()
    const { onUpdatePassword, passwordModal } = useActionModal()

    return isLoading ? (
        <div className="h-[70vh] flex items-center justify-center">
            <ContextBarLoading />
        </div>
    ) : (
        <div>
            {passwordModal && passwordModal}
            {/* Profile */}
            <div>
                <div className="relative flex flex-col items-center">
                    <div className="flex justify-end gap-x-2 absolute top-0 right-0">
                        <ActionButton
                            rounded
                            Icon={AiFillEdit}
                            variant={'info'}
                            onClick={() =>
                                router.push('/portals/student/my-profile')
                            }
                            title="Edit Profile"
                        />

                        <ActionButton
                            rounded
                            Icon={BsUnlockFill}
                            variant={'neutral'}
                            onClick={() => onUpdatePassword(data)}
                            title="Edit Password"
                        />
                    </div>
                    <StudentAvatar
                        name={data?.user?.name}
                        imageUrl={data?.user.avatar}
                        gender={data?.user.gender}
                    />

                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold">
                            {data?.user?.name}
                        </p>
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
                            <p className="text-sm font-medium">
                                {data?.studentId}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Student ID
                        </div>
                    </div>

                    {data?.batch ? (
                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <MdBatchPrediction />
                                </span>
                                <p className="text-sm font-medium">
                                    {data.batch}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                Batch
                            </div>
                        </div>
                    ) : null}

                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <MdPhone />
                            </span>
                            <p className="text-sm font-medium">{data?.phone}</p>
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
                            <p className="text-sm font-medium">
                                {getGender(data?.gender)}
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

            {/* Important Documents */}
            {/* <div className="mt-4">
            <ImportantDocuments sidebar />
        </div> */}
        </div>
    )
}
