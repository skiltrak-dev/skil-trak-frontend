import { ProfileCountsCard, RtoProfileCountDataType } from '@partials/admin/rto'
import React from 'react'
import { CgFileDocument } from 'react-icons/cg'
import { HiOutlineDocumentDuplicate, HiUserCircle } from 'react-icons/hi'
import {
    SiHomeassistantcommunitystore,
    SiSimpleanalytics,
} from 'react-icons/si'

export const SubadminProfileCounts = ({
    subAdminProfileCount,
}: {
    subAdminProfileCount: any
}) => {
    const countsData: RtoProfileCountDataType[] = [
        {
            title: 'My Student',
            count: subAdminProfileCount?.data?.student || 0,
            Icon: HiUserCircle,
            loading: false,
            link: {
                pathname: '/portals/admin/student',
                query: {
                    tab: 'completed',
                    page: 1,
                    pageSize: 50,
                    // rtoId: Number(router?.query?.id),
                    // status: UserStatus.Approved,
                },
            },
            background: {
                from: '#FF7300',
                to: '#F7910F',
            },
        },
        {
            title: 'Industry In Favourite',
            count: subAdminProfileCount?.data?.favoriteIndustries || 0,
            Icon: SiHomeassistantcommunitystore,
            loading: false,
            link: {
                pathname: '/portals/admin/student',
                query: {
                    tab: 'archive',
                    page: 1,
                    pageSize: 50,
                    // rtoId: Number(router?.query?.id),
                    // status: UserStatus.Archived,
                },
            },
            background: {
                from: '#286788',
                to: '#103142',
            },
        },
        {
            title: 'RTOS',
            count: subAdminProfileCount?.data?.rto || 0,
            Icon: HiUserCircle,
            loading: false,
            link: {
                pathname: '/portals/admin/student',
                query: {
                    tab: 'active',
                    page: 1,
                    pageSize: 50,
                    // rtoId: Number(router?.query?.id),
                    // status: UserStatus.Approved,
                },
            },
            background: {
                from: '#6971DD',
                to: '#454CB0',
            },
        },
        {
            title: 'Workplace In Process',
            count: subAdminProfileCount?.data?.inProcess || 0,
            Icon: SiHomeassistantcommunitystore,
            loading: false,
            link: {
                pathname: '/portals/admin/student',
                query: {
                    tab: 'active',
                    page: 1,
                    pageSize: 50,
                    // rtoId: Number(router?.query?.id),
                    // status: UserStatus.Pending,
                },
            },
            background: {
                from: '#4339F2',
                to: '#080092',
            },
        },
        {
            title: 'Student In Pending',
            count: subAdminProfileCount?.data?.Pendingstudent || 0,
            Icon: HiUserCircle,
            loading: false,
            background: {
                from: '#454CB0',
                to: '#0C1695',
            },
        },
        {
            title: 'Upcoming Appointments',
            count: subAdminProfileCount?.data?.appointment || 0,
            Icon: SiSimpleanalytics,
            loading: false,
            background: {
                from: '#439DEE',
                to: '#1E78E9',
            },
        },
        {
            title: 'Workplace Started',
            count: subAdminProfileCount?.data?.placementStarted || 0,
            Icon: HiUserCircle,
            loading: false,
            link: {
                pathname: '/portals/admin/student',
                query: {
                    tab: 'active',
                    page: 1,
                    pageSize: 50,
                    // rtoId: Number(router?.query?.id),
                    // status: UserStatus.Pending,
                },
            },
            background: {
                from: '#02A0FC',
                to: '#0070DF',
            },
        },
        {
            title: 'Open Tickets',
            count: subAdminProfileCount?.data?.openTicket || 0,
            Icon: HiOutlineDocumentDuplicate,
            loading: false,
            background: {
                from: '#6A6A6A',
                to: '#5A5570',
            },
        },
        {
            title: 'Agreement Uploaded',
            count: 11,
            Icon: CgFileDocument,
            loading: false,
            background: {
                from: '#7E9637',
                to: '#516D00',
            },
        },
    ]
    const coundDataLengthArray = countsData?.map((_, i) => i)
    const vava = coundDataLengthArray?.length % 3
    const slicesData = coundDataLengthArray?.slice(vava === 0 ? -3 : -vava)

    return (
        <div className="mt-[18px] grid grid-cols-3  h-[calc(100%-18px)] gap-y-8 gap-x-3.5 justify-between">
            {countsData.map((data, i, a) => (
                <ProfileCountsCard data={data} />
            ))}
        </div>
    )
}
