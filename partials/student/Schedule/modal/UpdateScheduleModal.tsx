import { Modal, Select, Typography } from '@components'
import React, { useState } from 'react'
import { AddNote, CancelSchedule, Reschedule } from '../components'
import moment from 'moment'

enum ScheduleType {
    Reschedule = 'reschedule',
    Cancel = 'cancel',
    Notes = 'notes',
}

const options = [
    {
        label: 'Notes',
        value: ScheduleType.Notes,
    },
    {
        label: 'Cancel',
        value: ScheduleType.Cancel,
    },
    {
        label: 'Reschedule',
        value: ScheduleType.Reschedule,
    },
]

export const UpdateScheduleModal = ({
    schedule,
    onCancel,
}: {
    schedule: any
    onCancel: () => void
}) => {
    const [selectedType, setSelectedType] = useState<string>(ScheduleType.Notes)

    const ShowTypesData = () => {
        switch (selectedType) {
            case ScheduleType.Notes:
                return (
                    <AddNote
                        schedule={schedule}
                        onCancel={() => {
                            onCancel()
                        }}
                    />
                )
            case ScheduleType.Cancel:
                return (
                    <CancelSchedule
                        schedule={schedule}
                        onCancel={() => {
                            onCancel()
                        }}
                    />
                )
            case ScheduleType.Reschedule:
                return (
                    <Reschedule
                        schedule={schedule}
                        onCancel={() => {
                            onCancel()
                        }}
                    />
                )

            default:
                return
        }
        return
    }
    return (
        <div>
            <Modal
                title="Edit"
                subtitle="Edit"
                onConfirmClick={() => {}}
                onCancelClick={onCancel}
                showActions={false}
            >
                {schedule?.isCancelled ? (
                    <>
                        <Typography variant="label" semibold>
                            Schedule Cancelled
                        </Typography>
                        <div>
                            <Typography>Note:</Typography>
                            <Typography variant="small">
                                {schedule?.note?.comment}
                            </Typography>
                        </div>
                    </>
                ) : (
                    <>
                        {schedule?.reScheduled && (
                            <div className="flex justify-between items-center">
                                <div>
                                    <Typography variant="label">
                                        Shift Date
                                    </Typography>
                                    <Typography variant="small">
                                        {moment(schedule?.data).format(
                                            'DD MMMM, YYYY'
                                        )}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="label">
                                        Shift Timing
                                    </Typography>
                                    <div className="flex items-center gap-x-0.5">
                                        <Typography variant="small">
                                            {moment(
                                                schedule?.openingTime,
                                                'h:mm'
                                            ).format('h:mm a')}
                                        </Typography>
                                        <span>-</span>
                                        <Typography variant="small">
                                            {moment(
                                                schedule?.closingTime,
                                                'h:mm'
                                            ).format('h:mm a')}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Select
                            name={'schedule'}
                            defaultValue={options[0]}
                            options={options}
                            onChange={(e: string) => setSelectedType(e)}
                            onlyValue
                        />
                        {ShowTypesData()}
                    </>
                )}
            </Modal>
        </div>
    )
}
