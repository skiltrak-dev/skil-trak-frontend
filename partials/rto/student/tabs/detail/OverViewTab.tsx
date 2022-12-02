import React from 'react'
import { Appointments, Sectors, Workplaces } from '../../pages'

export const OverViewTab = ({ student }: any) => {
    return (
        <div className="grid grid-cols-3 gap-x-3">
            {/* <Sectors data={{ data: student?.courses, isSuccess: student }} /> */}
            <Workplaces workplaces={student?.workplace} />
        </div>
    )
}
