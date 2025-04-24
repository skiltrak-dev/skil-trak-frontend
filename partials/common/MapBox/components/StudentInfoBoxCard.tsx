import { Card, LoadingAnimation, NoData, Typography } from '@components'
import { ellipsisText, getSectorsDetail } from '@utils'
import Image from 'next/image'
import Link from 'next/link'
import { FaTimes } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'
import { CopyInfoData } from './CopyInfoData'

export const StudentInfoBoxCard = ({
    item,
    selectedBox,
    setSelectedBox,
    studentId,
}: any) => {
    const sectors = getSectorsDetail(selectedBox?.courses)
    return (
        <div className="min-w-64 ">
            {item?.isError && <NoData text="Something is not right...!" />}
            {item?.isLoading ? (
                <PulseLoader />
            ) : (
                <>
                    <div className="flex justify-center items-center w-full">
                        <div className="rounded-full h-12 w-12 relative z-50 border border-gray-200">
                            <Image
                                src={'/images/icons/avatars/std-boy.png'}
                                alt={'avatar'}
                                width={50}
                                height={50}
                                className="rounded-full"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="relative flex flex-col gap-1 justify-center items-center w-64 bg-white px-2.5 py-5 rounded-lg shadow-lg -mt-5">
                        <FaTimes
                            size={18}
                            className="cursor-pointer absolute top-2 right-2"
                            onClick={() => {
                                setSelectedBox(null)
                            }}
                        />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-b-8 border-b-white border-x-8 border-x-transparent"></div>

                        <div className="relative group w-fit mt-2">
                            <Typography variant="title">
                                {ellipsisText(item?.data?.name, 15)}
                            </Typography>
                            <CopyInfoData
                                text={item?.data?.name}
                                type={'Business Name'}
                            />
                        </div>

                        <div className="text-center">
                            <Typography variant="muted" color={'text-gray-400'}>
                                Sector
                            </Typography>

                            {sectors?.map((s: any) => (
                                <div className="">
                                    <Typography variant="xxs">
                                        {s?.code || 'N/A'}
                                    </Typography>
                                    <Typography variant="xs">
                                        {s?.name || 'N/A'}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-1">
                            <Link
                                className="text-blue-400 text-xs"
                                href={`/portals/sub-admin/students/${studentId}/detail`}
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
