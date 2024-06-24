import React, { useState } from 'react'
import { StudentCellInfo } from './StudentCellInfo'
import { Student } from '@types'
import { Waypoint } from 'react-waypoint'

export const StudentCallLogDetail = ({
    call,
    student,
}: {
    call?: boolean
    student: Student
}) => {
    const [isEntered, setIsEntered] = useState<boolean>(false)
    return (
        <Waypoint
            onEnter={() => {
                setIsEntered(true)
            }}
        >
            <div>
                <StudentCellInfo student={student} call={call} />
            </div>
        </Waypoint>
    )
}
