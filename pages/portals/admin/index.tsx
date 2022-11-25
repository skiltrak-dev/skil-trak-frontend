import { ReactElement, useEffect } from 'react'

import { useContextBar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { format } from 'date-fns'
import { FigureCard } from '@components/sections'

const AdminDashboard: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    useEffect(() => {
        // contextBar.hide()
    }, [])

    return (
        <div className="flex flex-col gap-y-6 pb-8 px-6 pt-6 ">
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
                    <p className="text-xl font-bold text-blue-500 mb-6">
                        Welcome Back Admin!
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
                        count={10}
                        title={'RTOs'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/students.png"
                        count={1357}
                        title={'Students'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={1060}
                        title={'Industries'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/job.png"
                        count={1060}
                        title={'Jobs'}
                    />
                </div>
                <div className="flex gap-x-4">
                    <FigureCard
                        imageUrl="/images/icons/sub-admin.png"
                        count={50}
                        title={'Sub-admins'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/workplace.png"
                        count={200}
                        title={'Workplace Requests'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={70}
                        title={'Joining Requests'}
                    />
                </div>
            </div>
        </div>
    )
}

AdminDashboard.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminDashboard
