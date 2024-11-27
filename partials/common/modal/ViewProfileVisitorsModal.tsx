import React, { useState } from 'react'
import { CommonApi } from '@queries'
import {
    LoadingAnimation,
    Modal,
    NoData,
    PageSize,
    Pagination,
    Typography,
} from '@components'
import moment from 'moment'
import { IoFootstepsSharp } from 'react-icons/io5'

export const ViewProfileVisitorsModal = ({
    onCancel,
    userId,
}: {
    userId: number
    onCancel: () => void
}) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(30)

    const TABLE_HEAD = [
        { key: 'name', text: 'Name' },
        { key: 'createdAt', text: 'Viewd At' },
    ]
    const profileVisitors = CommonApi.Industries.useProfileVisitors(
        { userId, skip: itemPerPage * page - itemPerPage, limit: itemPerPage },
        {
            skip: !userId,
        }
    )
    return (
        <Modal
            title="Visitors"
            titleIcon={IoFootstepsSharp}
            showActions={false}
            onCancelClick={onCancel}
            subtitle=" "
        >
            {profileVisitors.data?.data &&
                profileVisitors.data?.data?.length > 0 && (
                    <div className="flex items-center justify-between">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                            records={profileVisitors.data?.data?.length}
                        />
                        <Pagination
                            pagination={profileVisitors?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                )}
            {profileVisitors?.isError ? (
                <NoData text="There is Some technical Error!" />
            ) : null}
            {profileVisitors?.isLoading ? (
                <LoadingAnimation />
            ) : profileVisitors?.data?.data &&
              profileVisitors?.data?.data?.length > 0 ? (
                <div className="max-h-[70vh] md:max-h-80 lg:max-h-[420px] h-auto overflow-auto custom-scrollbar">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head?.key}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
                                    >
                                        <Typography variant="small" semibold>
                                            {head?.text}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {profileVisitors?.data?.data?.map(
                                (visitor: any, index: number) => (
                                    <tr
                                        key={index}
                                        className="even:bg-blue-gray-50/50"
                                    >
                                        <td className="p-2">
                                            <Typography
                                                variant="small"
                                                medium
                                                color="text-gray-500"
                                            >
                                                {visitor?.visitor?.name}
                                            </Typography>
                                        </td>
                                        <td className="p-2">
                                            <Typography
                                                variant="small"
                                                medium
                                                color="text-gray-500"
                                            >
                                                {moment(
                                                    visitor?.createdAt
                                                ).format(
                                                    'DD MMM YYYY, hh:mm:ss a'
                                                )}
                                            </Typography>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            ) : profileVisitors?.isSuccess ? (
                <NoData text="There is No visitors" />
            ) : null}
        </Modal>
    )
}
