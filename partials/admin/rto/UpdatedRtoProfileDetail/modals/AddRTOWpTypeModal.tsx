import {
    Button,
    Modal,
    Select,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { WorkplaceTypes } from '@types'
import { useState } from 'react'
import { RTOWpType } from '../components'

export const AddRTOWpTypeModal = ({
    userId,
    onCancel,
    courseId,
    selectedIds,
    workplaceTypes,
}: {
    userId?: number
    courseId: number
    selectedIds: number[]
    onCancel: () => void
    workplaceTypes: WorkplaceTypes[]
}) => {
    const [selectedTypes, setSelectedTypes] = useState<number[]>([])

    const { notification } = useNotification()

    const wpTypes = CommonApi.Rtos.getRtoWpTypes(courseId)
    const [add, addResult] = CommonApi.Rtos.addRtoWpType()

    const wpTypesOptions = wpTypes?.data
        ?.filter((wpType: any) => !selectedIds?.includes(wpType?.id))
        ?.map((wpType: any) => ({
            value: wpType?.id,
            label: wpType?.name,
        }))

    const onConfirm = async () => {
        const res: any = await add({
            userId,
            typeIds: selectedTypes,
            courseId,
        })

        if (res?.data) {
            notification.success({
                title: 'Type Added',
                description: 'Type Added Successfully',
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={addResult} />
            <Modal
                title="Workplace Types"
                subtitle=" "
                onCancelClick={onCancel}
                // onConfirmClick={onConfirm}
                showActions={false}
                loading={addResult?.isLoading}
            >
                <div className="max-h-[70vh] min-h-[40vh] overflow-auto custom-scrollbar">
                    <div className="max-w-3xl w-full min-h-[40vh]">
                        <Select
                            label={'Add Workplace Types'}
                            name="wpTypes"
                            options={wpTypesOptions}
                            multi
                            loading={wpTypes?.isLoading}
                            disabled={wpTypes?.isLoading}
                            onlyValue
                            onChange={(e: number[]) => setSelectedTypes(e)}
                        />
                        <div className="flex justify-end items-center">
                            <Button
                                text="Add"
                                onClick={onConfirm}
                                loading={addResult?.isLoading}
                                disabled={addResult?.isLoading}
                            />
                        </div>
                    </div>

                    {/*  */}
                    <div>
                        {workplaceTypes && workplaceTypes?.length > 0 && (
                            <Typography variant="label" color={'text-gray-500'}>
                                Workplace Types
                            </Typography>
                        )}
                        <div className="flex flex-col gap-y-1 gap-x-1">
                            {workplaceTypes?.map((wpType: WorkplaceTypes) => (
                                <RTOWpType key={wpType?.id} wpType={wpType} />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
