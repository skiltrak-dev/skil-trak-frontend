import { useEffect, useState } from 'react'

import {
    Filter,
    LoadingAnimation,
    PageTitle,
    SetDetaultQueryFilteres,
    SubadminEsignFilter,
    TabNavigation,
    TabProps,
    TechnicalError,
} from '@components'
import { FigureCard } from '@components/sections/subAdmin'
import { useNavbar } from '@hooks'
import { CommonApi } from '@queries'
import { SubadminESignFilterType } from '@types'
import { checkFilteredDataLength } from '@utils'
import { useRouter } from 'next/router'
import {
    AllEsignDocuments,
    CancelEsignDocuments,
    FilterdEsignDocuments,
    IndustriesEsignDocuments,
    RTOEsignDocuments,
    ReleasedEsignDocuments,
    StudentsEsignDocuments,
} from './tabs'
import { ListingEnum } from './enums'

const filterKeys = [
    'templateName',
    'studentName',
    'rtoName',
    'industryName',
    'status',
    'courseId',
    'folderId',
]

export const SubadminESign = () => {
    const router = useRouter()

    const navBar = useNavbar()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<SubadminESignFilterType>(
        {} as SubadminESignFilterType
    )

    const documents = CommonApi.ESign.useSubadminEsignList(
        {
            search: `${JSON.stringify({
                ...filter,
                role: 'all',
                searching: true,
            })
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )
    const count = CommonApi.ESign.useEsignCounts()

    useEffect(() => {
        navBar.setTitle('RTO')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'All Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'all' },
            },

            element: <AllEsignDocuments />,
        },
        {
            label: 'Released By Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'initiated' },
            },

            element: <ReleasedEsignDocuments />,
        },
        {
            label: 'Students Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'student' },
            },

            element: <StudentsEsignDocuments />,
        },
        {
            label: 'Industry Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'industry' },
            },

            element: <IndustriesEsignDocuments />,
        },
        {
            label: 'RTO Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'rto' },
            },

            element: <RTOEsignDocuments />,
        },
        {
            label: 'Cancel Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'cancel' },
            },

            element: <CancelEsignDocuments />,
        },
    ]

    const filteredDataLength = checkFilteredDataLength(filter)

    return (
        <div>
            <SetDetaultQueryFilteres<SubadminESignFilterType>
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div>
                <div className="flex justify-between items-center">
                    <PageTitle title={'E-Sign'} />
                    <div className="flex justify-end mb-2">{filterAction}</div>
                </div>

                <div>
                    <Filter<SubadminESignFilterType>
                        component={SubadminEsignFilter}
                        initialValues={filter}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                        filterKeys={filterKeys}
                    />
                </div>

                <div className="grid grid-cols-4 gap-3 py-4">
                    <FigureCard
                        imageUrl="/images/documents/allDocuments.png"
                        count={count?.data?.all}
                        title={'All Documents'}
                        loading={false}
                        link="/portals/sub-admin/e-sign?tab=all"
                    />
                    <FigureCard
                        imageUrl="/images/documents/documents.png"
                        count={count?.data?.pending}
                        title={'Pending Documents'}
                        loading={false}
                        link="/portals/sub-admin/e-sign?tab=all&page=1&pageSize=50&status=pending"
                    />
                    <FigureCard
                        imageUrl="/images/documents/documents.png"
                        count={count?.data?.pending}
                        title={'UnSigned Documents'}
                        loading={false}
                        // link="admin/rto?tab=approved&page=1&pageSize=50"
                    />
                    <FigureCard
                        imageUrl="/images/documents/allDocuments.png"
                        count={count?.data?.signed}
                        title={'Signed Documents'}
                        loading={false}
                        link="/portals/sub-admin/e-sign?tab=all&page=1&pageSize=50&status=signed"
                    />
                    {/* <FigureCard
                    imageUrl="/images/icons/rto.png"
                    count={10}
                    title={'RTOs'}
                    loading={false}
                    // link="admin/rto?tab=approved&page=1&pageSize=50"
                /> */}
                </div>
            </div>

            {filteredDataLength && documents.isError && <TechnicalError />}
            {filteredDataLength ? (
                documents?.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    documents.isSuccess && (
                        <FilterdEsignDocuments
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            eSign={documents}
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
