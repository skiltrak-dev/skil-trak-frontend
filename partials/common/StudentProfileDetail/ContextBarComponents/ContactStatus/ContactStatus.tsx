import { useNotification } from '@hooks'
import {
    ShowErrorNotifications,
    Switch,
    Tooltip,
    TooltipPosition,
    Typography,
} from '@components'
import { SubAdminApi } from '@queries'
import React, { ReactElement, useEffect, useState } from 'react'
import { NotContactableStudentModal } from '../../modals'
import { PartnerRemovalRequests } from '@types'
import { CiSquareQuestion } from 'react-icons/ci'

export const ContactStatus = ({
    disabled,
    studentId,
    nonContactable,
    studentUpdateRequest,
}: {
    studentId: number
    disabled: boolean
    nonContactable: boolean
    studentUpdateRequest?: PartnerRemovalRequests
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [notContactable, notContactableResult] =
        SubAdminApi.Student.useNotContactable()

    const { notification } = useNotification()

    useEffect(() => {
        if (notContactableResult.isSuccess) {
            notification.success({
                title: nonContactable ? 'Contactable' : 'Not Contactable',
                description: nonContactable ? 'Contactable' : 'Not Contactable',
            })
        }
    }, [notContactableResult])

    const onCancel = () => setModal(null)

    const onContactbleChange = () => {
        setModal(
            <NotContactableStudentModal
                onCancel={onCancel}
                studentId={studentId}
            />
        )
    }

    const onNotContactableChange = () => {
        notContactable({ id: studentId })
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={notContactableResult} />
            <div className="py-3 border-b border-secondary-dark">
                <Typography variant="small" medium>
                    Status
                </Typography>
                <div className="grid grid-cols-5 items-center mt-2">
                    <div className="col-span-2">
                        <Typography variant="small" normal>
                            Contactable
                        </Typography>
                    </div>
                    <div className="col-span-3 flex justify-between items-center">
                        {studentUpdateRequest && (
                            <div className="relative group">
                                <CiSquareQuestion size={22} />
                                <Tooltip position={TooltipPosition.center}>
                                    Not Contactanle Request Already Sent
                                </Tooltip>
                            </div>
                        )}
                        <div className="-mb-2">
                            <Switch
                                name="priority"
                                customStyleClass={'profileSwitch'}
                                onChange={() => {
                                    nonContactable
                                        ? onNotContactableChange()
                                        : onContactbleChange()
                                }}
                                isChecked={nonContactable}
                                defaultChecked={nonContactable}
                                loading={notContactableResult.isLoading}
                                disabled={
                                    notContactableResult.isLoading ||
                                    disabled ||
                                    !!studentUpdateRequest
                                }
                            />
                        </div>
                        <Typography variant="small" normal>
                            <span className="whitespace-pre">
                                {' '}
                                Not-Contactable
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
