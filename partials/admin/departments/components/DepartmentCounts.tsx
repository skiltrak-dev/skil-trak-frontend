import React from 'react'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { FigureCardVII } from '@components/sections/subAdmin'

export const DepartmentCounts = () => {
    const router = useRouter()
    const id = router.query.id

    const departmentCounts = AdminApi.Department.useDepartmentCounts(id, {
        skip: !id,
    })

    return (
        <>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-10">
                    <FigureCardVII
                        imageUrl="/images/figure-card/fig-card-1.svg"
                        count={departmentCounts?.data?.rtosCount}
                        title={'All RTOs'}
                        link={
                            '/portals/admin/rto?tab=approved&page=1&pageSize=50'
                        }
                    />
                    <FigureCardVII
                        imageUrl="/images/figure-card/fig-card-2.svg"
                        count={departmentCounts?.data?.studentsCount}
                        title={'All Students'}
                        link={`/portals/admin/departments/${id}/students`}
                    />{' '}
                    {/* <FigureCardVII
                        imageUrl="/images/figure-card/fig-card-4.svg"
                        count={departmentCounts?.data?.flaggedStudents}
                        title={'Flashing Students'}
                        link={'#'}
                    /> */}
                </div>
                <FigureCardVII
                    imageUrl="/images/figure-card/fig-card-3.svg"
                    count={departmentCounts?.data?.workplaceCount}
                    title={'All Workplace Request'}
                    link={'#'}
                />
                <FigureCardVII
                    imageUrl="/images/figure-card/fig-card-6.svg"
                    count={
                        departmentCounts?.data?.expiredStudentsWithoutWorkplace
                    }
                    title={'Expired Student without workplace'}
                    link={'#'}
                />
                <FigureCardVII
                    imageUrl="/images/figure-card/fig-card-5.svg"
                    count={departmentCounts?.data?.industriesCount}
                    title={'Partnered Industries'}
                    link={
                        '/portals/admin/industry?tab=approved&page=1&pageSize=50'
                    }
                />
                <FigureCardVII
                    imageUrl="/images/figure-card/fig-card-5.svg"
                    count={departmentCounts?.data?.industriesCount}
                    title={'Non-Partnered Industries'}
                    link={
                        '/portals/admin/industry?tab=approved&page=1&pageSize=50'
                    }
                />
            </div>
        </>
    )
}
