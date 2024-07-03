import React from 'react'
import { SubAdminApi } from '@queries'
import { LoadingAnimation, Modal, NoData, Typography } from '@components'
import moment from 'moment'

export const ViewProfileVisitorsModal = ({
    onCancel,
    industryUserId,
}: {
    industryUserId: number
    onCancel: () => void
}) => {
    const TABLE_HEAD = [
        { key: 'name', text: 'Name' },
        { key: 'createdAt', text: 'Viewd At' },
    ]
    const profileVisitors = SubAdminApi.Industry.useProfileVisitors(
        industryUserId,
        {
            skip: !industryUserId,
        }
    )
    return (
        <Modal
            title="Visitors"
            showActions={false}
            onCancelClick={onCancel}
            subtitle="Profile Visitors"
        >
            {profileVisitors?.isError ? (
                <NoData text="There is Some technical Error!" />
            ) : null}
            {profileVisitors?.isLoading ? (
                <LoadingAnimation />
            ) : profileVisitors?.data && profileVisitors?.data?.length > 0 ? (
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
                        {profileVisitors?.data?.map(
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
                                            {moment(visitor?.createdAt).format(
                                                'DD MMM YYYY, hh:mm a'
                                            )}
                                        </Typography>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            ) : profileVisitors?.isSuccess ? (
                <NoData text="There is No Last visitor" />
            ) : null}
        </Modal>
    )
}
