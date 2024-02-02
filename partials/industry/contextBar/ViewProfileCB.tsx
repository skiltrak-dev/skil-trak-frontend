import Image from 'next/image'
import { FaAddressCard, FaRegHandshake } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import {
    MdPhone,
    MdBatchPrediction,
    MdGroup,
    MdGroups,
    MdVerified,
    MdAdminPanelSettings,
    MdBlock,
} from 'react-icons/md'
import { useIndustryProfileQuery } from '@queries'
import moment from 'moment'
import { ActionButton, LoadingAnimation, NoData, Typography } from '@components'
import { Course } from '@types'
import { BiRename } from 'react-icons/bi'
import { FcCollaboration } from 'react-icons/fc'
import { AiFillEdit, AiOutlineNumber } from 'react-icons/ai'
import { GiBackwardTime } from 'react-icons/gi'
import { BsUnlockFill } from 'react-icons/bs'

// hooks
import { useActionModal } from '@hooks'
import { useRouter } from 'next/router'
export const ViewProfileCB = () => {
    const { data, isSuccess, isLoading } = useIndustryProfileQuery()
    const router = useRouter()

    const { passwordModal, onUpdatePassword } = useActionModal()

    const getSectors = (courses: any) => {
        if (!courses) return {}
        const sectors = {}
        courses.forEach((c: any) => {
            if ((sectors as any)[c.sector.name]) {
                ;(sectors as any)[c.sector.name].push(c)
            } else {
                ;(sectors as any)[c.sector.name] = []
                ;(sectors as any)[c.sector.name].push(c)
            }
        })
        return sectors
    }
    const sectorsWithCourses = getSectors(data?.courses)

    return (
        <>
            {passwordModal && passwordModal}
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <div>
                    {/* Edit and update button */}
                    <div className="flex justify-end gap-x-2">
                        <ActionButton
                            rounded
                            Icon={AiFillEdit}
                            variant={'info'}
                            onClick={() => {
                                router.push('/portals/industry/my-profile')
                            }}
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
                    {/* Avatar, Name and Email */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            {data?.user.avatar ? (
                                <Image
                                    src={data?.user.avatar}
                                    width={100}
                                    height={100}
                                    alt=""
                                    className="rounded-full shadow-inner-image"
                                />
                            ) : (
                                <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                    <span className="text-4xl text-gray-300">
                                        <MdAdminPanelSettings />
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
                            <p className="text-lg font-semibold">
                                {data?.user?.name || 'N/A'}
                            </p>
                            <div className="flex items-center gap-x-2">
                                <p className="text-sm text-gray-400">
                                    {data?.user?.email || 'N/A'}
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
                                    {data?.abn}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                ABN
                            </div>
                        </div>

                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <MdPhone />
                                </span>
                                <p className="text-sm font-medium">
                                    {data?.phoneNumber}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                Phone Number
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <GiBackwardTime />
                                </span>
                                <p className="text-sm font-medium">N/A</p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                Last Login
                            </div>
                        </div>
                    </div>
                    {/* Is Partner */}
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Partnership
                    </Typography>
                    <div className="flex justify-around divide-x border-t border-b">
                        <div className="p-2">
                            <div className="flex items-center gap-x-2">
                                <FaRegHandshake className="text-gray-400" />
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-400'}
                                >
                                    Partner
                                </Typography>
                            </div>
                            <div className="text-center">
                                <Typography
                                    variant={'small'}
                                    color={'text-black'}
                                >
                                    {data?.isPartner === false
                                        ? 'No'
                                        : 'Yes' || 'N/A'}
                                </Typography>
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
                    {/* contact person row 4 */}
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Contact Person
                    </Typography>
                    <div className="flex justify-around divide-x border-t border-b">
                        <div className="p-2">
                            <div className="flex items-center gap-x-2">
                                <BiRename className="text-gray-400" />
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-400'}
                                >
                                    Name
                                </Typography>
                            </div>
                            <Typography variant={'small'} color={'text-black'}>
                                {data?.contactPerson || 'N/A'}
                            </Typography>
                        </div>
                        <div className="p-2">
                            <div className="flex items-center gap-x-2">
                                <MdPhone className="text-gray-400" />
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-400'}
                                >
                                    Phone
                                </Typography>
                            </div>
                            <Typography variant={'small'} color={'text-black'}>
                                {data?.contactPersonNumber || 'N/A'}
                            </Typography>
                        </div>
                    </div>

                    {/* Eligible Sectors */}
                    <div className="mt-4">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Eligible Sectors
                        </Typography>

                        {sectorsWithCourses ? (
                            Object.keys(sectorsWithCourses).map((sector) => {
                                return (
                                    <>
                                        <Typography
                                            variant={'label'}
                                            color={'text-black'}
                                        >
                                            {sector}
                                        </Typography>

                                        {(sectorsWithCourses as any)[
                                            sector
                                        ]?.map((c: Course) => (
                                            <div
                                                key={c?.id}
                                                className="flex gap-x-2 justify-start"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div className="bg-blue-400 p-2 rounded-full"></div>
                                                    <div className="bg-blue-400 w-[1px] h-full"></div>
                                                </div>
                                                <div className="pb-2">
                                                    <Typography
                                                        variant={'small'}
                                                        color={'text-gray-500'}
                                                    >
                                                        {c?.code}
                                                    </Typography>
                                                    <Typography
                                                        variant={'small'}
                                                        color={'text-gray-800'}
                                                    >
                                                        {c?.title}
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )
                            })
                        ) : (
                            <NoData text={'No Sectors Assigned'} />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
