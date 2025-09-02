import { LoadingAnimation, NoData, PageSize, Pagination } from '@components'
import { CommonApi, SubAdminApi } from '@queries'
import { MapPin } from 'lucide-react'
import { GiPathDistance } from 'react-icons/gi'
import { DistanceIndicator } from './DistanceIndicator'
import { StatsCards } from './StatsCards'
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from 'react-icons/fa6'
import { MdNoAccounts } from 'react-icons/md'
import { IndustryInRadiusListCard } from './cards/IndustryInRadiusListCard'
import { FutureIndustryInRadiusListCard } from './cards'
import { useState } from 'react'

export const ListIndustriesInRadius = ({
    workplaceId,
    courseId,
    setSelectedBox,
}: any) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(6)

    const [futurePage, setFuturePage] = useState(1)
    const [futureItemPerPage, setFutureItemPerPage] = useState(6)

    const workplaceCourseIndustries =
        SubAdminApi.Workplace.useWorkplaceCourseIndustries(
            {
                id: courseId,
                wpId: workplaceId,
                params: {
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            { skip: !courseId && !workplaceId }
        )

    const futureIndustries =
        CommonApi.FindWorkplace.useMapFutureIndustriesInRadius(
            {
                id: courseId,
                wpId: workplaceId,
                params: {
                    skip: futureItemPerPage * futurePage - futureItemPerPage,
                    limit: futureItemPerPage,
                },
            },
            { skip: !courseId && !workplaceId }
        )
    const counts = SubAdminApi.Workplace.useMapIndustriesInRadiusCount(
        { id: courseId, wpId: workplaceId },
        { skip: !courseId && !workplaceId }
    )

    console.log(
        'workplaceCourseIndustries?.data?.data',
        workplaceCourseIndustries?.data?.data
    )
    return (
        <div className="space-y-2">
            <StatsCards counts={counts} />
            {workplaceCourseIndustries?.data?.data &&
                workplaceCourseIndustries?.data?.data?.length > 6 && (
                    <div className="flex items-center justify-between mb-4">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                        />
                        <Pagination
                            pagination={
                                workplaceCourseIndustries?.data?.pagination
                            }
                            setPage={setPage}
                        />
                    </div>
                )}
            {/* ---------------- Current Industries ---------------- */}
            <div className="h-[320px] overflow-auto remove-scrollbar space-y-4">
                {workplaceCourseIndustries.isLoading ? (
                    <LoadingAnimation />
                ) : workplaceCourseIndustries?.data?.data &&
                  workplaceCourseIndustries?.data?.data?.length > 0 ? (
                    workplaceCourseIndustries?.data?.data?.map((item: any) => (
                        <>
                            {/* <div
                                key={item?.id}
                                className="flex items-center justify-between bg-white border rounded-2xl shadow-sm p-4"
                            >
                            </div> */}
                            <IndustryInRadiusListCard
                                item={item}
                                onSelect={(selected: any) =>
                                    setSelectedBox(selected)
                                }
                            />
                            {item?.locations?.length > 0 &&
                                item?.locations?.map((branch: any) => (
                                    <IndustryInRadiusListCard
                                        item={{ ...item, ...branch }}
                                        onSelect={setSelectedBox}
                                        branch
                                    />
                                ))}
                        </>
                    ))
                ) : (
                    !workplaceCourseIndustries.isError && (
                        <NoData text="No Industry Found" />
                    )
                )}

                {/* ---------------- Future Industries ---------------- */}
                {futureIndustries?.data?.data &&
                    futureIndustries?.data?.data?.length > 6 && (
                        <div className="flex items-center justify-between mb-4">
                            <PageSize
                                itemPerPage={futureItemPerPage}
                                setItemPerPage={setFutureItemPerPage}
                            />
                            <Pagination
                                pagination={futureIndustries?.data?.pagination}
                                setPage={setFuturePage}
                            />
                        </div>
                    )}
                {futureIndustries.isLoading ? (
                    <LoadingAnimation />
                ) : futureIndustries?.data?.data &&
                  futureIndustries?.data?.data?.length > 0 ? (
                    futureIndustries?.data?.data?.map((item: any) => (
                        <div
                            key={`future-${item?.id}`}
                            className="flex items-center justify-between bg-white border rounded-2xl shadow-sm p-4"
                        >
                            <FutureIndustryInRadiusListCard
                                item={item}
                                onSelect={(selected: any) =>
                                    setSelectedBox(selected)
                                }
                            />
                        </div>
                    ))
                ) : (
                    !futureIndustries.isError && null
                )}
            </div>
        </div>
    )
}
