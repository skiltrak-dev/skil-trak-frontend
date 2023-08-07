import React, { useState } from 'react'
import { WorkplaceInfo } from './WorkplaceInfo'
import { Button } from '@components'
import { WorkplaceHistory } from './WorkplaceHistory'

export const WorkplaceTab = ({ studentId }: { studentId: number }) => {
    const [isHistoryView, setIsHistoryView] = useState<boolean>(false)

    return (
        <div>
            <div className="flex justify-end items-center mt-3">
                <Button
                    variant={isHistoryView ? 'primary' : 'info'}
                    text={
                        isHistoryView
                            ? 'View Workplace'
                            : 'View Workplace History'
                    }
                    onClick={() => {
                        setIsHistoryView(!isHistoryView)
                    }}
                />
            </div>

            {isHistoryView ? (
                <WorkplaceHistory />
            ) : (
                <WorkplaceInfo studentId={studentId} />
            )}
        </div>
    )
}
