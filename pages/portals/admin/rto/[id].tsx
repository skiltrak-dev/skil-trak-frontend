import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
    Typography,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect } from 'react'
import { AiFillCodeSandboxCircle } from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan } from 'react-icons/fa'

const RtoDetail: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])

    return (
        <div className="p-6 flex flex-col gap-y-4">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
                <BackButton text="RTOs" />
                <div className="flex gap-x-2">
                    <Button>Import Students</Button>
                    <Button variant="dark">Summary Report</Button>
                    <ActionButton Icon={FaArchive}>Archive</ActionButton>
                    <ActionButton Icon={FaBan} variant={'error'}>
                        Block
                    </ActionButton>
                </div>
            </div>

            <div>
                <div className="w-full grid grid-cols-10 gap-x-1 gap-y-2">
                    {/* first */}
                    <div
                        className={`col-span-10 xl:col-span-4 w-full flex flex-col justify-between bg-white rounded-md shadow-2`}
                    >
                        <div className="w-full flex items-center gap-x-2 px-4 py-2">
                            <img
                                className="w-24 h-24"
                                src="https://pbs.twimg.com/profile_images/1201388599830351872/AfFH530f_400x400.jpg"
                                alt="RTO Logo"
                            />
                            <div>
                                <Typography variant={'title'}>
                                    {/* {data?.user?.name} */}
                                    RTO NAME
                                </Typography>
                                <div className="flex items-center gap-x-2">
                                    <Typography variant={'label'}>
                                        {/* {data?.user?.email} */}
                                        RTO EMAIL
                                    </Typography>
                                    <BsPatchCheckFill className="text-link" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex mt-2 border-t border-secondary-dark">
                            <div className="w-full h-20 flex justify-center">
                                <DescriptiveInfo
                                    title={'RTO Code'}
                                    // description={data?.rtoCode}
                                    description={'AC1-23B'}
                                    Icon={AiFillCodeSandboxCircle}
                                />
                            </div>
                            <div className="w-full h-20 flex justify-center border-r border-l border-secondary-dark">
                                <DescriptiveInfo
                                    title={'Phone'}
                                    // description={data?.phone}
                                    description={'(034) 123 1234'}
                                    Icon={AiFillCodeSandboxCircle}
                                />
                            </div>
                            <div className="w-full min-h-[73px] flex justify-center">
                                <DescriptiveInfo
                                    title={'Last Login'}
                                    description={'Yesterday'}
                                    Icon={AiFillCodeSandboxCircle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* second */}
                    <div
                        className={` col-span-10 lg:col-span-5 xl:col-span-3 w-full flex flex-col justify-between gap-y-1.5 rounded-md`}
                    >
                        <div className="w-full h-full bg-white rounded-md p-4 shadow-2">
                            {/* <ProfileDetailCard
                                title={'Address'}
                                description={`${data?.addressLine1}, ${data?.addressLine2}`}
                                icon={AiFillCodeSandboxCircle}
                            /> */}
                        </div>
                        <div className="w-full h-full bg-white rounded-md shadow-2">
                            <div className="px-4 py-2">
                                <Typography variant={'title'}>
                                    Placement Coordinator
                                </Typography>
                            </div>
                            <div className="w-full flex border-t border-secondary-dark">
                                <div className="w-full h-20 flex justify-center border-r border-secondary-dark">
                                    {/* <ProfileDetailCard
                                        title={'Name'}
                                        description={'Yaseen Khan'}
                                        icon={AiFillCodeSandboxCircle}
                                    /> */}
                                </div>
                                <div className="w-full h-20 flex justify-center border-r border-secondary-dark">
                                    {/* <ProfileDetailCard
                                        title={'Phone'}
                                        description={'(03) 9529 1783'}
                                        icon={AiFillCodeSandboxCircle}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* third */}
                    <div
                        className={` col-span-10 lg:col-span-5 xl:col-span-3 w-full flex flex-col justify-between gap-y-1.5 rounded-md`}
                    >
                        <div className="w-full h-full bg-white rounded-md shadow-2 flex flex-col gap-y-2 px-4 py-2">
                            <Typography variant={'title'}>
                                Number Of Students
                            </Typography>
                            <Typography variant={'h2'} center>
                                106
                            </Typography>
                        </div>
                        <div className="w-full h-full bg-white rounded-md shadow-2">
                            <div className="px-4 py-2">
                                <Typography variant={'title'}>
                                    Contact Person
                                </Typography>
                            </div>
                            <div className="w-full flex border-t border-secondary-dark">
                                <div className="w-full h-20 flex justify-center border-r border-secondary-dark">
                                    {/* <ProfileDetailCard
                title={"Name"}
                description={data?.contactPersons[0]?.contactPersonName}
                icon={AiFillCodeSandboxCircle}
              /> */}
                                </div>
                                <div className="w-full h-20 flex justify-center border-r border-secondary-dark">
                                    {/* <ProfileDetailCard
                                title={'Phone'}
                                description={
                                    data?.contactPersons[0]?.contactPersonPhone
                                }
                                icon={AiFillCodeSandboxCircle}
                            /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

RtoDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoDetail
