import { encode } from 'base-64'
import { ReactElement, useEffect, useRef, useState } from 'react'

import {
    LoadingAnimation,
    NoData,
    SectorCourseStudentCount,
    Typography
} from '@components'
import { FigureCard } from '@components/sections/subAdmin'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { ProgressLineChart } from '@partials/common'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { AuthUtils } from '@utils'
import btoa from 'btoa'
import { format } from 'date-fns'
import html2canvas from 'html2canvas'
import { useMediaQuery } from 'react-responsive'
import { transitions } from 'react-stack-grid'

const { scaleDown } = transitions

const AdminDashboard: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const textRef = useRef<any>(null)

    const isTablet = useMediaQuery({ maxWidth: 1080 })
    const isMobile = useMediaQuery({ maxWidth: 767 })

    const [name, setName] = useState('')
    const credentials = AuthUtils.getUserCredentials()
    const stats = AdminApi.Admin.useCount()
    const sectorsStudentsCount = AdminApi.Admin.useSectorsStudentsCount()

    useEffect(() => {
        navBar.setTitle('Admin Dashboard')
    }, [])

    useEffect(() => {
        if (name === '') {
            if (credentials) {
                setName(credentials?.name || 'Admin')
            } else {
                setName('Admin')
            }
        }
    }, [])

    const textToEncode = 'This is some text to convert'
    const encodedText = encode(textToEncode)
    const encodedText2 = btoa(textToEncode)

    const handleConvert = async () => {
        try {
            const canvas = await html2canvas(textRef.current)
            const dataURL = canvas.toDataURL('image/png')

            // setBase64Image(dataURL)
        } catch (error) {
            console.error('Error converting text to image:', error)
            // Handle conversion errors gracefully (e.g., display error message)
        }
    }
    const initialData = [
        {
            name: 'January',
            studentsAdded: 49,
            workplaceRequests: 30,
            studentsPlaced: 24,
            studentsExpired: 4,
        },
        {
            name: 'February',
            studentsAdded: 51,
            workplaceRequests: 40,
            studentsPlaced: 19,
            studentsExpired: 1,
        },
        {
            name: 'March',
            studentsAdded: 44,
            workplaceRequests: 27,
            studentsPlaced: 15,
            studentsExpired: 6,
        },
        {
            name: 'April',
            studentsAdded: 28,
            workplaceRequests: 36,
            studentsPlaced: 6,
            studentsExpired: 5,
        },
        {
            name: 'May',
            studentsAdded: 60,
            workplaceRequests: 10,
            studentsPlaced: 24,
            studentsExpired: 5,
        },
        {
            name: 'June',
            studentsAdded: 29,
            workplaceRequests: 30,
            studentsPlaced: 9,
            studentsExpired: 0,
        },
        {
            name: 'July',
            studentsAdded: 50,
            workplaceRequests: 22,
            studentsPlaced: 12,
            studentsExpired: 9,
        },
        {
            name: 'August',
            studentsAdded: 49,
            workplaceRequests: 11,
            studentsPlaced: 14,
            studentsExpired: 0,
        },
        {
            name: 'September',
            studentsAdded: 23,
            workplaceRequests: 19,
            studentsPlaced: 23,
            studentsExpired: 6,
        },
        {
            name: 'October',
            studentsAdded: 29,
            workplaceRequests: 27,
            studentsPlaced: 5,
            studentsExpired: 1,
        },
        {
            name: 'November',
            studentsAdded: 31,
            workplaceRequests: 21,
            studentsPlaced: 9,
            studentsExpired: 9,
        },
        {
            name: 'December',
            studentsAdded: 32,
            workplaceRequests: 34,
            studentsPlaced: 10,
            studentsExpired: 1,
        },
    ]

    return (
        <div className="flex flex-col gap-y-6 pb-8 px-6 pt-6 ">
            {/* <h1
                className="text-2xl h-fit p-2 w-fit pt-0 mt-0 box-border"
                ref={textRef}
            >
                Saad
            </h1>
            <button onClick={handleConvert}>Convert to Image</button> */}

            {/* Admin Welcome Message */}
            <div className="relative pt-6">
                <div className="absolute right-8 -top-8">
                    <img
                        src="/images/icons/girl-with-laptop.png"
                        alt=""
                        className="w-48"
                    />
                </div>
                <div className="bg-blue-100 px-8 py-6 rounded-2xl">
                    <p className="text-xl text-blue-500 mb-6">
                        <>
                            <span>Welcome Back</span>{' '}
                            <span className="font-bold">{name}!</span>
                        </>
                    </p>
                    <div className="text-blue-900">
                        <p>
                            You are all set to go. It&apos;s{' '}
                            <span className="text-gray-500">
                                {format(new Date(), 'do MMMM')}
                            </span>{' '}
                            today
                        </p>
                        <p>
                            Start by looking into{' '}
                            <strong>Workplace Requests</strong> or{' '}
                            <strong>Appointments</strong> may be!
                        </p>
                    </div>
                </div>
            </div>

            {/* Figure Cards */}
            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-4">
                    <FigureCard
                        imageUrl="/images/icons/rto.png"
                        count={stats.data?.users.rto || 0}
                        title={'RTOs'}
                        loading={stats.isLoading}
                        link="admin/rto?tab=approved&page=1&pageSize=50"
                    />
                    <FigureCard
                        imageUrl="/images/icons/students.png"
                        count={stats.data?.users.student || 0}
                        title={'Students'}
                        loading={stats.isLoading}
                        link="admin/student?tab=active&page=1&pageSize=50"
                    />
                    <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={stats.data?.users.industry || 0}
                        title={'Industries'}
                        loading={stats.isLoading}
                        link="admin/industry?tab=approved&page=1&pageSize=50"
                    />
                    <FigureCard
                        imageUrl="/images/icons/job.png"
                        count={stats.data?.jobs || 0}
                        title={'Jobs'}
                        loading={stats.isLoading}
                        link="admin/jobs"
                    />
                </div>
                <div className="flex gap-x-4">
                    <FigureCard
                        imageUrl="/images/icons/sub-admin.png"
                        count={stats.data?.users.subadmin || 0}
                        title={'Sub-admins'}
                        loading={stats.isLoading}
                        link="admin/sub-admin?tab=active"
                    />
                    <FigureCard
                        imageUrl="/images/icons/workplace.png"
                        count={stats.data?.workplaceRequests || 0}
                        title={'Workplace Requests'}
                        loading={stats.isLoading}
                        link="admin/workplaces?tab=all-student-provided-workplace"
                    />
                    {/* <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={0}
                        title={'Joining Requests'}
                        loading={stats.isLoading}
                    /> */}
                </div>
            </div>

            <ProgressLineChart />

            <div>
                <Typography>
                    <span className="font-semibold">Sectors & Courses</span>
                </Typography>

                {sectorsStudentsCount.isError && (
                    <NoData text={'There is some technical issue'} />
                )}
                {sectorsStudentsCount.isLoading ? (
                    <LoadingAnimation size={80} height={'h-48'} />
                ) : sectorsStudentsCount?.data &&
                  sectorsStudentsCount?.data?.length > 0 ? (
                    // <StackGrid
                    //     columnWidth={
                    //         isMobile ? '100%' : isTablet ? '50%' : '33%'
                    //     }
                    //     gutterWidth={11}
                    //     gutterHeight={11}
                    //     appear={scaleDown.appear}
                    //     appeared={scaleDown.appeared}
                    //     enter={scaleDown.enter}
                    //     entered={scaleDown.entered}
                    //     leaved={scaleDown.leaved}
                    // >
                    <div className="grid grid-cols-3 gap-5">
                        {sectorsStudentsCount?.data?.map(
                            (sector: any, i: number) => (
                                <SectorCourseStudentCount
                                    imageUrl="/images/icons/rto.png"
                                    loading={false}
                                    index={i}
                                    key={i}
                                    sector={sector}
                                />
                            )
                        )}
                    </div>
                ) : (
                    sectorsStudentsCount.isSuccess && (
                        <NoData text={'No Sectors Student Count'} />
                    )
                )}
            </div>
        </div>
    )
}

AdminDashboard.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminDashboard
