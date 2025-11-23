import { Course, CourseProgramType } from '@types'
import React, { useState } from 'react'
import { UpdateProgramForm } from '../form'
import { AdminApi } from '@queries'
import { EmptyData, LoadingAnimation, Modal, TechnicalError } from '@components'

export const ViewProgramModal = ({
    course,
    onCancel,
}: {
    course: Course
    onCancel: () => void
}) => {
    const [selectedItem, setSelectedItem] = useState<CourseProgramType | null>(
        null
    )
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(100)

    const coursePrograms = AdminApi.Courses.courseProgramList({
        id: course?.id,
        limit: itemPerPage,
        skip: itemPerPage * page - itemPerPage,
    })

    const handleEdit = (item: CourseProgramType) => {
        setSelectedItem(item)
    }

    const handleCancel = () => {
        setSelectedItem(null)
    }

    return (
        <div>
            <Modal
                title={'View Course Program'}
                subtitle={''}
                showActions={false}
                onCancelClick={onCancel}
            >
                <div className="bg-gray-50 p-4 max-h-[70vh] overflow-auto">
                    <div className="max-w-2xl mx-auto">
                        {coursePrograms.isError && <TechnicalError />}
                        {coursePrograms.isLoading ? (
                            <LoadingAnimation size={70} />
                        ) : coursePrograms?.data?.data &&
                          coursePrograms?.data?.data.length ? (
                            <div className="space-y-2">
                                {coursePrograms?.data?.data?.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            {selectedItem?.id === item.id ? (
                                                <UpdateProgramForm
                                                    selectedItem={selectedItem}
                                                    handleCancel={handleCancel}
                                                />
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-sm text-gray-700 flex-1 whitespace-pre">
                                                            {item?.title}
                                                        </span>
                                                        {item?.hours && (
                                                            <span className="text-xs text-gray-400 flex-1">
                                                                {item?.hours}{' '}
                                                                Hours
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={`w-2 h-2 rounded-full ${
                                                                item.isActive
                                                                    ? 'bg-green-500'
                                                                    : 'bg-gray-300'
                                                            }`}
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                                <path d="m15 5 4 4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            !coursePrograms.isError && (
                                <EmptyData
                                    title={'No Approved Student!'}
                                    description={
                                        'You have not approved any Student request yet'
                                    }
                                    height={'50vh'}
                                />
                            )
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
