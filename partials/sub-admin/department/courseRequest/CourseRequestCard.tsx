import { Button, Card, Typography } from '@components'
import Modal from '@modals/Modal'
import React from 'react'
import { ApproveCourseModal, RejectCourseModal } from './modal'
import { ellipsisText } from '@utils'

// create enum for status peding, approved, rejected
export enum Status {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

export const CourseRequestCard = ({ request }: any) => {
    const isValidUrl = (url: any) => {
        const urlPattern =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
        return urlPattern.test(url)
    }

    return (
        <div>
            <Card noPadding>
                <div className="flex justify-between border-b py-2.5 px-5">
                    <Typography variant="title" bold>
                        Request from -{' '}
                        <span className="uppercase">
                            {ellipsisText(request?.addedBy?.name, 10)}
                            {/* {request?.addedBy?.name ?? 'N/A'} */}
                        </span>
                    </Typography>
                    <div
                        className={`px-2 py-1 rounded-md border text-xs font-semibold ${
                            request.status === Status.PENDING
                                ? 'bg-yellow-100 border-yellow-400 text-yellow-400'
                                : request.status === Status.APPROVED
                                ? 'bg-green-100 border-green-400 text-green-400'
                                : 'bg-red-100 border-red-400 text-red-400'
                        }`}
                    >
                        {request?.status === Status.PENDING
                            ? 'PENDING'
                            : request.status === Status.APPROVED
                            ? 'APPROVED'
                            : 'REJECTED'}
                    </div>
                </div>
                <div className="p-5 h-[26rem] overflow-auto custom-scrollbar">
                    <div className="">
                        <div className="pb-4 border-b">
                            <Typography variant="label" semibold>
                                Courses:
                            </Typography>
                            <div className="border rounded-md px-2 py-1 mt-1 flex flex-wrap gap-3">
                                {/* {request?.courses?.map((course: any) => (
                                    <div className="flex items-center gap-x-2">
                                        <div className="size-1 bg-black rounded-full"></div>
                                        <Typography variant="muted">
                                            {course?.title ?? 'N/A'}
                                        </Typography>
                                    </div>
                                ))} */}
                                {request?.course?.title ?? 'N/A'}
                            </div>
                        </div>
                        <div className="mt-2 border-b pb-2">
                            <Typography variant="label" semibold>
                                Sector:
                            </Typography>
                            <div className=" px-2 py-1 mt-1">
                                <Typography variant="muted">
                                    {request?.course?.sector?.name ?? 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 border-b pb-4">
                        <Typography variant="label" semibold>
                            Description:
                        </Typography>
                        <div className="px-2 py-1 mt-1">
                            <Typography variant="muted">
                                {request?.description ?? 'N/A'}
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Typography variant="label">References:</Typography>
                        <div className="px-2 py-1 mt-1">
                            <ul>
                                {/* {request?.reference?.map(
                                    (reference: any, index: number) => {
                                        return (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <Typography
                                                    variant="small"
                                                    semibold
                                                >
                                                    {index + 1} -
                                                </Typography>
                                                <a
                                                    href={reference ?? '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-link hover:underline"
                                                >
                                                    {reference ?? 'N/A'}
                                                </a>
                                            </li>
                                        )
                                    }
                                )} */}
                                {isValidUrl(request?.reference?.[0]) ? (
                                    <a
                                        href={request.reference[0]}
                                        className="text-blue-500 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {request?.reference[0]}
                                    </a>
                                ) : (
                                    <span>
                                        {request?.reference?.[0] ?? 'N/A'}
                                    </span>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-x-2 mt-4">
                        <Modal>
                            <Modal.Open opens="approveCourseRequest">
                                <Button
                                    disabled={
                                        request?.status !== Status.PENDING
                                    }
                                    variant="success"
                                    text="Approve"
                                />
                            </Modal.Open>
                            <Modal.Window name="approveCourseRequest">
                                <ApproveCourseModal request={request} />
                            </Modal.Window>
                        </Modal>

                        <Modal>
                            <Modal.Open opens="rejectCourseRequest">
                                <Button
                                    disabled={
                                        request?.status !== Status.PENDING
                                    }
                                    variant="error"
                                    text="Reject"
                                />
                            </Modal.Open>
                            <Modal.Window name="rejectCourseRequest">
                                <RejectCourseModal request={request} />
                            </Modal.Window>
                        </Modal>
                    </div>
                </div>
            </Card>
        </div>
    )
}
