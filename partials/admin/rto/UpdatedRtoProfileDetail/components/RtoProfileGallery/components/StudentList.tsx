import React from 'react'
import { StudentViewCard } from '../card'
import { LoadingAnimation, NoData } from '@components'
import { Student } from '@types'

export const StudentList = ({
    students,
    selectedStudent,
    onSelectedStudent,
}: {
    students: any
    selectedStudent: number | null
    onSelectedStudent: (student: number) => void
}) => {
    return (
        <div>
            {students.isError && (
                <NoData text="there is some technical issue!" />
            )}

            {students.isLoading || students.isFetching ? (
                <LoadingAnimation size={50} />
            ) : students.data && students?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2.5 h-80 overflow-auto custom-scrollbar">
                    {students.data?.map((student: Student) => (
                        <StudentViewCard
                            student={student}
                            active={selectedStudent === student?.id}
                            onClick={() => onSelectedStudent(student?.id)}
                        />
                    ))}
                </div>
            ) : (
                students?.isSuccess && <NoData text="There is no data!" />
            )}
        </div>
    )
}
