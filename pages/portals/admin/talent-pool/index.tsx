import { ReactElement, useEffect, useState } from 'react'

import {
    Button,
    Filter,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    SubAdminFilters,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ActiveSubAdmin,
    ArchivedSubAdmin,
    BlockedSubAdmin,
    FilteredSubAdmins,
} from '@partials/admin/sub-admin'
import { AddSubAdminCB } from '@partials/admin/sub-admin/contextBar'
import { AdminApi } from '@queries'
import { AdminSubadminFilter, NextPageWithLayout, UserStatus } from '@types'
import { checkFilteredDataLength, removeSpecialCharactersString } from '@utils'
import {
    HiredStudents,
    RejectedRequests,
    TalentPoolPendingRequests,
    TalentPoolApprovedRequests,
    TerminatedRequests,
} from '@partials/admin/talent-pool'

const filterKeys = ['name', 'email', 'status', 'courseId']

const TalentPoolList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    // const [filter, setFilter] = useState<AdminSubadminFilter>(
    //     {} as AdminSubadminFilter
    // )

    // const filteredSubAdmins = AdminApi.SubAdmins.useListQuery({
    //     search: `${JSON.stringify(filter)
    //         .replaceAll('{', '')
    //         .replaceAll('}', '')
    //         .replaceAll('"', '')
    //         .trim()}`,
    //     skip: itemPerPage * page - itemPerPage,
    //     limit: itemPerPage,
    // })
    const { isLoading, data } = AdminApi.SubAdmins.useCountQuery(undefined, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        navBar.setTitle('Talent Pool')
    }, [])

    useEffect(() => {
        navBar.setTitle('Talent Pool')
    }, [])

    const tabs: TabProps[] = [
        // {
        //     label: 'Pending',
        //     href: {
        //         pathname: 'talent-pool',
        //         query: { tab: 'pending', page: 1, pageSize: 50 },
        //     },
        //     // badge: {
        //     //     text: data?.approved,
        //     //     loading: isLoading,
        //     // },
        //     element: <TalentPoolPendingRequests />,
        // },

        {
            label: 'All Requests',
            href: {
                pathname: 'talent-pool',
                query: { tab: 'all', page: 1, pageSize: 50 },
            },
            // badge: {
            //     text: data?.blocked,
            //     loading: isLoading,
            // },
            element: <TalentPoolApprovedRequests />,
        },
        // {
        //     label: 'Rejected',
        //     href: {
        //         pathname: 'talent-pool',
        //         query: { tab: 'rejected', page: 1, pageSize: 50 },
        //     },
        //     // badge: {
        //     //     text: data?.blocked,
        //     //     loading: isLoading,
        //     // },
        //     element: <RejectedRequests />,
        // },
        // {
        //     label: 'Hired',
        //     href: {
        //         pathname: 'talent-pool',
        //         query: { tab: 'hired', page: 1, pageSize: 50 },
        //     },
        //     // badge: {
        //     //     text: data?.blocked,
        //     //     loading: isLoading,
        //     // },
        //     element: <HiredStudents />,
        // },
        // {
        //     label: 'Terminated',
        //     href: {
        //         pathname: 'talent-pool',
        //         query: { tab: 'terminated', page: 1, pageSize: 50 },
        //     },
        //     // badge: {
        //     //     text: data?.blocked,
        //     //     loading: isLoading,
        //     // },
        //     element: <TerminatedRequests />,
        // },
    ]

    // const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            {/* <SetDetaultQueryFilteres<AdminSubadminFilter>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="px-4">
                <div className="flex justify-end mb-2">{filterAction}</div>
                <Filter<AdminSubadminFilter>
                    component={SubAdminFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
                />
            </div> */}

            {/* {filteredDataLength && filteredSubAdmins.isError && (
                <TechnicalError />
            )} */}
            {/* {filteredDataLength ? (
                filteredSubAdmins.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    filteredSubAdmins.isSuccess && (
                        <FilteredSubAdmins
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            subAdmin={filteredSubAdmins}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
            ) : null} */}
            {/* {!filteredDataLength && ( */}
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div className="flex items-end justify-between">
                                <div className="flex-grow">{header}</div>
                                <div className="px-6">
                                    {/* <Button
                                            text={'Add Sub Admin'}
                                            variant={'primary'}
                                            onClick={onAddSubAdmin}
                                        /> */}
                                </div>
                            </div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
            {/* )} */}
        </div>
    )
}

TalentPoolList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default TalentPoolList
