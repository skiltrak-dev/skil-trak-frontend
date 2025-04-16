import React, { useState } from 'react'
import { StudentCellInfo } from './StudentCellInfo'
import { Student } from '@types'
import { Waypoint } from 'react-waypoint'
import { SubAdminApi } from '@queries'

export const StudentCallLogDetail = ({
    call,
    student,
    isHod,
}: {
    isHod?: boolean
    call?: boolean
    student: Student
}) => {
    const [isEntered, setIsEntered] = useState<boolean>(false)

    const callLog = SubAdminApi.Student.useMysStudentsCallLog(student?.id, {
        skip: !isEntered,
    })

    return (
        <Waypoint
            onEnter={() => {
                setIsEntered(true)
            }}
        >
            <div>
                <StudentCellInfo
                    student={{ ...student, callLog: [callLog?.data] }}
                    call={call}
                />
            </div>
        </Waypoint>
    )
}
