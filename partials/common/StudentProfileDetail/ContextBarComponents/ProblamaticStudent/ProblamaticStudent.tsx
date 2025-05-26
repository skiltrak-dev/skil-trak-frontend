import { Switch, Tooltip, TooltipPosition, Typography } from '@components'
import { PartnerRemovalRequests } from '@types'
import { ReactElement, useState } from 'react'
import { CiSquareQuestion } from 'react-icons/ci'
import { FlagStudentModal, RemoveFromFalgModal } from '../../modals'

export const ProblamaticStudent = ({
    hasIssue,
    disabled,
    studentId,
    isReported,
    studentUpdateRequest,
    studentUnFlaggedRequest,
}: {
    disabled: boolean
    hasIssue: boolean
    studentId: number
    isReported?: boolean
    studentUpdateRequest?: PartnerRemovalRequests
    studentUnFlaggedRequest?: PartnerRemovalRequests
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => {
        setModal(null)
    }

    const onMakeProblamatic = () => {
        setModal(<FlagStudentModal onCancel={onCancel} studentId={studentId} />)
    }

    const onSwitchOff = () => {
        setModal(
            <RemoveFromFalgModal onCancel={onCancel} studentId={studentId} />
        )
    }

    const handleSwitchChange = () => {
        if (!hasIssue) {
            // Open modal if switching "on"
            onMakeProblamatic()
        } else {
            // Open modal if switching "off"
            onSwitchOff()
        }
    }

    return (
        <>
            {modal}

            <div className="py-3 border-b border-secondary-dark">
                <div className="flex gap-x-2 items-center">
                    <Typography variant="small" medium>
                        Flagged Student
                    </Typography>
                    {isReported && (
                        <div
                            title="Reported to RTO"
                            className="text-red-600 px-2 text-center cursor-pointer font-bold border rounded-lg border-red-500"
                        >
                            R
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-5 items-center  mt-2">
                    <div className="col-span-2">
                        <Typography variant="small" normal>
                            No
                        </Typography>
                    </div>
                    <div className="col-span-3 grid grid-cols-2">
                        <div className="flex items-center gap-x-1">
                            {studentUpdateRequest && (
                                <div className="relative group">
                                    <CiSquareQuestion size={22} />
                                    <Tooltip position={TooltipPosition.center}>
                                        Flagged Request Already Sent For
                                        Approval
                                    </Tooltip>
                                </div>
                            )}
                            {studentUnFlaggedRequest && (
                                <div className="relative group">
                                    <CiSquareQuestion size={22} />
                                    <Tooltip position={TooltipPosition.center}>
                                        Un Flagged Request Already Sent For
                                        Approval
                                    </Tooltip>
                                </div>
                            )}
                            <div className="-mb-2">
                                <Switch
                                    name="priority"
                                    customStyleClass={'profileSwitch'}
                                    onChange={handleSwitchChange}
                                    isChecked={hasIssue}
                                    value={hasIssue}
                                    defaultChecked={hasIssue}
                                    disabled={
                                        disabled ||
                                        !!studentUpdateRequest ||
                                        !!studentUnFlaggedRequest
                                    }
                                />
                            </div>
                        </div>
                        <Typography variant="small" normal>
                            Yes
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
