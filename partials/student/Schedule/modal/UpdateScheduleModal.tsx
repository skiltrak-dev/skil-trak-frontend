import { Modal, Select, Typography } from '@components'
import React, { useState } from 'react'
import { AddNote, CancelSchedule, Reschedule } from '../components'

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
                        <Typography>Schedule Cancelled</Typography>
                    </>
                ) : (
                    <>
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
