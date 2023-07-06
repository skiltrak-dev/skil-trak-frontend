import { ReactElement, useEffect, useState } from 'react'

import { FigureCard } from '@components/sections/subAdmin'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { AuthUtils } from '@utils'
import { format } from 'date-fns'

const AdminDashboard: NextPageWithLayout = () => {
    const navBar = useNavbar()

    const [name, setName] = useState('')
    const credentials = AuthUtils.getUserCredentials()
    const stats = AdminApi.Admin.useCount()

    useEffect(() => {
        navBar.setTitle('Admin Dashboard')
    }, [])

    const divideValues = (x: number) => {
        const array = []

        for (let i = 10; i <= x; i += 5) {
            array.push(i)
        }

        if (x % 10 !== 0) {
            array.push(x)
        }

        return array
    }
    useEffect(() => {
        if (name === '') {
            if (credentials) {
                setName(credentials?.name || 'Admin')
            } else {
                setName('Admin')
            }
        }
    }, [])


    const width = `${(218 / 219) * 100}%`

    return (
        <div className="flex flex-col gap-y-6 pb-8 px-6 pt-6 ">
            {/* <div className="w-full">
                <div className="border rounded w-full h-8">
                    <div
                        className={`${width} h-full bg-gray-600 flex items-center`}
                        style={{
                            width,
                        }}
                    >
                        <div className="w-full h-1.5 bg-gray-800"></div>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    {[...Array(219 - 1)]?.map((num, i, originalArray) => (
                        <div className="flex flex-col items-center">
                            {i % 10 === 0 && (
                                <div className="h-6 w-0.5 bg-gray-600"></div>
                            )}
                            {i % 5 === 0 && i % 10 !== 0 && (
                                <div className="h-6 w-[1px] bg-gray-400"></div>
                            )}
                            <p>{i % 10 === 0 ? i : null}</p>
                        </div>
                    ))}
                    <div className="flex flex-col items-center">
                        <div className="h-6 w-0.5 bg-gray-700"></div>
                        <p>{219}</p>
                    </div>
                </div>
            </div> */}
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
        </div>
    )
}

AdminDashboard.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminDashboard
