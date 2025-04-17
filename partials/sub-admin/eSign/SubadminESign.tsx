import { useEffect, useState } from 'react'

import {
    Filter,
    LoadingAnimation,
    SetDetaultQueryFilteres,
    SubadminEsignFilter,
    TabNavigationVII,
    TabPropsVII,
    TechnicalError,
} from '@components'
import { useNavbar } from '@hooks'
import { CommonApi } from '@queries'
import { SubadminESignFilterType } from '@types'
import { checkFilteredDataLength } from '@utils'
import {
    AllEsignDocumentsUpdated,
    CancelEsignDocumentsUpdated,
    FilterdEsignDocumentsUpdated,
    IndustriesEsignDocumentsUpdated,
    PendingEsignDocuments,
    RTOEsignDocumentsUpdated,
    ReleasedEsignDocumentsUpdated,
    SignedEsignDocuments,
    StudentsEsignDocumentsUpdated,
} from './tabs'

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
    const count = CommonApi.ESign.useEsignCounts(undefined, {
        refetchOnMountOrArgChange: true,
    })

    useEffect(() => {
        navBar.setTitle('RTO')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const tabs: TabPropsVII[] = [
        {
            label: 'All Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'all' },
            },
            icon: 'all-docs.svg',
            count: count?.data?.all,
            // element: <AllEsignDocuments />,
            element: <AllEsignDocumentsUpdated />,
        },
        {
            label: 'Pending Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'pending' },
            },
            icon: 'pending-docs.svg',
            count: count?.data?.pending,

            // element: <CancelEsignDocuments />,
            element: <PendingEsignDocuments />,
        },
        {
            label: 'Singed Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'signed' },
            },
            icon: 'signed-docs.svg',
            count: count?.data?.signed,
            // element: <CancelEsignDocuments />,
            element: <SignedEsignDocuments />,
        },
        {
            label: 'RTO Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'rto' },
            },
            icon: 'rto-docs.svg',
            count: count?.data?.rto,
            // element: <RTOEsignDocuments />,
            element: <RTOEsignDocumentsUpdated />,
        },
        {
            label: 'Released By Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'initiated' },
            },
            icon: 'released-docs.svg',
            count: count?.data?.initiated,

            // element: <ReleasedEsignDocuments />,
            element: <ReleasedEsignDocumentsUpdated />,
        },
        {
            label: 'Students Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'student' },
            },
            icon: 'student-docs.svg',
            count: count?.data?.student,

            // element: <StudentsEsignDocuments />,
            element: <StudentsEsignDocumentsUpdated />,
        },
        {
            label: 'Industry Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'industry' },
            },
            icon: 'industry-docs.svg',
            count: count?.data?.industry,

            // element: <IndustriesEsignDocuments />,
            element: <IndustriesEsignDocumentsUpdated />,
        },
        {
            label: 'Cancel Documents',
            href: {
                pathname: '/portals/sub-admin/e-sign',
                query: { tab: 'cancel' },
            },
            icon: 'canceled-docs.svg',
            count: count?.data?.canceled,

            // element: <CancelEsignDocuments />,
            element: <CancelEsignDocumentsUpdated />,
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
                    {/* <PageTitle title={'E-Sign'} /> */}
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

                {/* <div className="grid grid-cols-4 gap-3 py-4">
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
                        imageUrl="/images/documents/allDocuments.png"
                        count={count?.data?.signed}
                        title={'Signed Documents'}
                        loading={false}
                        link="/portals/sub-admin/e-sign?tab=all&page=1&pageSize=50&status=signed"
                    />
                   
                </div> */}
            </div>
            {filteredDataLength && documents.isError && <TechnicalError />}
            {filteredDataLength ? (
                documents?.isLoading ? (
                    <LoadingAnimation />
                ) : (
                    documents.isSuccess && (
                        <FilterdEsignDocumentsUpdated
                            setPage={setPage}
                            itemPerPage={itemPerPage}
                            eSign={documents}
                            setItemPerPage={setItemPerPage}
                        />
                    )
                )
            ) : null}

            {!filteredDataLength && (
                <TabNavigationVII tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div className="mt-5">
                                {/* <Card>{header}</Card> */}
                                <div className="mt-4">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigationVII>
            )}
        </div>
    )
}
