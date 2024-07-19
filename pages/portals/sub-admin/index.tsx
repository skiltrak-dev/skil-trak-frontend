import { Course, NextPageWithLayout, UserStatus } from '@types'
import { ReactElement, useEffect, useState } from 'react'

// layouts
import { SubAdminLayout } from '@layouts'
// components
import { Card, ContextBarLoading, Modal, NoData } from '@components'
// icons
import { FaSchool } from 'react-icons/fa'
// animations
// hooks
import { useContextBar } from '@hooks'
import { ViewProfileCB } from '@partials/sub-admin/contextBar'

import { FigureCardVII } from '@components/sections/subAdmin/components/Cards/FigureCard'

import { AuthUtils, getSectors, getUserCredentials } from '@utils'

import { ImportantDocuments, SubAdminDashboardMap } from '@partials/common'

import { ProgressChart } from '@partials/sub-admin/components'
import { CommonApi, SubAdminApi, useGetSubAdminIndustriesQuery } from '@queries'
import { useRouter } from 'next/router'

const SubAdminDashboard: NextPageWithLayout = () => {
    const status = getUserCredentials()?.status

    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)
    const [modal, setModal] = useState<any | null>(null)
    const subadminCourses = CommonApi.Courses.subadminCoursesList()
    const subadmin = SubAdminApi.SubAdmin.useProfile()
    const statistics = SubAdminApi.Count.statistics(undefined, {
        skip: status !== UserStatus.Approved,
    })
    const sectorsWithCourses = getSectors(subadminCourses?.data)
    const uniqueSectors = (() => {
        const sectors = subadminCourses?.data?.map((item: any) => item?.sector)
        const seen = new Set()
        return sectors?.filter((sector: any) => {
            if (seen.has(sector.id)) {
                return false
            } else {
                seen.add(sector.id)
                return true
            }
        })
    })()
    const sectorsOptions = uniqueSectors?.map((sector: any) => ({
        value: sector?.id,
        label: sector?.name,
    }))

    const { viewedPendingIndustriesModal, setViewedPendingIndustriesModal } =
        useContextBar()

    const pendingIndustries: any = useGetSubAdminIndustriesQuery({
        search: `status:${UserStatus.Pending}`,
    })
    const router = useRouter()
    // const joyride = useJoyRide()
    useEffect(() => {
        if (subadmin.isSuccess) {
            contextBar.setContent(
                <ViewProfileCB
                    subadmin={subadmin?.data}
                    statistics={statistics?.data}
                />
            )
            contextBar.show(false)
            return () => {
                contextBar.setContent(null)
                contextBar.hide()
            }
        }
    }, [subadmin, statistics])

    useEffect(() => {
        if (!credentials) {
            if (AuthUtils.isAuthenticated()) {
                setCredentials(AuthUtils.getUserCredentials())
            }
        }
    }, [credentials])

    const onCancel = () => {
        setModal(null)
    }
    const onViewPendingReq = () => {
        router.push('/portals/sub-admin/users/industries?tab=pending')
    }

    useEffect(() => {
        // Check if there are pending industry requests
        if (
            pendingIndustries?.data?.data?.length > 0 &&
            viewedPendingIndustriesModal === 0
        ) {
            // If there are pending requests, display the modal
            setModal(
                <Modal
                    onCancelClick={onCancel}
                    onConfirmClick={onViewPendingReq}
                    title={'Pending Industry Requests'}
                    confirmText={'View Pending Requests'}
                    subtitle={'Pending Industry Requests'}
                >
                    There are pending industry requests in your account.
                </Modal>
            )
            setViewedPendingIndustriesModal((view: number) => Number(view + 1))
        } else {
            setModal(null)
        }
    }, [pendingIndustries?.data?.data])

    // const onMapClick = () => {
    //     setModal(
    //         <GlobalModal>
    //             <div className="w-full p-5 ">
    //                 <div
    //                     onClick={onCancel}
    //                     className="flex justify-end cursor-pointer border-b py-2 mb-2"
    //                 >
    //                     <IoMdCloseCircle size={20} className="text-red-500" />
    //                 </div>
    //                 <SubAdminDashboardMap sectorsOptions={sectorsOptions} />
    //             </div>
    //         </GlobalModal>
    //     )
    // }
    const mapApiDataToChartData = (apiData: any) => {
        if (!apiData) {
            return []
        }

        const colorPalette = [
            '#34B53A',
            '#4339F2',
            '#FF3A29',
            '#02A0FC',
            '#21516A',
        ]

        // Explicitly map only the require d keys to their titles
        const mapping = [
            { key: 'placementStarted', title: 'Placement Started' },
            { key: 'inProcess', title: 'In Progress' },
            { key: 'awaitingAgreementSigned', title: 'Agreement Pending' },
            { key: 'appointmentBooked', title: 'Appointment' },
            { key: 'dontHaveWorkplace', title: `Don't Have Workplace` },
        ]
        const total = mapping.reduce(
            (sum, item) => sum + (apiData[item.key] ?? 0),
            0
        )

        return mapping.map((item, index) => ({
            title: item?.title,
            percent: ((apiData[item?.key] ?? 0) / total) * 100,
            color: colorPalette[index],
        }))
    }

    const data = mapApiDataToChartData(statistics?.data)

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-6 pb-8">
                <div className="flex flex-col gap-y-4">
                    <div className="flex items-end justify-between gap-x-2.5 w-full mt-2">
                        <div className="grid grid-cols-2 gap-x-2.5 gap-y-8 w-1/2">
                            <FigureCardVII
                                imageUrl="/images/figure-card/fig-card-1.svg"
                                count={statistics?.data?.rto}
                                title={'RTOs'}
                                link={'sub-admin/users/rtos'}
                            />
                            <FigureCardVII
                                imageUrl="/images/figure-card/fig-card-2.svg"
                                count={
                                    subadmin?.data?.isAssociatedWithRto
                                        ? statistics?.data
                                              ?.countByRtoCoordinator
                                        : statistics?.data?.myStudents
                                }
                                title={'My Students'}
                                link={'sub-admin/students?tab=my-students'}
                            />
                            <FigureCardVII
                                imageUrl="/images/figure-card/fig-card-3.svg"
                                count={statistics?.data?.industry}
                                title={'Industries'}
                                link={'sub-admin/users/industries?tab=all'}
                            />

                            <FigureCardVII
                                imageUrl="/images/figure-card/fig-card-4.svg"
                                count={statistics?.data?.workplaceRequest}
                                title={'Workplace Requests'}
                                link={
                                    'sub-admin/tasks/workplace?tab=my-workplaces'
                                }
                            />
                            <FigureCardVII
                                imageUrl="/images/icons/pending-student.png"
                                count={statistics?.data?.assessmentEvidence}
                                title={'Assessment Submissions'}
                                link={
                                    'sub-admin/tasks/assessment-evidence?tab=pending'
                                }
                            />
                            <FigureCardVII
                                imageUrl="/images/icons/appointments.png"
                                count={statistics?.data?.appointment}
                                title={'Appointments'}
                                link={'sub-admin/tasks/appointments'}
                            />
                        </div>
                        <div className="w-1/2">
                            <Card>
                                <ProgressChart data={data} />
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Sector Card */}
                <div className="flex gap-x-5 w-full h-[535px] ">
                    <div className="w-1/3 h-full ">
                        <Card fullHeight>
                            {/* Card Header */}
                            <div className="flex justify-between items-center">
                                {/* Icon Title */}
                                <div className="flex items-center gap-x-2">
                                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex justify-center items-center">
                                        <FaSchool size={16} />
                                    </div>
                                    <p className="text-sm font-semibold">
                                        My Sector &amp; Courses
                                    </p>
                                </div>

                                {/* Action */}
                                {/* <Link legacyBehavior href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-indigo-100 text-indigo-600 px-4 py-2 rounded">
                                See Details
                            </a>
                        </Link> */}
                            </div>

                            <div className="mt-4 h-[89%] overflow-auto custom-scrollbar">
                                {subadminCourses?.isLoading ? (
                                    <ContextBarLoading />
                                ) : subadminCourses?.data?.length > 0 ? (
                                    Object.keys(sectorsWithCourses).map(
                                        (sector: any) => {
                                            return (
                                                <div
                                                    className="mt-4"
                                                    key={sector}
                                                >
                                                    <div>
                                                        {/* <p className="text-xs font-medium text-gray-400">
                                                Sector
                                            </p> */}
                                                        <p className="text-sm font-semibold">
                                                            {sector}
                                                        </p>
                                                    </div>

                                                    {(
                                                        sectorsWithCourses as any
                                                    )[sector].map(
                                                        (
                                                            c: Course,
                                                            i: number
                                                        ) => (
                                                            <div
                                                                className="flex flex-col gap-y-4 ml-4"
                                                                key={i}
                                                            >
                                                                <div className="border-l-4 border-green-600 px-2">
                                                                    <div>
                                                                        <p className="text-xs font-medium text-gray-400">
                                                                            {
                                                                                c.code
                                                                            }
                                                                        </p>
                                                                        <p className="text-sm">
                                                                            {
                                                                                c.title
                                                                            }
                                                                        </p>
                                                                    </div>

                                                                    {/* <Badge text="Active" /> */}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )
                                        }
                                    )
                                ) : (
                                    <div className="w-full">
                                        <NoData text={'No Courses Assigned'} />
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                    {/* <div>
                        <p
                            onClick={onMapClick}
                            className="text-blue-500 font-medium text-xs underline cursor-pointer"
                        >
                            View Map
                        </p>
                    </div> */}
                    <div className="w-full h-full">
                        <SubAdminDashboardMap sectorsOptions={sectorsOptions} />
                    </div>
                </div>
                <ImportantDocuments
                    coureseRequirementsLink={
                        '/portals/sub-admin/course-requirements'
                    }
                />
            </div>
        </>
    )
}

SubAdminDashboard.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Dashboard' }}>
            {page}
        </SubAdminLayout>
    )
}

export default SubAdminDashboard
