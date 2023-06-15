import React, { useEffect, useState } from 'react'

import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    PageSize,
    Pagination,
} from '@components'
import { WorkplaceRequest } from './components'
import { WorkplaceRequest as StudentProvidedWorkplace } from './studentProvidedComponents'
import { useRouter } from 'next/router'
import { SubAdminApi } from '@queries'

export const PlacementStartedWorkplaces = () => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const router = useRouter()

    const placementStartedWorkplaces =
        SubAdminApi.Workplace.usePlacementStartedWorkplaces(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 30))
    }, [router])
    return (
        <div className="mt-5">
            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    records={placementStartedWorkplaces.data?.data?.length}
                />
                <Pagination
                    pagination={placementStartedWorkplaces?.data?.pagination}
                    setPage={setPage}
                />
            </div>
            {placementStartedWorkplaces.isError && <TechnicalError />}
            {placementStartedWorkplaces.isLoading ? (
                <LoadingAnimation />
            ) : placementStartedWorkplaces.data &&
              placementStartedWorkplaces.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-4">
                    {placementStartedWorkplaces?.data?.data?.map(
                        (workplace: any) => {
                            if (
                                workplace?.studentProvidedWorkplace ||
                                workplace?.byExistingAbn
                            ) {
                                return (
                                    <StudentProvidedWorkplace
                                        key={workplace.id}
                                        workplace={workplace}
                                    />
                                )
                            }
                            return (
                                <WorkplaceRequest
                                    key={workplace.id}
                                    workplace={workplace}
                                />
                            )
                        }
                    )}
                </div>
            ) : (
                placementStartedWorkplaces.isSuccess && (
                    <EmptyData
                        title={'No Workplace request in your search'}
                        description={
                            'No workplace request were found in your search'
                        }
                    />
                )
            )}
            {placementStartedWorkplaces.data?.data?.length > 6 && (
                <div className="flex items-center justify-between py-7">
                    <PageSize
                        itemPerPage={itemPerPage}
                        setItemPerPage={setItemPerPage}
                        records={placementStartedWorkplaces.data?.data?.length}
                    />
                    <Pagination
                        pagination={
                            placementStartedWorkplaces?.data?.pagination
                        }
                        setPage={setPage}
                    />
                </div>
            )}
        </div>
    )
}
