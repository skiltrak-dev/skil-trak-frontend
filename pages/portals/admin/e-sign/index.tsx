import { ReactElement, useEffect, useState } from 'react'

import {
    Button,
    EsignFilter,
    Filter,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    StudentFilters,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { ApprovedEsigns, ArchivedEsigns, FilteredEsigns } from '@partials'
import { AdminApi } from '@queries'
import { NextPageWithLayout, StudentsFilterType, eSignFilterType } from '@types'
import { checkFilteredDataLength } from '@utils'
import { useRouter } from 'next/router'
import { FaFileSignature } from 'react-icons/fa'

const filterKeys = ['name', 'userId', 'courseId', 'status', 'folderId']

const ESign: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<eSignFilterType>({} as eSignFilterType)

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const filteredEsign = AdminApi.ESign.useGetEsign(
        {
            search: `${JSON.stringify(filter)
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { refetchOnMountOrArgChange: true }
    )

    useEffect(() => {
        navBar.setTitle('Students')
        contextBar.hide()
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Approved',
            href: {
                pathname: 'e-sign',
                query: { tab: 'approved', page: 1, pageSize: 50 },
            },
            // badge: {
            //     text: data?.pending,
            //     loading: isLoading,
            // },
            element: <ApprovedEsigns />,
        },
        {
            label: 'Archived',
            href: {
                pathname: 'e-sign',
                query: { tab: 'archived', page: 1, pageSize: 50 },
            },
            // badge: {
            //     text: data?.pending,
            //     loading: isLoading,
            // },
            element: <ArchivedEsigns />,
        },
    ]

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            <SetDetaultQueryFilteres<eSignFilterType>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="px-4">
                <div className="flex justify-end gap-x-2 mb-2">
                    <Button
                        Icon={FaFileSignature}
                        text="Create E-Sign Template"
                        onClick={() =>
                            router.push('/portals/admin/e-sign/add-e-sign')
                        }
                    />
                    <div className="flex-shrink-0">{filterAction}</div>
                </div>
                <Filter<eSignFilterType>
                    setFilter={(f: eSignFilterType) => {
                        setFilter(f)
                    }}
                    initialValues={filter}
                    filterKeys={filterKeys}
                    component={EsignFilter}
                    setFilterAction={setFilterAction}
                />
            </div>
            {filteredDataLength && filteredEsign.isError && <TechnicalError />}
            {filteredDataLength ? (
                filteredEsign.isLoading || filteredEsign.isFetching ? (
                    <LoadingAnimation />
                ) : (
                    filteredEsign.isSuccess && (
                        <FilteredEsigns
                            filter={filter}
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            eSign={filteredEsign}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
            ) : null}

            {!filteredDataLength && (
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div className="p-4">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            )}
        </div>
    )
}

ESign.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default ESign
