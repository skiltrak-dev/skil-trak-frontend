import { ActionButton } from '@components'
import { useContextBar } from '@hooks'
import { Course, Industry, Rto, Student } from '@types'
import { ViewSectorsCB } from '../contextBar'
import { CourseDot } from './CourseDot'
import { useEffect } from 'react'
import { BranchDot } from './BranchDot'

export const BranchCell = ({ industry }: any) => {
    return (
        <div className="w-fit">
            <div className="flex flex-col gap-y-1 items-center">
                <span className="text-xs text-blue-400 font-semibold">
                    Branches
                </span>
                <div className="flex gap-x-1">
                    {industry?.branches?.map((b: any) => (
                        <BranchDot key={b?.id} branch={b} />
                    ))}
                </div>
            </div>
        </div>
    )
}
